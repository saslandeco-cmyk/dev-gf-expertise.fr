import type { MetadataRoute } from "next";

// Site-wide crawl block while the migration isn't ready to go live - paired
// with the global `robots: { index: false }` in app/layout.tsx. To go live:
// flip this back to `allow: "/", disallow: ["/admin/", "/api/"]`, add back
// `sitemap: `${SITE_URL}/sitemap.xml``, and remove the layout.tsx override.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
