// Canonical production domain for absolute URLs (sitemap, canonical tags,
// structured data). Overridable via env for a staging deploy on another host.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gf-expertise.fr").replace(/\/$/, "");
