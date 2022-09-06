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
        }
    ];

    const end = <><Link href={'/'}><a><Image src={'/logo-2.png'} height={'35px'} width={'35px'}/></a></Link></>;
    const start = <SideBar/>;

    return (
        <>
            <div className={'fixed top-0 w-full'}>
                <div className="card">
                    <Menubar model={items} start={start} end={end} />
                </div>
            </div>
        </>
    );
}
                 