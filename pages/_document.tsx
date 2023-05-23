import Document, {Html, Head, Main, NextScript} from 'next/document';
import React from 'react';

class MyDocument extends Document {

    render() {
        return (
            <Html className={'h-full '} dir={"rtl"}>
                <Head>
                    <script src="/static/assets/js/env-config.js"></script>
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