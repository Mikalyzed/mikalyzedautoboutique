import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
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
