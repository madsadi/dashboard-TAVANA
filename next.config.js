/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COMMISSION_BASE_URL:'http://cluster.tech1a.co:9007/api',
    NETFLOW_BASE_URL:'http://cluster.tech1a.co:8091/api',
  },
}

module.exports = nextConfig
