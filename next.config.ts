import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  outputFileTracingExcludes: {
    '*': [
      'C:/Users/**',
      'C:\\Users\\**',
      '**/Ambiente de Impressão/**',
      '**/Ambiente de Rede/**',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules/**', 'C:/Users/**', 'C:\\Users\\**'],
    };
    return config;
  },
};

export default nextConfig;
