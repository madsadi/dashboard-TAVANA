import getConfig from "next/config";
const { publicRuntimeConfig: config } = getConfig();

export const ONLINE_TRADING =
    typeof window !== "undefined"
        ? window._env_.ONLINE_TRADING
            ? window._env_.ONLINE_TRADING
            : config.app.ONLINE_TRADING
        : config.app.ONLINE_TRADING;

export const IDP =
    typeof window !== "undefined"
        ? window._env_.IDP
            ? window._env_.IDP
            : config.app.IDP
        : config.app.IDP;

export const NETFLOW =
    typeof window !== "undefined"
        ? window._env_.NETFLOW
            ? window._env_.NETFLOW
            : config.app.NETFLOW
        : config.app.NETFLOW;

export const ADMIN_GATEWAY =
    typeof window !== "undefined"
        ? window._env_.ADMIN_GATEWAY
            ? window._env_.ADMIN_GATEWAY
            : config.app.ADMIN_GATEWAY
        : config.app.ADMIN_GATEWAY;

export const FILE_SERVER =
    typeof window !== "undefined"
        ? window._env_.FILE_SERVER
            ? window._env_.FILE_SERVER
            : config.app.FILE_SERVER
        : config.app.FILE_SERVER;

export const MARKETER_ADMIN =
    typeof window !== "undefined"
        ? window._env_.MARKETER_ADMIN
            ? window._env_.MARKETER_ADMIN
            : config.app.MARKETER_ADMIN
        : config.app.MARKETER_ADMIN;

export const SEJAM_GATEWAY =
    typeof window !== "undefined"
        ? window._env_.SEJAM_GATEWAY
            ? window._env_.SEJAM_GATEWAY
            : config.app.SEJAM_GATEWAY
        : config.app.SEJAM_GATEWAY;

export const MARKETER_CLIENT =
    typeof window !== "undefined"
        ? window._env_.MARKETER_CLIENT
            ? window._env_.MARKETER_CLIENT
            : config.app.MARKETER_CLIENT
        : config.app.MARKETER_CLIENT;
