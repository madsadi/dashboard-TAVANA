/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    app: {
      COMMISSION_BASE_URL: process.env.COMMISSION_BASE_URL,
      NETFLOW: process.env.NETFLOW,
      ADMIN_GATEWAY: process.env.ADMIN_GATEWAY,
      FILE_SERVER: process.env.FILE_SERVER,
      IDP: process.env.IDP,
      MARKETER_ADMIN: process.env.MARKETER_ADMIN,
      ONLINE_TRADING: process.env.ONLINE_TRADING,
    }
  }
}

module.exports = nextConfig
