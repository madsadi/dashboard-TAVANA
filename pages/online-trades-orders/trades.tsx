import React, {useMemo} from "react";
import dynamic from "next/dynamic";

const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
import {formatNumber, jalali} from "../../components/common/functions/common-funcions";
import moment from "jalali-moment";
import useQuery from "../../hooks/useQuery";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import {throwToast} from "../../components/common/functions/notification";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number, OrderId: string, InstrumentId: string, TradeId: string, TradeCancelationFlag: number | undefined, OrderSide: number | undefined, UserId: string, CustomerId: string, TraderId: string, ApplicationSource: number | undefined }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    // StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    StartDate: '',
    // EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: '',
    OrderId: '',
    InstrumentId: '',
    OrderSide: undefined,
    TradeId: '',
    TradeCancelationFlag: undefined,
    UserId: '',
    CustomerId: '',
    TraderId: '',
    ApplicationSource: undefined
}
const tradesListOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'OrderId', name: "شناسه سفارش", type: 'input'},
    {title: 'InstrumentId', name: "شناسه نماد", type: 'search'},
    {title: 'OrderSide', name: "سمت", type: 'selectInput', valueType: 'number'},
    {title: 'TradeId', name: "شناسه معامله", type: 'input'},
    {title: 'TradeCancelationFlag', name: "وضعیت لغو معامله", type: 'input'},
    {title: 'UserId', name: "شناسه کاربر", type: 'input'},
    {title: 'CustomerId', name: "شناسه مشتری", type: 'input'},
    {title: 'TraderId', name: "شناسه معامله گر", type: 'input'},
    {title: 'ApplicationSource', name: "مبدا سفارش", type: 'selectInput', valueType: 'number'},
    {title: 'date', name: "تاریخ شروع و پایان", type: 'date'},
]

export default function Trades() {
    function chunk(str: string, n: number) {
        var ret = [];
        var i;
        var len;

        for (i = 0, len = str?.length; i < len; i += n) {
            ret.push(str.substr(i, n))
        }

        return ret
    };

    const columnDefStructure = [
        {
            field: 'customerTitle',
            headerName: 'عنوان مشتری',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'userTitle',
            headerName: 'عنوان کاربر',
            flex: 0.8
        },
        {
            field: 'traderId',
            headerName: 'شناسه معاملاتی',
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'isCanceled',
            headerName: 'وضعیت',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span>{rowData.data.isCanceled ? 'ابطال کامل معاملات' : 'تائید شده'}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'orderSideTitle',
            headerName: 'طرف سفارش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span
                            className={`${rowData.data.orderSideTitle === 'خرید' ? 'text-green-400' : 'text-red-500'}`}>{rowData.data.orderSideTitle}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'tradePrice',
            headerName: 'قیمت',
        },
        {
            field: 'tradeQuantity',
            headerName: 'حجم',
        },
        {
            field: 'tradeDate',
            headerName: 'تاریخ معامله',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.tradeDate).date}</span>
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
            field: 'tradeTime',
            headerName: 'زمان معامله',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{chunk(rowData.data.tradeTime, 2).join(':')}</span>
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
            field: 'applicationSourceName',
            headerName: 'نام نرم افزار',
        }
    ]
    const {data, loading, query, fetchData} = useQuery({url: `${MARKET_RULES_MANAGEMENT}/request/SearchTrades`})

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                columnDefs: [
                    {field: 'userId', headerName: 'شناسه کاربر'},
                    {
                        field: 'customerNationalId',
                        headerName: 'کد ملی مشتری',
                    },
                    {
                        field: 'customerId',
                        headerName: 'شناسه مشتری',
                    },
                    {
                        field: 'tradeId',
                        headerName: 'شناسه معامله'
                    },
                    {
                        field: 'instrumentId',
                        headerName: 'شناسه نماد'
                    },
                    {field: 'orderId', headerName: 'شناسه سفارش'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data])
            },
        };
    }, []);

    const fetchHandler =(query:any)=>{
        if (query?.StartDate && query?.EndDate){
            fetchData(query)
        }else{
            throwToast({type:'warning',value:'ورودی تاریخ الزامی می باشد'})
        }
    }
    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent>
                <SearchComponent listOfFilters={tradesListOfFilters}
                                 initialValue={initialValue}
                                 onSubmit={fetchHandler}
                />
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                            loading={loading}
                            columnDefStructure={columnDefStructure}
                            rowId={['tradeTime', 'tradeDate', 'orderId', 'tradeId']}
                            detailCellRendererParams={detailCellRendererParams}
                            masterDetail={true}
                            pagination={true}
                            totalCount={data?.result?.totalCount}
                            fetcher={fetchHandler}
                            query={query}
            />
        </div>
    )
}