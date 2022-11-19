import React from "react"
import Head from "next/head"

export default function Page500() {
    return (
        <div className="w-full h-full flex">
            <Head>
                <title>صفحه مورد نظر پیدا نشد!</title>
            </Head>
            <div className={'m-auto'}>
                <div className={'flex'}>
                    <div className="text-center">
                        <h1 className="fw-medium">
                            <div className={'d-flex align-items-center'} style={{width:'fit-content',margin:'auto'}}>
                                500
                            </div>
                        </h1>
                        <h4 className="text-uppercase">مشکلی رخ داده است! لطفا دوباره سعی کنید.</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

