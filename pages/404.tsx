import React from "react"
import Link from "next/link"
import Head from "next/head"

export default function Page404() {
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
                                        4
                                        0
                                        4
                                    </div>
                                </h1>
                                <h4 className="text-uppercase">صفحه مورد نظرتان متاسفانه پیدا نشد!</h4>
                                <div className="mt-5 text-center">
                                    <Link href={"/dashboard"} passHref>
                                            <button className={'rounded text-white p-2 bg-gray-600 hover:bg-gray-500 transition-all'}>
                                                برگرد به صفحه اصلی
                                            </button>
                                    </Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
    )
}

