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
        commissionManagement: 'مدیریت کارمزد',
        commission: 'ضرایب کارمزد',
        categoryPanel: 'گروه بندی ضرایب',
        instrumentType: 'گروه بندی ابزار مالی',
        information: 'دریافت  اطلاعات',
        marketRulesManagement: 'مدیریت قوانین بازار',
        bookBuilding: 'عرضه اولیه',
        netFlow: 'نت فلو',
        TradesReport: 'معاملات',
        onlineTradeAndOrders:'سفارشات آنلاین',
        onlineTrades:'معاملات',
        onlineOrders:'سفارشات',
        dashboard:'داشبورد',
        usersManagement:'مدیریت کاربران',
        users:'کاربران',
        logs:'ورود/خروج کاربران',
        cancelOrders:'حذف گروهی سفارشها',
        oms:'وضعیت oms',
        tradingDayTimeTable:'زمانبندی روز معاملاتی',
        tradingSession:'وضعیت جلسه معاملاتی',
    }

    useEffect(() => {
        let _path: any = []
        router.pathname.split('/').map((item: any) => {
            _path.push(routesInPersian?.[item])
        })
        _path.splice(0, 1)
        setPath(_path)
    }, [])

    return (
        <div className={'flex items-center border border-border rounded-md'}>
            <Link href={'/dashboard'} className={'hover:bg-border transition-all w-full px-3 p-1'}>
                <HomeIcon className={'h-6.5 w-6'}/>
            </Link>
            {path.map((item:string)=>{
                return (
                    <span key={item} className={'flex items-center pl-3 min-w-fit'}>
                        <ChevronLeftIcon className={'h-5 w-5'}/>
                        {item}
                    </span>
                )
            })}
        </div>
    );
}