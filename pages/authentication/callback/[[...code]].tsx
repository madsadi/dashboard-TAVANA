import React from "react";
import Image from "next/image";

export default function SignInInfo() {
    return (
        <div className={'flex min-h-screen w-full'}>
              <span className={'animate-spin m-auto h-12'}>
                <Image src={'/icons/spinner.svg'} width={48} height={48} alt={'spinner'}/>
              </span>
        </div>
    )
}