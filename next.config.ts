import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/demo/:slug",
        destination: "/demo/:slug/index.html",
      },
    ];
  },
};

export default nextConfig;
