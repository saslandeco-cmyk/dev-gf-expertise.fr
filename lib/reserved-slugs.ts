import routes from "@/lib/generated/site-routes.json";

// Top-level app/ folders that aren't in site-routes.json (that file only
// lists migrated WordPress pages) but still own their first URL segment.
const EXTRA_RESERVED = ["admin", "api", "blog"];

const RESERVED = new Set<string>([
  ...EXTRA_RESERVED,
  ...routes.map((r) => r.slug.split("/")[0]),
]);

// A custom Page can never be created at one of these slugs, so it can never
// shadow an existing static route - Next.js would never route to it anyway.
export function isReservedSlug(slug: string): boolean {
  return RESERVED.has(slug);
}
