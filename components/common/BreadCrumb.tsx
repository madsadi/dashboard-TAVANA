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
        rules:'ضرایب کارمزد',
        clearedTrade:'معاملات تسویه شده',
        clearingDateRangeT:'تسویه و پایاپای',
        portfo:'پرتفو',
        livePortfo:'پرتفو لحضه ای',
        '[[...query]]':'تاریخچه',
        financialHoldings:'هلدینگ مالی',
        subsidiary:'زیر مجموعه ها',
        branch:'شعب',
        employee:'کارمندان',
        businessUnit:'واحده کاری',
        station:'ایستگاه معاملاتی',
        trader:'معامله گران',
        marketer:'بازاریاب ها',
        agreement:'توافقنامه ها',
        customerAgreement:'توافقنامه های بین طرفین',
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