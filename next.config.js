/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    COMMISSION_BASE_URL:'http://172.24.65.20:9007/api',
    NETFLOW_BASE_URL:'http://172.24.65.20:8091',
    MARKET_RULES_MANAGEMENT:'http://172.24.65.20:9020/api',
    BOOKBUILDING_BASE_URL:'http://172.24.65.20:9020/api/request',
    USERS:'https://cluster.tech1a.co/api',
    BASE_URL:'http://cluster.tech1a.co/api'
  },
}

module.exports = nextConfig
