import React from 'react';
import {PanelMenu} from 'primereact/panelmenu';

export default function SideBarContent() {
    const items = [
        {
            label:'داشبورد',
        },
        {
            label:'مدیریت کاربران',
        },
        {
            label:'مدیریت مشتریان',
        },
        {
            label:'ثبت نام غیر حضوری',
        },
        {
            label:'نت فلو',
            items: [
                {
                    label: 'مدیریت کارمزد ها'
                }
            ]
        },
        {
            label:'مدیریت سفارش ها',
        },
        {
            label:'فایل معاملاتی',
        },
        {
            label:'بازاریابی',
        },
    ];

    return (
        <>
            <div className="card">
                <PanelMenu model={items}/>
            </div>
        </>
    );
}
