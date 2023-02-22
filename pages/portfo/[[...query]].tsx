import React, { useEffect, useState} from "react";
import TablePagination from "../../components/common/table/TablePagination";
import { jalali} from "../../components/common/functions/common-funcions";
import {useRouter} from "next/router";
import {getPortfolioBook} from "../../api/portfo.api";
import TableComponent from "../../components/common/table/table-component";

type initialType = { CustomerId: string, InstrumentId: string, PageNumber: number, PageSize: number }
const initialValue = {
    InstrumentId: '',
    CustomerId: '',
    PageNumber: 1,
    PageSize: 20,
}

export default function PortfolioBook(){
    const columnDefStructure = [
        {
            field: 'transactionId',
            headerName: 'شناسه تراکنش',
        },{
            field: 'transactionReferenceId',
            headerName: 'شناسه تراکنش مرجع',
        },{
            field: 'transactionTitle',
            headerName: 'نوع تراکنش',
        },{
            field: 'sideTitle',
            headerName: 'سمت تراکنش',
        },{
            field: 'quantity',
            headerName: 'حجم تراکنش',
        },
        {
            field: 'referenceRemainQuantity',
            headerName: 'مانده تراکنش مرجع',
        },
        {
            field: 'receivedDateTime',
            headerName: 'زمان دریافت',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{props.data.receivedDateTime ? jalali(props.data.receivedDateTime).date:'-'}</span>
                            <span className={'ml-2'}>{props.data.receivedDateTime ? jalali(props.data.receivedDateTime).time:'-'}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'openBuyOrder',
            headerName: 'مجموع حجم سفارشات خرید باز',
        }, {
            field: 'openSellOrder',
            headerName: 'مجموع حجم سفارشات فروش باز',
        },
        {
            field: 'intradayBuy',
            headerName: 'مجموع حجم خرید انجام شده',
        },
        {
            field: 'intradaySell',
            headerName: 'مجموع حجم فروش انجام شده',
        },
        {
            field: 'currentShareCount',
            headerName: 'تعداد مانده دارایی',
        },
        {
            field: 'sellableShareCount',
            headerName: 'تعداد مانده قابل فروش',
        },
        {
            field: 'transactionErrorMessage',
            headerName: 'خطای تراکنش',
        },
        {
            field: 'transactionDateTime',
            headerName: 'زمان تراکنش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{props.data.transactionDateTime ? jalali(props.data.transactionDateTime).date:'-'}</span>
                            <span className={'ml-2'}>{props.data.transactionDateTime ? jalali(props.data.transactionDateTime).time:'-'}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]

    const router = useRouter()

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])
    const [totalCount, setTotalCount] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>([])

    const getPortfolioData = async (query:initialType)=>{
        await getPortfolioBook(query)
            .then((res)=> {
                setData(res?.result?.pagedData);
                setUserInfo(res?.result?.pagedData[0])
                setTotalCount(res?.result?.totalCount)
            })
    }
    let dep = router.query?.query?.[0]
    useEffect(()=>{
            if (dep){
                const queryData = dep.split('&')
                let _query = {...query};
                _query['InstrumentId'] = queryData[1];
                _query['CustomerId'] = queryData[0];
                setQuery(_query)
                getPortfolioData({...query,InstrumentId:queryData[1],CustomerId:queryData[0]})

            }
    },[dep]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className={'flex flex-col h-full flex-1'}>
            <div className={'border border-border rounded-t-xl flex space-x-4 justify-between p-3'}>
                <div>
                    عنوان مشتری:
                    <span className={'mr-2 font-bold'}>{userInfo?.customerTitle}</span>
                </div>
                <div>
                    شناسه ملی:
                    <span className={'mr-2 font-bold'}>{userInfo?.customerNationalId}</span>
                </div>
                <div>
                    آیدی مشتری:
                    <span className={'mr-2 font-bold'}>{userInfo?.customerId}</span>
                </div>
                <div>
                    شناسه نماد:
                    <span className={'mr-2 font-bold'}>{userInfo?.instrumentId}</span>
                </div>
                <div>
                    نماد:
                    <span className={'mr-2 font-bold'}>{userInfo?.faInsCode }</span>
                </div>
            </div>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['receivedDateTime','transactionId']}
                            />
            <TablePagination onSubmit={getPortfolioData}
                             query={query}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    )
}