import Document, {Html, Head, Main, NextScript} from 'next/document';
import React from 'react';

class MyDocument extends Document {

    render() {
        return (
            <Html className={'h-full '} lang={'fa'} dir={"rtl"}>
                <Head>
                    <script src="/static/assets/js/env-config.js"></script>
                    <meta name="description" content="tech1a admin-panel"/>
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