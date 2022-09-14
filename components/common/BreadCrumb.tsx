import React, {useEffect, useState} from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {useRouter} from "next/router";

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
        clearedTradesReport: 'معاملات تسویه شده'
    }

    useEffect(() => {
        let _path: any = []
        router.pathname.split('/').map((item: any) => {
            _path.push({label: routesInPersian?.[item]})
        })
        _path.splice(0, 1)
        setPath(_path)
    }, [])

    const home = {icon: 'pi pi-home',url:'/'}

    return (
        <BreadCrumb className={'p-0 mr-3'} model={path} home={home}/>
    );
}