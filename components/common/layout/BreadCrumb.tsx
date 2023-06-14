import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {
    HomeIcon,
    ChevronLeftIcon
} from '@heroicons/react/24/outline'
import Link from "next/link";

export default function BreadCrumbComponent() {
    const [path, setPath] = useState<any>([])

    const router = useRouter()

    const routesInPersian: any = {
        "commission-management": 'مدیریت کارمزد',
        "commission": 'ضرایب کارمزد',
        "category-panel": 'گروه بندی ضرایب',
        "instrument-type": 'گروه بندی ابزار مالی',
        "information": 'دریافت  اطلاعات',
        "market-rules-management": 'مدیریت قوانین بازار',
        "book-building": 'عرضه اولیه',
        "netflow": 'نت فلو',
        "trades-report": 'معاملات',
        "online-trades-orders":'سفارشات آنلاین',
        "trades":'معاملات',
        "orders":'سفارشات',
        "dashboard":'داشبورد',
        "users-management":'مدیریت کاربران',
        "users":'کاربران',
        "logs":'ورود/خروج کاربران',
        "cancel-orders":'حذف گروهی سفارشها',
        "oms":'وضعیت oms',
        "trading-day-timetable":'زمانبندی روز معاملاتی',
        "trading-session":'وضعیت جلسه معاملاتی',
        "rules":'ضرایب کارمزد',
        "cleared-trade":'معاملات تسویه شده',
        "clearing-date-range":'تسویه و پایاپای',
        "portfo":'پرتفو',
        "live-portfo":'پرتفو لحضه ای',
        '[[...query]]':'تاریخچه',
        '[...detail]':'جزییات اطلاعات کاربر',
        "customer-management":'مدیریت مشتریان',
        "subsidiary":'شرکت ها',
        "branch":'شعب',
        "employee":'کارمندان',
        "businessUnit":'واحد کاری',
        "station":'ایستگاه معاملاتی',
        "trader":'معامله گران',
        "marketer":'بازاریاب ها',
        "agreement":'توافقنامه ها',
        "customerAgreement":'توافقنامه های بین طرفین',
        "roles":'نقش و دسترسی',
        "online-registration":'ثبت نام غیر حضوری',
        "registration-report":'گزارش ثبت نام',
        "contract":'قرارداد بازاریابی',
        "marketerContract":'قرارداد با بازاریاب',
        "profile":'حساب کاربری',
        "marketer-app":'اپلیکیشن مارکتر',
    }

    useEffect(() => {
        let _path: any = []
        router.pathname.split('/').map((item: any) => {
            if (item === '[[...page]]' && router.query?.page?.[0]){
                _path.push(routesInPersian?.[router.query?.page?.[0]])
            }else{
                _path.push(routesInPersian?.[item])
            }
        })
        _path.splice(0, 1)
        setPath(_path)
    }, [router.pathname,router.query?.page?.[0]])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={'hidden md:flex items-center border border-border rounded-md'}>
            <Link href={'/dashboard'} className={'hover:bg-border transition-all w-full px-3 p-1'}>
                <HomeIcon className={'h-6.5 w-6'}/>
            </Link>
            {path.map((item:string,index:number)=>{
                return (
                    <span key={item+index} className={'flex items-center pl-3 min-w-fit'}>
                        <ChevronLeftIcon className={'h-5 w-5'}/>
                        {item}
                    </span>
                )
            })}
        </div>
    );
}