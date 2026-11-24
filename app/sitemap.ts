import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site-url";
import routes from "@/lib/generated/site-routes.json";

// Kept in sync with the robots:noindex pages in their own metadata exports -
// a noindex page has no business being advertised in the sitemap.
const NOINDEX_SLUGS = new Set([
  "contact",
  "expert-en-batiment",
  "expert-en-batiment-landes-pays-basque-bordeaux-sud",
  "mentions-legales",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = routes
    .filter((route) => !NOINDEX_SLUGS.has(route.slug))
    .map((route) => ({
      url: `${SITE_URL}${route.pathname}`,
      changeFrequency: "monthly" as const,
    }));

  let dbEntries: MetadataRoute.Sitemap = [];
  try {
    const [posts, pages] = await Promise.all([
      prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.page.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ]);
    dbEntries = [
      { url: `${SITE_URL}/blog/`, changeFrequency: "weekly" },
      ...posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}/`,
        lastModified: post.updatedAt,
        changeFrequency: "monthly" as const,
      })),
      ...pages.map((page) => ({
        url: `${SITE_URL}/${page.slug}/`,
        lastModified: page.updatedAt,
        changeFrequency: "monthly" as const,
      })),
    ];
  } catch {
    // DB unreachable - ship the static routes only, same fallback as every
    // other DB-backed page on this site.
  }

  return [...staticEntries, ...dbEntries];
}
