import '../styles/globals.css'
import type {AppProps} from 'next/app'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'primeflex/primeflex.css';
import '../styles/DataTableDemo.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {Provider} from "react-redux";
import store from "../store";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
