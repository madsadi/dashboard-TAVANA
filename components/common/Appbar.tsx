import React from 'react';
import { Menubar } from 'primereact/menubar';
import Image from 'next/image';
import Link from 'next/link';
import SideBar from "./SideBar";

export default function Appbar () {

    const items = [
        {
            label: 'گزارشات',
        },
        {
            label: 'اسناد',
        },
        {
            label: 'کاربران',
        },
        {
            label: 'خروج',
            url:'/'
        }
    ];

    const end = <><Link href={'/'}><a className={'mr-5'}><Image src={'/logo-2.png'} height={'35px'} width={'35px'}/></a></Link></>;
    const start = <SideBar/>;

    return (
        <>
            <div className={'fixed top-0 w-full z-5 bg-white border-bottom-1 border-200'}>
                <div className="card">
                    <div className={'container'}>
                        <Menubar model={items} start={start} end={end} className={'border-0 bg-white px-0'}/>
                    </div>
                </div>
            </div>
        </>
    );
}
                 