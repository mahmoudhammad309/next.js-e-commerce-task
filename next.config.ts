import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_BASE_URL: 'http://localhost:5000',
    JWT_SECRET: 'very secret',
  },
};

export default nextConfig;
