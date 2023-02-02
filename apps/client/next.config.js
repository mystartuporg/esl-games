/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => [
    {
      source: '/',
      destination: '/basketball/user-form',
      permanent: false,
    },
  ],
  rewrites: async () => [
    {
      source: '/assets/basketball/play.html',
      destination: '/basketball/play',
    },
  ],
}

module.exports = nextConfig
