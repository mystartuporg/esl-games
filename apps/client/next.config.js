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
}

module.exports = nextConfig
