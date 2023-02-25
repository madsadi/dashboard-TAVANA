import React from 'react';
import {useRouter} from "next/router";
import {Sidebar} from 'flowbite-react';
import Link from "next/link";

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
            expanded: router.pathname.startsWith('/users-management'),
            children: [
                {
                    id: 2.1,
                    label: 'کاربران',
                    url: '/users-management/users',
                    className: router.pathname === '/users-management/users' ? 'sideBarActive' : '',
                },
                {
                    id: 2.2,
                    label: 'نقش و دسترسی',
                    url: '/users-management/roles',
                    className: router.pathname === '/users-management/roles' ? 'sideBarActive' : '',
                },
                {
                    id: 2.3,
                    label: 'ورود/خروج کاربران',
                    url: '/users-management/logs',
                    className: router.pathname === '/users-management/logs' ? 'sideBarActive' : '',
                }
            ]
        },
        {
            id: 3,
            label: 'مدیریت مشتریان',
            expanded: router.pathname.startsWith('/customer-management'),
            children: [
                {
                    id: 3.1,
                    label: 'شرکت ها',
                    url: '/customer-management/subsidiary',
                    className: router.pathname === '/customer-management/subsidiary' ? 'sideBarActive' : '',
                },
                {
                    id: 3.2,
                    label: 'شعب',
                    url: '/customer-management/branch',
                    className: router.pathname === '/customer-management/branch' ? 'sideBarActive' : '',
                },
                {
                    id: 3.3,
                    label: 'کارمندان',
                    url: '/customer-management/employee',
                    className: router.pathname === '/customer-management/employee' ? 'sideBarActive' : '',
                },
                {
                    id: 3.4,
                    label: 'واحد کاری',
                    url: '/customer-management/businessUnit',
                    className: router.pathname === '/customer-management/businessUnit' ? 'sideBarActive' : '',
                },
                {
                    id: 3.5,
                    label: 'ایستگاه معاملاتی',
                    url: '/customer-management/station',
                    className: router.pathname === '/customer-management/station' ? 'sideBarActive' : '',
                },
                {
                    id: 3.6,
                    label: 'معامله گران',
                    url: '/customer-management/trader',
                    className: router.pathname === '/customer-management/trader' ? 'sideBarActive' : '',
                },
                {
                    id: 3.7,
                    label: 'بازاریاب ها',
                    url: '/customer-management/marketer',
                    className: router.pathname === '/customer-management/marketer' ? 'sideBarActive' : '',
                },
                {
                    id: 3.8,
                    label: 'توافقنامه ها',
                    url: '/customer-management/agreement',
                    className: router.pathname === '/customer-management/agreement' ? 'sideBarActive' : '',
                },
                {
                    id: 3.9,
                    label: 'توافقنامه های بین طرفین',
                    url: '/customer-management/customerAgreement',
                    className: router.pathname === '/customer-management/customerAgreement' ? 'sideBarActive' : '',
                }
            ]
        },
        {
            id: 4,
            label: 'سفارشات آنلاین',
            expanded: router.pathname.startsWith('/online-trades-orders'),
            children: [
                {
                    id: 4.1,
                    label: 'سفارشات',
                    url: '/online-trades-orders/orders',
                    className: router.pathname === '/online-trades-orders/orders' ? 'sideBarActive' : '',
                },
                {
                    id: 4.2,
                    label: 'معاملات',
                    url: '/online-trades-orders/trades',
                    className: router.pathname === '/online-trades-orders/trades' ? 'sideBarActive' : '',
                },
                {
                    id: 4.3,
                    label: 'حذف گروهی سفارشها',
                    url: '/online-trades-orders/cancel-orders',
                    className: router.pathname === '/online-trades-orders/cancel-orders' ? 'sideBarActive' : '',
                }
            ],
        },
        {
            id: 5,
            label: 'پرتفو',
            expanded: router.pathname.startsWith('/portfo'),
            children: [
                {
                    id: 5.1,
                    label: 'پرتفو لحضه ای',
                    url: '/portfo/live-portfo',
                    className: router.pathname === '/portfo/live-portfo' ? 'sideBarActive' : '',
                }
            ],
        },
        {
            id: 6,
            label: 'وضعیت OMS',
            expanded: router.pathname.startsWith('/oms'),
            children: [
                {
                    id: 6.1,
                    label: 'وضعیت جلسه معاملاتی',
                    url: '/oms/trading-session',
                    className: router.pathname === '/oms/trading-session' ? 'sideBarActive' : '',
                },
                {
                    id: 6.2,
                    label: 'زمانبندی روز معاملاتی',
                    url: '/oms/trading-day-timetable',
                    className: router.pathname === '/oms/trading-day-timetable' ? 'sideBarActive' : '',
                }
            ]
        },
        {
            id: 7,
            label: 'مدیریت قوانین بازار',
            url: '/market-rules-management',
            expanded: false,
            className: router.pathname === '/market-rules-management' ? 'sideBarActive' : '',
        },
        {
            id: 8,
            label: 'عرضه اولیه',
            url: '/book-building',
            expanded: false,
            className: router.pathname === '/book-building' ? 'sideBarActive' : '',
        },
        {
            id: 9,
            label: 'مدیریت کارمزد ها',
            expanded: router.pathname.startsWith('/commission-management'),
            children: [
                {
                    id: 9.1,
                    label: 'ضرایب کارمزد',
                    url: '/commission-management/commission',
                    className: router.pathname === '/commission-management/commission' ? 'sideBarActive' : '',
                },
                {
                    id: 9.2,
                    label: 'گروه بندی ابزار مالی',
                    url: '/commission-management/instrument-type',
                    className: router.pathname === '/commission-management/instrument-type' ? 'sideBarActive' : '',
                },
                {
                    id: 9.3,
                    label: 'گروه بندی ضرایب کارمزد',
                    url: '/commission-management/category-panel',
                    className: router.pathname === '/commission-management/category-panel' ? 'sideBarActive' : '',
                },
            ]
        },
        {
            id: 10,
            label: 'نت فلو',
            expanded: router.pathname.startsWith('/netflow'),
            children: [
                {
                    id: 10.1,
                    label: 'معاملات',
                    url: '/netflow/trades-report',
                    className: router.pathname === '/netflow/Trades-report' ? 'sideBarActive' : '',
                },
                {
                    id: 10.2,
                    label: 'دریافت اطلاعات',
                    className: router.pathname === '/netflow/information' ? 'sideBarActive' : '',
                    url: '/netflow/information'
                },
                {
                    id: 10.3,
                    label: 'ضرایب کارمزد',
                    className: router.pathname === '/netflow/rules' ? 'sideBarActive' : '',
                    url: '/netflow/rules'
                },
                {
                    id: 10.4,
                    label: 'معاملات تسویه شده',
                    className: router.pathname === '/netflow/cleared-trade' ? 'sideBarActive' : '',
                    url: '/netflow/cleared-trade'
                },
                {
                    id: 10.4,
                    label: 'تسویه و پایاپای',
                    className: router.pathname === '/netflow/clearing-date-range' ? 'sideBarActive' : '',
                    url: '/netflow/clearing-date-range'
                }
            ]
        }
    ];

    return (
        <div className={'w-full'}>
            <Sidebar aria-label="Sidebar with multi-level dropdown example" style={{width: '100%'}}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup id={'menuGroup'}>
                        {
                            items.map((item: any) => {
                                if (item.children) {
                                    return (
                                        <Sidebar.Collapse
                                            id={'collapse'}
                                            label={item.label}
                                            key={item.label}
                                        >
                                            {item.children.map((child: any) => {
                                                return (
                                                    <Sidebar.Item key={child.label} active={router.pathname === child.url}
                                                                  href={child.url}>
                                                        {child.label}
                                                    </Sidebar.Item>
                                                )
                                            })}
                                        </Sidebar.Collapse>
                                    )
                                } else {
                                    return (
                                        <Sidebar.Item
                                            active={router.pathname === item.url}
                                            href={item.url}
                                            key={item.label}
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
