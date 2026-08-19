/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
};

export default nextConfig;
