import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {
    root: __dirname,
    resolveAlias: {
      'next/dist/build/polyfills/polyfill-module': path.resolve(__dirname, 'empty-polyfill.js'),
      'next/dist/build/polyfills/polyfill-nomodule': path.resolve(__dirname, 'empty-polyfill.js'),
    },
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
    }),
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const emptyPolyfillPath = path.resolve(__dirname, 'empty-polyfill.js');
      config.resolve.alias['next/dist/build/polyfills/polyfill-module'] = emptyPolyfillPath;
      config.resolve.alias['next/dist/build/polyfills/polyfill-module$'] = emptyPolyfillPath;
      config.resolve.alias['next/dist/build/polyfills/polyfill-nomodule'] = emptyPolyfillPath;
      config.resolve.alias['next/dist/build/polyfills/polyfill-nomodule$'] = emptyPolyfillPath;
    }
    return config;
  },
};

export default nextConfig;
