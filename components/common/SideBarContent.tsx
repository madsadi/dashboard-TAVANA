import React from 'react';
import {PanelMenu} from 'primereact/panelmenu';
import {useRouter} from "next/router";

export default function SideBarContent() {
    const router=useRouter()

    const items = [
        // {
        //     label:'داشبورد',
        // },
        // {
        //     label:'مدیریت کاربران',
        // },
        // {
        //     label:'مدیریت مشتریان',
        // },
        {
            label:'مدیریت کارمزد ها',
            expanded:router.pathname.startsWith('/commissionManagement'),
            items: [
                {
                    label: 'ضرایب کارمزد',
                    url:'/commissionManagement/commission',
                    className:router.pathname==='/commissionManagement/commission' ? 'sideBarActive':'',
                },
                {
                    label: 'گروه بندی ابزار مالی',
                    url:'/commissionManagement/instrumentType',
                    className:router.pathname==='/commissionManagement/instrumentType' ? 'sideBarActive':'',
                },
                {
                    label: 'گروه بندی ضرایب کارمزد',
                    url:'/commissionManagement/categoryPanel',
                    className:router.pathname==='/commissionManagement/categoryPanel' ? 'sideBarActive':'',
                },
            ]
        },
        // {
        //     label:'ثبت نام غیر حضوری',
        // },
        {
            label:'نت فلو',
            expanded:router.pathname.startsWith('/netFlow'),
            items: [
                {
                    label: 'معاملات'
                },
                {
                    label: 'معاملات تسویه شده',
                    url: '/netFlow/clearedTradesReport'
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
                    className:router.pathname==='/netFlow/information' ? 'sideBarActive':'',
                    url: '/netFlow/information'
                }
            ]
        },
        {
            label: 'عرضه اولیه',
            url: '/bookBuilding/',
            expanded:false,
            className:router.pathname==='/bookBuilding' ? 'sideBarActive':'',
        },
        // {
        //     label:'مدیریت سفارش ها',
        // },
        {
            label:'مدیریت قوانین بازار',
            url:'/marketRulesManagement',
            expanded:false,
            className:router.pathname==='/marketRulesManagement' ? 'sideBarActive':'',
        },
        // {
        //     label:'فایل معاملاتی',
        // },
        // {
        //     label:'بازاریابی',
        // },
    ];

    return (
            <div className="card">
                <PanelMenu model={items}/>
            </div>
    );
}
