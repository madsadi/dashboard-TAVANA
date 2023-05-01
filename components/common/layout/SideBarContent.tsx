import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import SidebarCollapsibleComponent from "../components/Sidebar-collapsible.component";

export default function SideBarContent() {
    const router = useRouter()
    const items = [
        {
            label: 'داشبورد',
            expanded: false,
            url: '/dashboard',
            className: router.pathname === '/dashboard' ? 'sideBarActive' : '',
        },
        {
            label: 'مدیریت کاربران',
            expanded: router.pathname.startsWith('/users-management'),
            children: [
                {
                    label: 'کاربران',
                    url: '/users-management/users',
                    className: router.pathname === '/users-management/users' ? 'sideBarActive' : '',
                },
                {
                    label: 'نقش و دسترسی',
                    url: '/users-management/roles',
                    className: router.pathname === '/users-management/roles' ? 'sideBarActive' : '',
                },
                {
                    label: 'ورود/خروج کاربران',
                    url: '/users-management/logs',
                    className: router.pathname === '/users-management/logs' ? 'sideBarActive' : '',
                }
            ]
        },
        {
            label: 'ثبت نام غیرحضوری',
            expanded: router.pathname.startsWith('/online-registration'),
            children: [
                {
                    label: 'گزارش ثبت نام',
                    url: '/online-registration/registration-report',
                    className: router.pathname === '/online-registration/registration-report' ? 'sideBarActive' : '',
                }
            ]
        },
        {
            label: 'مدیریت مشتریان',
            expanded: router.pathname.startsWith('/customer-management'),
            children: [
                {
                    label: 'شرکت ها',
                    url: '/customer-management/subsidiary',
                    className: router.asPath === `/customer-management/subsidiary` ? 'sideBarActive' : '',
                },
                {
                    label: 'شعب',
                    url: '/customer-management/branch',
                    className: router.asPath === '/customer-management/branch' ? 'sideBarActive' : '',
                },
                {
                    label: 'کارمندان',
                    url: '/customer-management/employee',
                    className: router.asPath === '/customer-management/employee' ? 'sideBarActive' : '',
                },
                {
                    label: 'واحد کاری',
                    url: '/customer-management/businessUnit',
                    className: router.asPath === '/customer-management/businessUnit' ? 'sideBarActive' : '',
                },
                {
                    label: 'ایستگاه معاملاتی',
                    url: '/customer-management/station',
                    className: router.asPath === '/customer-management/station' ? 'sideBarActive' : '',
                },
                {
                    label: 'معامله گران',
                    url: '/customer-management/trader',
                    className: router.asPath === '/customer-management/trader' ? 'sideBarActive' : '',
                },
                {
                    label: 'بازاریاب ها',
                    url: '/customer-management/marketer',
                    className: router.asPath === '/customer-management/marketer' ? 'sideBarActive' : '',
                },
                {
                    label: 'قرارداد بازاریابی',
                    url: '/customer-management/contract',
                    className: router.asPath === '/customer-management/contract' ? 'sideBarActive' : '',
                },
                {
                    label: 'قرارداد با بازاریاب',
                    url: '/customer-management/marketerContract',
                    className: router.asPath === '/customer-management/marketerContract' ? 'sideBarActive' : '',
                },
                {
                    label: 'توافقنامه ها',
                    url: '/customer-management/agreement',
                    className: router.asPath === '/customer-management/agreement' ? 'sideBarActive' : '',
                },
                {
                    label: 'توافقنامه های بین طرفین',
                    url: '/customer-management/customerAgreement',
                    className: router.asPath === '/customer-management/customerAgreement' ? 'sideBarActive' : '',
                }
            ]
        },
        {
            label: 'سفارشات آنلاین',
            expanded: router.pathname.startsWith('/online-trades-orders'),
            children: [
                {
                    label: 'سفارشات',
                    url: '/online-trades-orders/orders',
                    className: router.pathname === '/online-trades-orders/orders' ? 'sideBarActive' : '',
                },
                {
                    label: 'معاملات',
                    url: '/online-trades-orders/trades',
                    className: router.pathname === '/online-trades-orders/trades' ? 'sideBarActive' : '',
                },
                {
                    label: 'حذف گروهی سفارشها',
                    url: '/online-trades-orders/cancel-orders',
                    className: router.pathname === '/online-trades-orders/cancel-orders' ? 'sideBarActive' : '',
                }
            ],
        },
        {
            label: 'پرتفو',
            expanded: router.pathname.startsWith('/portfo'),
            children: [
                {
                    label: 'پرتفو لحضه ای',
                    url: '/portfo/live-portfo',
                    className: router.pathname === '/portfo/live-portfo' ? 'sideBarActive' : '',
                }
            ],
        },
        {
            label: 'وضعیت OMS',
            expanded: router.pathname.startsWith('/oms'),
            children: [
                {
                    label: 'وضعیت جلسه معاملاتی',
                    url: '/oms/trading-session',
                    className: router.pathname === '/oms/trading-session' ? 'sideBarActive' : '',
                },
                {
                    label: 'زمانبندی روز معاملاتی',
                    url: '/oms/trading-day-timetable',
                    className: router.pathname === '/oms/trading-day-timetable' ? 'sideBarActive' : '',
                }
            ]
        },
        {
            label: 'مدیریت قوانین بازار',
            url: '/market-rules-management',
            expanded: false,
            className: router.pathname === '/market-rules-management' ? 'sideBarActive' : '',
        },
        {
            label: 'عرضه اولیه',
            url: '/book-building',
            expanded: false,
            className: router.pathname === '/book-building' ? 'sideBarActive' : '',
        },
        {
            label: 'مدیریت کارمزد ها',
            expanded: router.pathname.startsWith('/commission-management'),
            children: [
                {
                    label: 'ضرایب کارمزد',
                    url: '/commission-management/commission',
                    className: router.pathname === '/commission-management/commission' ? 'sideBarActive' : '',
                },
                {
                    label: 'گروه بندی ابزار مالی',
                    url: '/commission-management/instrument-type',
                    className: router.pathname === '/commission-management/instrument-type' ? 'sideBarActive' : '',
                },
                {
                    label: 'گروه بندی ضرایب کارمزد',
                    url: '/commission-management/category-panel',
                    className: router.pathname === '/commission-management/category-panel' ? 'sideBarActive' : '',
                },
            ]
        },
        {
            label: 'نت فلو',
            expanded: router.pathname.startsWith('/netflow'),
            children: [
                {
                    label: 'معاملات',
                    url: '/netflow/trades-report',
                    className: router.pathname === '/netflow/Trades-report' ? 'sideBarActive' : '',
                },
                {
                    label: 'دریافت اطلاعات',
                    className: router.pathname === '/netflow/information' ? 'sideBarActive' : '',
                    url: '/netflow/information'
                },
                {
                    label: 'ضرایب کارمزد',
                    className: router.pathname === '/netflow/rules' ? 'sideBarActive' : '',
                    url: '/netflow/rules'
                },
                {
                    label: 'معاملات تسویه شده',
                    className: router.pathname === '/netflow/cleared-trade' ? 'sideBarActive' : '',
                    url: '/netflow/cleared-trade'
                },
                {
                    label: 'تسویه و پایاپای',
                    className: router.pathname === '/netflow/clearing-date-range' ? 'sideBarActive' : '',
                    url: '/netflow/clearing-date-range'
                }
            ]
        }
    ];

    return (
        <div className={'w-full'}>
            <div className={'h-full space-y-3 overflow-y-auto p-3'}>
                {
                    items.map((item: any) => {
                        if (item.children) {
                            return (
                                <SidebarCollapsibleComponent title={item.label}
                                                             condition={item.expanded}
                                                             key={item.label}>
                                    <ul className={'text-right list-disc pt-2 pr-3'}>
                                        {item.children.map((child: any) => {
                                            return (
                                                <li key={child.label} className={`hover:bg-gray-200 p-2 rounded-md ${child.className}`}>
                                                    <Link href={child.url}>
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </SidebarCollapsibleComponent>
                            )
                        } else {
                            return (
                            <div key={item.label} className={`border rounded-md p-2 border-border transition-all hover:bg-gray-100 ${item.className}`}>
                                <Link href={item.url}>
                                    {item.label}
                                </Link>
                            </div>
                            )
                        }
                    })
                }
            </div>
            {/*<Sidebar aria-label="Sidebar with multi-level dropdown example" style={{width: '100%'}}>*/}
            {/*    <Sidebar.Items>*/}
            {/*        <Sidebar.ItemGroup id={'menuGroup'}>*/}
            {/*            {*/}
            {/*                items.map((item: any) => {*/}
            {/*                    if (item.children) {*/}
            {/*                        return (*/}
            {/*                            <Sidebar.Collapse*/}
            {/*                                id={'collapse'}*/}
            {/*                                label={item.label}*/}
            {/*                                key={item.label}*/}
            {/*                            >*/}
            {/*                                {item.children.map((child: any) => {*/}
            {/*                                    return (*/}
            {/*                                        <Sidebar.Item key={child.label} active={router.pathname === child.url}*/}
            {/*                                                      href={child.url}>*/}
            {/*                                            {child.label}*/}
            {/*                                        </Sidebar.Item>*/}
            {/*                                    )*/}
            {/*                                })}*/}
            {/*                            </Sidebar.Collapse>*/}
            {/*                        )*/}
            {/*                    } else {*/}
            {/*                        return (*/}
            {/*                            <Sidebar.Item*/}
            {/*                                active={router.pathname === item.url}*/}
            {/*                                href={item.url}*/}
            {/*                                key={item.label}*/}
            {/*                            >*/}
            {/*                                {item.label}*/}
            {/*                            </Sidebar.Item>*/}

            {/*                        )*/}
            {/*                    }*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </Sidebar.ItemGroup>*/}
            {/*    </Sidebar.Items>*/}
            {/*</Sidebar>*/}
        </div>
    );
}
