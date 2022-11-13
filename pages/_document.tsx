import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html className={'h-full '} dir={"rtl"}>
                <Head>
                    <link rel='stylesheet' href='/yekanBakhFont.css'/>
                    <link rel='shortcut icon' href='/logo-2.png'/>
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