import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    // Temporary: disable Next.js image optimization to avoid 400 responses
    // for image paths while static assets are moved into `public/images`.
    // Long-term: move the `images/` folder into `public/` and remove this.
    unoptimized: true,
  },
};

export default nextConfig;
