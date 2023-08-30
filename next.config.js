/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    app: {
      IdpEndPoint: process.env.IdpEndPoint,
      OnlineTradingGatewayEndPoint: process.env.OnlineTradingGatewayEndPoint,
      AdminGatewayEndPoint: process.env.AdminGatewayEndPoint,
      FileManagerEndPoint: process.env.FileManagerEndPoint,
      SejamGatewayEndPoint: process.env.SejamGatewayEndPoint,

      NETFLOW: process.env.NETFLOW,
      MARKETER_ADMIN: process.env.MARKETER_ADMIN,
    }
  }
}

module.exports = nextConfig
