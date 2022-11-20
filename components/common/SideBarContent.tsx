import React from 'react';
import {useRouter} from "next/router";
import { Sidebar } from 'flowbite-react';

export default function SideBarContent() {
    const router = useRouter()

    const items = [
        {
            id: 1,
            label: 'داشبورد',
            expanded: false,
            url: '/dashboard',
            className: router.pathname === '/dashboard' ? 'sideBarActive' : '',
        },
        {
            id: 2,
            label: 'مدیریت کاربران',
            expanded: router.pathname.startsWith('/usersManagement'),
            children: [
                {
                    id: 2.1,
                    label: 'کاربران',
                    url: '/usersManagement/users',
                    className: router.pathname === '/usersManagement/users' ? 'sideBarActive' : '',
                },
                {
                    id: 2.2,
                    label: 'ورود/خروج کاربران',
                    url: '/usersManagement/logs',
                    className: router.pathname === '/usersManagement/logs' ? 'sideBarActive' : '',
                }
            ]
        },
        {
            id: 3,
            label: 'سفارشات آنلاین',
            expanded: router.pathname.startsWith('/onlineTradeAndOrders'),
            children: [
                {
                    id: 3.1,
                    label: 'سفارشات',
                    url: '/onlineTradeAndOrders/onlineOrders',
                    className: router.pathname === '/onlineTradeAndOrders/onlineOrders' ? 'sideBarActive' : '',
                },
                {
                    id: 3.2,
                    label: 'معاملات',
                    url: '/onlineTradeAndOrders/onlineTrades',
                    className: router.pathname === '/onlineTradeAndOrders/onlineTrades' ? 'sideBarActive' : '',
                },
                {
                    id: 3.3,
                    label: 'حذف گروهی سفارشها',
                    url: '/onlineTradeAndOrders/cancelOrders',
                    className: router.pathname === '/onlineTradeAndOrders/cancelOrders' ? 'sideBarActive' : '',
                }
            ],
        },
        {
            id: 4,
            label: 'مدیریت قوانین بازار',
            url: '/marketRulesManagement',
            expanded: false,
            className: router.pathname === '/marketRulesManagement' ? 'sideBarActive' : '',
        },
        {
            id: 5,
            label: 'عرضه اولیه',
            url: '/bookBuilding',
            expanded: false,
            className: router.pathname === '/bookBuilding' ? 'sideBarActive' : '',
        },
        // {
        // id:
        //     label:'مدیریت مشتریان',
        // },
        {
            id: 5,
            label: 'مدیریت کارمزد ها',
            expanded: router.pathname.startsWith('/commissionManagement'),
            children: [
                {
                    id: 5.1,
                    label: 'ضرایب کارمزد',
                    url: '/commissionManagement/commission',
                    className: router.pathname === '/commissionManagement/commission' ? 'sideBarActive' : '',
                },
                {
                    id: 5.2,
                    label: 'گروه بندی ابزار مالی',
                    url: '/commissionManagement/instrumentType',
                    className: router.pathname === '/commissionManagement/instrumentType' ? 'sideBarActive' : '',
                },
                {
                    id: 5.3,
                    label: 'گروه بندی ضرایب کارمزد',
                    url: '/commissionManagement/categoryPanel',
                    className: router.pathname === '/commissionManagement/categoryPanel' ? 'sideBarActive' : '',
                },
            ]
        },
        // {
        // id:
        //     label:'ثبت نام غیر حضوری',
        // },
        {
            id: 6,
            label: 'نت فلو',
            expanded: router.pathname.startsWith('/netFlow'),
            children: [
                // {
                // id:
                //     label: 'معاملات'
                // },
                {
                    id: 6.1,
                    label: 'معاملات تسویه شده',
                    url: '/netFlow/clearedTradesReport',
                    className: router.pathname === '/netFlow/clearedTradesReport' ? 'sideBarActive' : '',
                },
                // {
                // id:
                //     label: 'تسویه روزانه کارگزاری'
                // },
                // {
                // id:
                //     label: 'تسویه تهاتری'
                // },
                // {
                // id:
                //     label: 'ضرایب کارمزرد ها'
                // },
                // {
                // id:
                //     label: 'استثنا ضرایب کارمزد ها'
                // },
                {
                    id: 6.2,
                    label: 'دریافت اطلاعات',
                    className: router.pathname === '/netFlow/information' ? 'sideBarActive' : '',
                    url: '/netFlow/information'
                }
            ]
        },
        // {
        // id:
        //     label:'فایل معاملاتی',
        // },
        // {
        //     label:'بازاریابی',
        // },
    ];

    return (
        <div className={'w-full'}>
            <Sidebar aria-label="Sidebar with multi-level dropdown example" style={{width:'100%'}}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup id={'menuGroup'} >
                        {
                            items.map((item: any) => {
                                if (item.children) {
                                    return (
                                        <Sidebar.Collapse
                                            id={'collapse'}
                                            label={item.label}
                                            key={item.label}
                                        >
                                            {item.children.map((child:any)=>{
                                                return (
                                                    <Sidebar.Item href={child.url} key={child.label} active={router.pathname===child.url}>
                                                        {child.label}
                                                    </Sidebar.Item>
                                                )
                                            })}
                                        </Sidebar.Collapse>
                                    )
                                } else {
                                    return (
                                        <Sidebar.Item key={item.label}
                                                      id={'nonCollapse'}
                                                      href={item.url}
                                                      active={router.pathname===item.url}
                                        >
                                            {item.label}
                                        </Sidebar.Item>
                                    )
                                }
                            })
                        }
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}
