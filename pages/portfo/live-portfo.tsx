import AccordionComponent from "../../components/common/components/AccordionComponent";
import React, {useState} from "react";
import TablePagination from "../../components/common/table/TablePagination";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import TableComponent from "../../components/common/table/table-component";
import {getPortfolio} from "../../api/portfo.api";
import SearchComponent from "../../components/common/components/Search.component";

const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'customerId', name: 'شناسه مشتری', type: 'input'},
    {title: 'InstrumentId', name: 'شناسه نماد', type: 'search'},
]
type initialType = { customerId: string, InstrumentId: string, PageNumber: number, PageSize: number }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    InstrumentId: '',
    customerId: '',
}

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
            field: 'currentShareCount',
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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])
    const [totalCount, setTotalCount] = useState<any>(null)

    const onSubmit = async (e: any, query: initialType) => {
        e?.preventDefault()
        let body: any = {}
        Object.keys(query).map((item: any) => {
            // @ts-ignore
            if (query[item]) {
                // @ts-ignore
                body[item] = query[item]
            }
        })
        await getPortfolio(body)
            .then((res) => {
                setData(res.result?.pagedData)
                setTotalCount(res?.result?.totalCount)
            })
            .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
    }

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent query={query}
                                 setQuery={setQuery}
                                 listOfFilters={listOfFilters}
                                 initialValue={initialValue}
                                 onSubmit={onSubmit}
                />
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['customerId', 'instrumentId']}
                            onRowClicked={(e: any) => {
                                router.push(`/portfo/${e.data.customerId}&${e.data.instrumentId}`)
                            }}
            />
            <TablePagination onSubmit={onSubmit}
                             query={query}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    )
}