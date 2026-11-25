import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  async headers() {
    return [
      {
        // Everything under /public/wp-content (migrated WordPress images,
        // CSS, JS, fonts) was served with Cache-Control: max-age=0, so
        // browsers and Vercel's edge cache both refetched it on every
        // request. No max-age=31536000 + immutable here, deliberately:
        // these filenames aren't content-hashed (we've already overwritten
        // some in place, e.g. the image compression pass), so a visitor's
        // cache could go stale for a year if we ever edit one again.
        // 30 days + stale-while-revalidate gets most of the benefit
        // (repeat visits, edge caching) while bounding that risk, and lets
        // a hard refresh still pick up a changed file reasonably soon.
        source: "/wp-content/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // /honoraires/ was a duplicate of /foire-aux-questions/ on the live
      // site (identical H1, content, and metadata) - consolidating onto
      // one URL instead of leaving both indexed.
      {
        source: "/honoraires",
        destination: "/foire-aux-questions/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
