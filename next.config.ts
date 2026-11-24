import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
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
