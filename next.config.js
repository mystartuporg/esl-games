/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => [
    {
      source: "/assets/basketball/play.html",
      destination: "/basketball/play",
      permanent: false
    },
  ],
  rewrites: async () => [
    {
      source: "/basketball/play",
      destination: "/assets/basketball/play.html",
    }
  ]
}

module.exports = nextConfig
