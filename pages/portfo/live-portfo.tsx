import AccordionComponent from "../../components/common/components/AccordionComponent";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import React, {useState} from "react";
import TablePagination from "../../components/common/table/TablePagination";
import {useRouter} from "next/router";
import {fetchData} from "../../api/clearedTradesReport";
import {toast} from "react-toastify";
import InputComponent from "../../components/common/components/InputComponent";
import TableComponent from "../../components/common/table/table-component";

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

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const onSubmit = async (e: any, query: initialType) => {
        e.preventDefault()
        let body: any = {}
        Object.keys(query).map((item: any) => {
            // @ts-ignore
            if (query[item]) {
                // @ts-ignore
                body[item] = query[item]
            }
        })
        await fetchData(`${MARKET_RULES_MANAGEMENT}/request/SearchIntradayPortfolio`, body)
            .then((res) => {
                setData(res.result?.pagedData)
                setTotalCount(res?.result?.totalCount)
            })
            .catch(() => toast.error('ناموفق'))
    }

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <form onSubmit={(e) => onSubmit(e, query)}>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            listOfFilters?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       queryUpdate={queryUpdate}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
                                />
                            })
                        }
                    </div>
                    <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                        <button className={'button bg-red-600'} onClick={(e) => {
                            e.preventDefault()
                            setQuery(initialValue)
                            onSubmit(e, initialValue)
                        }}>
                            لغو فیلتر ها
                        </button>
                        <button className={'button bg-lime-600'} type={'submit'}>
                            جستجو
                        </button>
                    </div>
                </form>
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['customerId', 'instrumentId']}
                            onRowClicked={(e: any) => {
                                router.push(`/portfo/${e.data.customerId}&${e.data.instrumentId}`)
                            }}
            />
            <TablePagination setData={setData}
                             query={query}
                             api={`${MARKET_RULES_MANAGEMENT}/request/SearchIntradayPortfolio?`}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    )
}