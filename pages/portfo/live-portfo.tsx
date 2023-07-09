import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
import {useRouter} from "next/router";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";

export default function LivePortfo() {
    const router = useRouter()
    const columnDefStructure = [
        {
            field: 'customerId',
            headerName: 'شناسه مشتری',
        }, {
            field: 'customerTitle',
            headerName: 'عنوان مشتری',
        }, {
            field: 'customerNationalId',
            headerName: 'کد ملی مشتری',
        }, {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        }, {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'shareCount',
            headerName: 'حجم مانده',
        },
        {
            field: 'intradayBuy',
            headerName: 'حجم خرید',
        },
        {
            field: 'intradaySell',
            headerName: 'حجم فروش',
        }, {
            field: 'openBuyOrder',
            headerName: 'حجم سفارش های باز خرید',
        },
        {
            field: 'openSellOrder',
            headerName: 'حجم سفارش های باز فروش',
        },
        {
            field: 'sellableShareCount',
            headerName: 'حجم قابل فروش',
        }
    ]
    const {data,loading,query,fetchData}=useQuery({url:`${ADMIN_GATEWAY}/api/request/SearchIntradayPortfolio`,notifResults:true})

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent onSubmit={fetchData} module={ModuleIdentifier.LIVE_PORTFO}/>
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                            loading={loading}
                            columnDefStructure={columnDefStructure}
                            rowId={['customerId', 'instrumentId']}
                            onRowClicked={(e: any) => {
                                router.push(`/portfo/${e.data.customerId}&${e.data.instrumentId}`)
                            }}
                            pagination={true}
                            totalCount={data?.result?.totalCount}
                            fetcher={fetchData}
                            query={query}
            />
        </div>
    )
}