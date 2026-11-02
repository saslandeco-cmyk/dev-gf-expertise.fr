// Génère les routes Next.js (App Router) à partir des pages live de gf-expertise.fr.
// Réutilise les assets déjà téléchargés dans public/wp-content et public/wp-includes
// (copiés depuis le mirroir statique) ; ce script ne fait que (re)générer le HTML/TSX.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ORIGIN = "https://gf-expertise.fr";
const APP_DIR = path.join(ROOT, "app");
const CONTENT_DIR = path.join(ROOT, "content");

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 GFExpertiseNextGen/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  return res.text();
}

async function collectSitemapUrls() {
  const urls = new Set();
  async function walk(sitemapUrl) {
    const xml = await fetchText(sitemapUrl);
    const sub = [...xml.matchAll(/<sitemap>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const s of sub) await walk(s);
    const locs = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const l of locs) urls.add(l);
  }
  await walk(`${ORIGIN}/sitemap_index.xml`);
  urls.add(`${ORIGIN}/`);
  return [...urls];
}

function isSameOrigin(href) {
  try {
    return new URL(href, ORIGIN).origin === ORIGIN;
  } catch {
    return false;
  }
}

// Internal page link -> clean root-absolute route path (no query-hash scheme).
function toRootAbsolute(href) {
  const u = new URL(href, ORIGIN);
  return u.pathname + u.search;
}

// Asset URL -> root-absolute path matching how mirror.js named files on disk under
// public/: when the URL has a query string, the file was saved as "<base>__q<hash><ext>"
// (mirror.js's urlToLocalPath) to avoid collisions between query variants.
function toRootAbsoluteAsset(href) {
  const u = new URL(href, ORIGIN);
  let p = decodeURIComponent(u.pathname);
  if (u.search) {
    const ext = path.extname(p);
    const base = ext ? p.slice(0, -ext.length) : p;
    const hash = Buffer.from(u.search).toString("base64url").slice(0, 8);
    p = `${base}__q${hash}${ext}`;
  }
  return p;
}

function segmentsFromUrl(urlStr) {
  const u = new URL(urlStr, ORIGIN);
  return u.pathname.split("/").filter(Boolean);
}

const ASSET_ATTR_TAGS = [
  ["link", "href"],
  ["script", "src"],
  ["img", "src"],
  ["source", "src"],
  ["video", "src"],
  ["audio", "src"],
  ["embed", "src"],
  ["iframe", "src"],
];

function rewriteCssUrls(cssText) {
  return cssText.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (match, quote, ref) => {
    if (/^data:/.test(ref) || !isSameOrigin(ref)) return match;
    return `url(${quote}${toRootAbsoluteAsset(ref)}${quote})`;
  });
}

