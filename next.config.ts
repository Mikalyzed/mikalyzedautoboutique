import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagesdl.dealercenter.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
