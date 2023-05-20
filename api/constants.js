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

export const COMMISSION_BASE_URL =
    typeof window !== "undefined"
        ? window._env_.COMMISSION_BASE_URL
            ? window._env_.COMMISSION_BASE_URL
            : config.app.COMMISSION_BASE_URL
        : config.app.COMMISSION_BASE_URL;

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
