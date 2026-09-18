import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {
    root: __dirname,
  },
  experimental: {
    workerThreads: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  compiler: {
    // Target modern ES2022 — no polyfills for .at(), .flat(), Object.hasOwn(), etc.
    ...(process.env.NODE_ENV === 'production' && {
      reactRemoveProperties: true,
      removeConsole: { exclude: ['error'] },
    }),
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
