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
            label:'مدیریت کارمزد ها',
            url: '/account'
        },
        {
            label:'ثبت نام غیر حضوری',
        },
        {
            label:'نت فلو',
            items: [
                {
                    label: 'معاملات'
                },
                {
                    label: 'معاملات تسویه شده'
                },
                {
                    label: 'تسویه روزانه کارگزاری'
                },
                {
                    label: 'تسویه تهاتری'
                },
                {
                    label: 'ضرایب کارمزرد ها'
                },
                {
                    label: 'استثنا ضرایب کارمزد ها'
                },
                {
                    label: 'دریافت اطلاعات',
                    url: '/getInformation'
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
