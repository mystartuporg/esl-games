/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => [
    {
      source: "/api/basketball",
      destination: "/basketball/play",
      permanent: false
    },
  ],
  rewrites: async () => [
    {
      source: "/basketball/play",
      destination: "/api/basketball",
    }
  ]
}

module.exports = nextConfig
