/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.mapbox.com'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'TNT Transportation Platform',
  },
};

module.exports = nextConfig;
