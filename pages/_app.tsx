import '../styles/globals.css';
import type {AppProps} from 'next/app';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {Provider} from "react-redux";
import store from "../store";
import Head from "next/head";
import React, {useEffect, useRef, useState} from 'react';
import {AuthProvider} from "react-oidc-context"
import Router from "next/router";
import '../api/axios_interceptor';
import Layout from "../components/common/layout/Layout";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {SWRConfig} from 'swr';
import {fetcher} from "../api/fetcher";
import {WebStorageStateStore} from "oidc-client-ts";
import {IDP} from "../api/constants";
import {ThemeProvider, useTheme} from "next-themes";

React.useLayoutEffect = React.useEffect

function MyApp({Component, pageProps}: AppProps) {
    const toast: any = useRef(null);
    const {theme, systemTheme} = useTheme();

    const authorityPath = IDP;
    // const authorityPath = 'http://localhost:3000';
    const clientId = 'admin-gateway';
    const clientURL = typeof window !== 'undefined' && window.location.origin;

    const oidcConfig = {
        userStore: typeof window !== 'undefined' ? new WebStorageStateStore({store: window.localStorage}) : undefined,
        authority: `${authorityPath}`,
        client_id: `${clientId}`,
        scope: 'openid IdentityServerApi customerinfo',
        response_type: 'code',
        redirect_uri: `${clientURL}/authentication/callback`,
        post_logout_redirect_uri: `${clientURL}`, // Auth0 uses returnTo
        silent_redirect_uri: `${clientURL}/authentication/silent_callback`,
        automaticSilentRenew: true,
        loadUserInfo: true,
        metadata: {
            issuer: `${authorityPath}/`,
            authorization_endpoint: `${authorityPath}/connect/authorize`,
            token_endpoint: `${authorityPath}/connect/token`,
            userinfo_endpoint: `${authorityPath}/connect/userinfo`,
            end_session_endpoint: `${authorityPath}/connect/endsession`
        }
    }

    const onSignIn = () => {
        Router.push('/dashboard')
    }

    const getFaviconPath = (isDarkMode = false) => {
        return `/logo-${isDarkMode ? "dark" : "light"}.svg`;
    };

    return (
        <AuthProvider {...oidcConfig} onSigninCallback={onSignIn}>
            <Provider store={store}>
                <Head>
                    <link rel='shortcut icon' href={getFaviconPath(systemTheme==='dark')}/>
                    {/*<link*/}
                    {/*    href="/logo-dark.svg"*/}
                    {/*    rel="icon"*/}
                    {/*    media="(prefers-color-scheme: light)"*/}
                    {/*/>*/}
                    {/*<link*/}
                    {/*    href="/logo-light.svg"*/}
                    {/*    rel="icon"*/}
                    {/*    media="(prefers-color-scheme: dark)"*/}
                    {/*/>*/}
                    <title>پنل ادمین | tech1a</title>
                </Head>
                <ToastContainer
                    ref={toast}
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    toastStyle={{fontFamily: "Yekan Bakh", fontSize: '14px'}}
                />
                <SWRConfig
                    value={{
                        revalidateOnFocus: false,
                        revalidateOnMount: false,
                        fetcher: fetcher
                    }}
                >
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                </SWRConfig>
            </Provider>
        </AuthProvider>
    )
}

export default MyApp
