/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Turbopack configuration (Next.js 16+ default)
  turbopack: {},
  // Suppress source map warnings in development
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'cheap-module-source-map';
    }
    return config;
  },
}

module.exports = nextConfig