function transformHtml(html, pageUrl) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // meta before any mutation
  const title = $("title").first().text().trim() || "GF Expertise";
  const description = $('meta[name="description"]').attr("content") || "";

  // Drop wp-json discovery links/scripts (REST API, not needed, often 401s on this host).
  $('link[href*="wp-json"], link[rel="https://api.w.org/"]').remove();
  $('script').each((_, el) => {
    const src = $(el).attr("src") || "";
    if (src.includes("wp-json")) $(el).remove();
  });

  // Lazy-loaded images: resolve the real URL (data-src/data-lazy-src/data-litespeed-src)
  // directly into src/srcset so the page renders without relying on lazyload JS.
  $("img, source").each((_, el) => {
    const $el = $(el);
    for (const attr of ["data-src", "data-lazy-src", "data-litespeed-src"]) {
      const val = $el.attr(attr);
      if (val && !/^data:/.test(val) && isSameOrigin(val)) {
        $el.attr("src", toRootAbsoluteAsset(val));
      }
    }
    for (const attr of ["srcset", "data-srcset", "data-lazy-srcset"]) {
      const val = $el.attr(attr);
      if (!val) continue;
      const rewritten = val
        .split(",")
        .map((part) => {
          const seg = part.trim();
          const m = seg.match(/^(\S+)(\s+.*)?$/);
          if (!m) return seg;
          const [, ref, descriptor = ""] = m;
          if (/^data:/.test(ref) || !isSameOrigin(ref)) return seg;
          return toRootAbsoluteAsset(ref) + descriptor;
        })
        .join(", ");
      $el.attr(attr === "srcset" ? "srcset" : attr, rewritten);
      if (attr !== "srcset") $el.attr("srcset", rewritten);
    }
  });

  // Asset tags: absolute same-origin URL -> root-absolute path served from /public.
  for (const [tag, attr] of ASSET_ATTR_TAGS) {
    $(`${tag}[${attr}]`).each((_, el) => {
      const val = $(el).attr(attr);
      if (!val || !isSameOrigin(val)) return;
      $(el).attr(attr, toRootAbsoluteAsset(val));
    });
  }

  // Internal page links -> clean route path (trailing slash, matches next.config trailingSlash).
  $("a[href], area[href]").each((_, el) => {
    const val = $(el).attr("href");
    if (!val || /^(mailto:|tel:|javascript:|#)/.test(val.trim())) return;
    if (!isSameOrigin(val)) return;
    const u = new URL(val, pageUrl);
    let p = u.pathname;
    if (!p.endsWith("/") && !path.extname(p)) p += "/";
    $(el).attr("href", p + u.search + u.hash);
  });

  // Inline <style> blocks and style="" attributes with url(...)
  $("style").each((_, el) => {
    const css = $(el).html();
    if (css && css.includes("url(")) $(el).html(rewriteCssUrls(css));
  });
  $("[style]").each((_, el) => {
    const s = $(el).attr("style");
    if (s && s.includes("url(")) $(el).attr("style", rewriteCssUrls(s));
  });

  // Head assets (CSS/JS/fonts/icons) minus the bits Next's metadata API already
  // handles (title, description, charset, viewport) to avoid duplicating them.
  $("head")
    .children()
    .each((_, el) => {
      const tag = el.tagName;
      if (tag === "title") return $(el).remove();
      if (tag === "meta") {
        const name = ($(el).attr("name") || "").toLowerCase();
        const charset = $(el).attr("charset");
        if (charset || name === "viewport" || name === "description") return $(el).remove();
      }
    });
  const headHtml = $("head").html() || "";

  const bodyHtml = $("body").html() || "";
  const bodyClass = $("body").attr("class") || "";
  return { title, description, headHtml, bodyHtml, bodyClass };
}

// The XML sitemap omits a few nav/footer-linked pages (e.g. /contact/, /mentions-legales/),
// so besides the sitemap we also crawl same-origin links found on every fetched page.
const SKIP_PATH_PREFIXES = [
  "/wp-admin",
  "/wp-login",
  "/wp-content",
  "/wp-includes",
  "/wp-json",
  "/xmlrpc.php",
  "/feed",
  "/comments",
  "/wp-comments-post.php",
];

function extractInternalPageLinks(html, pageUrl) {
  const $ = cheerio.load(html, { decodeEntities: false });
  const found = new Set();
  $("a[href], area[href]").each((_, el) => {
    const val = $(el).attr("href");
    if (!val || /^(mailto:|tel:|javascript:|#)/.test(val.trim())) return;
    let u;
    try {
      u = new URL(val, pageUrl);
    } catch {
      return;
    }
    if (u.origin !== ORIGIN) return;
    if (u.search) return; // pagination/replytocom/attachment query variants: not standalone pages
    if (path.extname(u.pathname)) return; // direct file links, not HTML pages
    if (SKIP_PATH_PREFIXES.some((p) => u.pathname.startsWith(p))) return;
    u.hash = "";
    if (!u.pathname.endsWith("/")) u.pathname += "/";
    found.add(u.toString());
  });
  return found;
}

async function main() {
  const seeds = await collectSitemapUrls();
  const visited = new Set();
  const queue = [...seeds];
  for (const s of seeds) visited.add(s);

  let generated = 0;
  while (queue.length > 0) {
    const urlStr = queue.shift();
    let html;
    try {
      html = await fetchText(urlStr);
    } catch (e) {
      console.log("  [FAIL fetch]", urlStr, e.message);
      continue;
    }

    for (const link of extractInternalPageLinks(html, urlStr)) {
      if (!visited.has(link)) {
        visited.add(link);
        queue.push(link);
      }
    }

    const { title, description, headHtml, bodyHtml, bodyClass } = transformHtml(html, urlStr);
    const segments = segmentsFromUrl(urlStr);

    const contentDir = path.join(CONTENT_DIR, ...(segments.length ? segments : ["__home__"]));
    const routeDir = path.join(APP_DIR, ...segments);
    fs.mkdirSync(contentDir, { recursive: true });
    fs.mkdirSync(routeDir, { recursive: true });

    fs.writeFileSync(path.join(contentDir, "head.html"), headHtml, "utf8");
    fs.writeFileSync(path.join(contentDir, "body.html"), bodyHtml, "utf8");

    const contentSegments = segments.length ? segments : ["__home__"];
    const contentPathArgs = contentSegments.map((s) => JSON.stringify(s)).join(", ");

    const pageTsx = `import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
};

const CONTENT_DIR = path.join(process.cwd(), "content", ${contentPathArgs});
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className=${JSON.stringify(bodyClass)} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
`;
    fs.writeFileSync(path.join(routeDir, "page.tsx"), pageTsx, "utf8");
    generated++;
    console.log("  [OK]", urlStr, "->", path.relative(ROOT, routeDir));
  }

  console.log(`Terminé. ${generated} pages générées.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
