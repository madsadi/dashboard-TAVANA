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
      NetflowEndPoint: process.env.NetflowEndPoint,
      MarketerAdminEndPoint: process.env.MarketerAdminEndPoint,
      CreditManagementEndPoint: process.env.CreditManagementEndPoint,
    },
  },
};

module.exports = nextConfig;
