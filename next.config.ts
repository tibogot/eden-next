import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable modern image formats
    formats: ["image/avif", "image/webp"],

    // Define device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Define image sizes for smaller images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Increase cache TTL for better performance (31 days)
    minimumCacheTTL: 2678400,

    // Define quality levels
    qualities: [50, 75, 90],
  },
};

export default nextConfig;
