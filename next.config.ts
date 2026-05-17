import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://indian-tennis-cricket-premier-league.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;