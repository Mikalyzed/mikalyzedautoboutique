import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
