import Document, {Html, Head, Main, NextScript} from 'next/document';
import React from 'react';

class MyDocument extends Document {

    render() {
        return (
            <Html className={'h-full '} dir={"rtl"}>
                <Head>
                    <link rel='shortcut icon' href='/logo-2.png'/>
                    <script src="/static/assets/js/env-config.js"/>
                </Head>
                <body className={'custom-scrollbar'}>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument