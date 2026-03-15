import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Attempting to resolve workspace issues by allowing parent directory resolution
  // If Turbopack continues to fail, use --no-turbo
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "pg"],
  },
};

export default nextConfig;
