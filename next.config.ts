import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'minio.api.finnegan.dev' },
    ],
  },
};

export default nextConfig;