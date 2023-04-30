import axios from "axios";
import Router from "next/router";

axios.interceptors.request.use((value) => {
    const clientId = 'admin-gateway';
    const authorityPath = 'https://cluster.tech1a.co';

    if (typeof window !== 'undefined') {
        const oidcStorage:any = localStorage.getItem(`oidc.user:${authorityPath}:${clientId}`)
        let token = JSON.parse(oidcStorage)?.access_token
        value.headers = {
            'accept': '*/*',
            'Authorization': 'Bearer '+`${token}`
        }

        return value
    }
})

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('oidc.user:https://cluster.tech1a.co:admin-gateway');
                Router.push('/');
            }
        }

        return Promise.reject(error);
    }
);