import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
  },
  poweredByHeader: false,
  async redirects() {
    // Locations moved from /locations/* to /location/* (Country & City Pages).
    return [
      {
        source: "/locations/:slug",
        destination: "/location/:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloud) return [];
    // Serve Cloudinary assets from our own domain via /media/* so image URLs
    // are same-origin (not flagged as external links).
    return [
      {
        source: "/media/:path*",
        destination: `https://res.cloudinary.com/${cloud}/:path*`,
      },
    ];
  },
};

export default nextConfig;
