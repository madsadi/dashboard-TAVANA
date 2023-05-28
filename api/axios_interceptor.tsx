import axios from "axios";
import Router from "next/router";
import {IDP} from "./constants";

axios.interceptors.request.use((value) => {
    const clientId = 'admin-gateway';
    const authorityPath = IDP;

    if (typeof window !== 'undefined') {
        const oidcStorage:any = localStorage.getItem(`oidc.user:${authorityPath}:${clientId}`)
        let token = JSON.parse(oidcStorage)?.access_token
        value.headers = {
            'accept': '*/*',
            'Authorization': 'Bearer '+`${token}`,
            "Access-Control-Allow-Origin":"*"
        }

        return value
    }
})

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const clientId = 'admin-gateway';
        const authorityPath = IDP;

        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem(`oidc.user:${authorityPath}:${clientId}`);
                Router.push('/');
            }
        }

        return Promise.reject(error);
    }
);