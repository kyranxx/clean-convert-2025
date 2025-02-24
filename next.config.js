/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // We'll add domains for image optimization as needed
  },
  webpack: (config, { isServer }) => {
    // Handle image files
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|tiff|bmp|ico)$/i,
      type: 'asset/resource',
    });

    // Handle Prisma and Sharp.js
    if (isServer) {
      config.externals = [...(config.externals || []), 'sharp', '@prisma/client']
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false
      };
    }

    return config;
  }
}

module.exports = nextConfig
