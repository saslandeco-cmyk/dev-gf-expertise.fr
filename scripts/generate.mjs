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

  // The theme marks the header `[data-transparent]` on every page, which makes it
  // position:absolute and overlay whatever sits directly behind it (CSS rule:
  // `[data-device=desktop][data-transparent]{position:absolute;top:0;...}`, same for
  // mobile). On most pages the content behind has a white spacer sized for this overlap,
  // so the header reads as solid/white. The home page's hero banner has no such spacer
  // and is dark, so the same transparent header shows dark and the logo becomes unreadable
  // against it. Stripping the attribute on the home page only makes its header static
  // (opaque, normal document flow) so it renders the same solid way as every other page,
  // without touching the overlap behavior other pages already rely on.
  if (new URL(pageUrl, ORIGIN).pathname === "/") {
    $("#header [data-transparent]").removeAttr("data-transparent");
  }

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

  tagEditableFields($);

  const bodyHtml = $("body").html() || "";
  const bodyClass = $("body").attr("class") || "";
  return { title, description, headHtml, bodyHtml, bodyClass };
}

// Tags editable leaf content (text nodes and images) with stable, sequential
// data-edit-id attributes ("e1", "e2", ...) in document order, so the admin's
// visual page editor (lib/page-content.ts's getEffectiveBodyHtml) can target
// them later. Invisible to visitors, harmless if never edited. IDs are
// positional: if a page's structure changes on a future re-scrape, a saved
// override could attach to the wrong field - acceptable for v1.
const TEXT_LEAF_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "span", "a"];
function tagEditableFields($) {
  let counter = 0;
  const nextId = () => `e${++counter}`;

  $("body")
    .find(TEXT_LEAF_TAGS.join(","))
    .each((_, el) => {
      const $el = $(el);
      const ownText = $el
        .contents()
        .filter((_, node) => node.type === "text")
        .text()
        .trim();
      if (!ownText) return;
      const hasElementChildWithText = $el
        .children()
        .toArray()
        .some((child) => $(child).text().trim().length > 0);
      if (hasElementChildWithText) return;
      $el.attr("data-edit-id", nextId());
    });

  $("body")
    .find("img")
    .each((_, el) => {
      $(el).attr("data-edit-id", nextId());
    });
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

  const routesManifest = [];
  let sharedChromeSaved = false;
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
    const slug = contentSegments.join("/");

    // Shared header/footer chrome for app/blog to reuse, captured once from
    // the home page so blog posts carry the same nav/footer without
    // re-deriving Elementor markup per post.
    if (!sharedChromeSaved && segments.length === 0) {
      const $ = cheerio.load(bodyHtml, { decodeEntities: false });
      const headerHtml = $.html($("#header"));
      const footerHtml = $.html($("#footer"));
      const sharedDir = path.join(CONTENT_DIR, "__shared__");
      fs.mkdirSync(sharedDir, { recursive: true });
      fs.writeFileSync(path.join(sharedDir, "header.html"), headerHtml, "utf8");
      fs.writeFileSync(path.join(sharedDir, "footer.html"), footerHtml, "utf8");
      sharedChromeSaved = true;
    }

    const pathname = new URL(urlStr, ORIGIN).pathname;
    routesManifest.push({ slug, pathname, title });

    const pageTsx = `import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
};

const CONTENT_DIR = path.join(process.cwd(), "content", ${contentPathArgs});
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = ${JSON.stringify(slug)};

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className=${JSON.stringify(bodyClass)} dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
`;
    fs.writeFileSync(path.join(routeDir, "page.tsx"), pageTsx, "utf8");
    generated++;
    console.log("  [OK]", urlStr, "->", path.relative(ROOT, routeDir));
  }

  const manifestDir = path.join(ROOT, "lib", "generated");
  fs.mkdirSync(manifestDir, { recursive: true });
  fs.writeFileSync(
    path.join(manifestDir, "site-routes.json"),
    JSON.stringify(routesManifest, null, 2),
    "utf8"
  );

  console.log(`Terminé. ${generated} pages générées.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
