import getConfig from "next/config";
const { publicRuntimeConfig: config } = getConfig();

export const ONLINE_TRADING =
  typeof window !== "undefined"
    ? window._env_.OnlineTradingGatewayEndPoint
      ? window._env_.OnlineTradingGatewayEndPoint
      : config.app.OnlineTradingGatewayEndPoint
    : config.app.OnlineTradingGatewayEndPoint;

export const IDP =
  typeof window !== "undefined"
    ? window._env_.IdpEndPoint
      ? window._env_.IdpEndPoint
      : config.app.IdpEndPoint
    : config.app.IdpEndPoint;

export const NETFLOW =
  typeof window !== "undefined"
    ? window._env_.NetflowEndPoint
      ? window._env_.NetflowEndPoint
      : config.app.NetflowEndPoint
    : config.app.NetflowEndPoint;

export const ADMIN_GATEWAY =
  typeof window !== "undefined"
    ? window._env_.AdminGatewayEndPoint
      ? window._env_.AdminGatewayEndPoint
      : config.app.AdminGatewayEndPoint
    : config.app.AdminGatewayEndPoint;

export const FILE_SERVER =
  typeof window !== "undefined"
    ? window._env_.FileManagerEndPoint
      ? window._env_.FileManagerEndPoint
      : config.app.FileManagerEndPoint
    : config.app.FileManagerEndPoint;

export const MARKETER_ADMIN =
  typeof window !== "undefined"
    ? window._env_.MarketerAdminEndPoint
      ? window._env_.MarketerAdminEndPoint
      : config.app.MarketerAdminEndPoint
    : config.app.MarketerAdminEndPoint;

export const SEJAM_GATEWAY =
  typeof window !== "undefined"
    ? window._env_.SejamGatewayEndPoint
      ? window._env_.SejamGatewayEndPoint
      : config.app.SejamGatewayEndPoint
    : config.app.SejamGatewayEndPoint;

export const CREDIT_MANAGEMENT =
  typeof window !== "undefined"
    ? window._env_.CreditManagementEndPoint
      ? window._env_.CreditManagementEndPoint
      : config.app.CreditManagementEndPoint
    : config.app.CreditManagementEndPoint;
