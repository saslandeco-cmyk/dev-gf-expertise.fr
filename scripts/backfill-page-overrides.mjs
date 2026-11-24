// Optional helper - not run automatically. Lets an admin start editing a page
// from its real current fields instead of an empty override. Reads
// content/<slug>/body.html, extracts the current value of every
// data-edit-id field, and upserts a PageOverride row with them (so the
// visual editor's initial state matches what's already on the page).
// Usage: node scripts/backfill-page-overrides.mjs --slug=contact [--force]
// Without --slug, processes every route in lib/generated/site-routes.json.
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import routes from "../lib/generated/site-routes.json" with { type: "json" };

const ROOT = path.join(import.meta.dirname, "..");
const args = process.argv.slice(2);
const onlySlug = args.find((a) => a.startsWith("--slug="))?.slice("--slug=".length);
const force = args.includes("--force");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function extractFields(bodyHtml) {
  const $ = cheerio.load(bodyHtml, { decodeEntities: false });
  const fields = {};
  $("[data-edit-id]").each((_, el) => {
    const $el = $(el);
    const editId = $el.attr("data-edit-id");
    if (!editId) return;
    fields[editId] = $el.is("img") ? ($el.attr("src") ?? "") : $el.text();
  });
  return fields;
}

async function main() {
  const targets = onlySlug ? routes.filter((r) => r.slug === onlySlug) : routes;
  if (targets.length === 0) {
    console.log("No matching route(s).");
    return;
  }

  for (const route of targets) {
    if (!force) {
      const existing = await prisma.pageOverride.findUnique({ where: { slug: route.slug } });
      if (existing) {
        console.log(`[skip] ${route.slug} already has an override (use --force to overwrite)`);
        continue;
      }
    }

    const contentDir = path.join(ROOT, "content", ...route.slug.split("/"));
    const bodyHtmlPath = path.join(contentDir, "body.html");
    if (!fs.existsSync(bodyHtmlPath)) {
      console.log(`[miss] ${route.slug}: ${bodyHtmlPath} not found`);
      continue;
    }

    const bodyHtml = fs.readFileSync(bodyHtmlPath, "utf8");
    const fields = extractFields(bodyHtml);

    await prisma.pageOverride.upsert({
      where: { slug: route.slug },
      update: { fields },
      create: { slug: route.slug, fields },
    });
    console.log(`[ok] ${route.slug}: ${Object.keys(fields).length} fields`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
