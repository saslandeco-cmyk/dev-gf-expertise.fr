import * as cheerio from "cheerio";
import { prisma } from "@/lib/prisma";

type FieldOverrides = Record<string, string>;

/**
 * Applies any saved PageOverride fields for `slug` on top of `staticHtml`
 * (which already carries data-edit-id attributes from generate.mjs) and
 * returns the resulting HTML. Falls back to `staticHtml` unchanged if
 * there's no override row, or if the DB is unreachable - this is what
 * guarantees existing pages can't visually break.
 */
export async function getEffectiveBodyHtml(slug: string, staticHtml: string): Promise<string> {
  let fields: FieldOverrides | null = null;
  try {
    const row = await prisma.pageOverride.findUnique({ where: { slug } });
    if (row) fields = row.fields as FieldOverrides;
  } catch {
    return staticHtml;
  }

  if (!fields || Object.keys(fields).length === 0) {
    return staticHtml;
  }

  const $ = cheerio.load(staticHtml);
  for (const [editId, value] of Object.entries(fields)) {
    const el = $(`[data-edit-id="${editId}"]`);
    if (el.length === 0) continue;
    if (el.is("img")) {
      el.attr("src", value);
    } else {
      el.text(value);
    }
  }

  // staticHtml is a <body> fragment, not a full document - cheerio.load()
  // implicitly wraps fragments in <html><body>, so read back through
  // "body" to get just the fragment's inner HTML again.
  return $("body").html() ?? staticHtml;
}
