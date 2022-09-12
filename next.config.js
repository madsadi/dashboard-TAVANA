/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    COMMISSION_BASE_URL:'http://172.24.65.20:9007/api',
    NETFLOW_BASE_URL:'http://172.24.65.20:8091',
  },
}

module.exports = nextConfig
