/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    COMMISSION_BASE_URL:'http://172.24.65.20:9007/api',
    NETFLOW:'http://172.24.65.20:8091',
    ADMIN_GATEWAY:'http://172.24.65.20:9020/api',
    FILE_SERVER: 'http://cluster.tech1a.co:9073/api/',
    IDP:'https://cluster.tech1a.co/api',
    BASE_URL:'http://cluster.tech1a.co/api'
  },
}

module.exports = nextConfig
