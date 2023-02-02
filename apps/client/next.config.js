/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: '/basketball/play',
      destination: '/assets/basketball/play.html',
    },
  ],
}

module.exports = nextConfig
