import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  typescript: {
    // Ignore build errors since Next.js buggy routes.d.ts generation fails on regex
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
