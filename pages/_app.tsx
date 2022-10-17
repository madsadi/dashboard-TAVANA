import '../styles/globals.css'
import type {AppProps} from 'next/app'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'primeflex/primeflex.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {Provider} from "react-redux";
import store from "../store";
import Head from "next/head";
import React from 'react';
React.useLayoutEffect = React.useEffect

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>پنل ادمین | tech1a</title>
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
