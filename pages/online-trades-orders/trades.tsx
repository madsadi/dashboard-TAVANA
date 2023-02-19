import React, { useMemo, useState} from "react";
import {getTrade} from "../../api/online-trades-orders.api";
import { formatNumber, jalali} from "../../components/common/functions/common-funcions";
import moment from "jalali-moment";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {errors} from "../../dictionary/Enums";
import TablePagination from "../../components/common/table/TablePagination";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import {toast} from "react-toastify";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import InputComponent from "../../components/common/components/InputComponent";
import TableComponent from "../../components/common/table/table-component";

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
                        <span>{rowData.data.isCanceled ? 'ابطال کامل معاملات':'تائید شده'}</span>
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

    type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number, OrderId: string, InstrumentId: string, TradeId: string, TradeCancelationFlag: number | undefined, OrderSide: number | undefined, UserId: string, CustomerId: string, TraderId: string, ApplicationSource: number | undefined }
    const initialValue = {
        PageNumber: 1,
        PageSize: 20,
        StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
        EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])
    const [totalCount, setTotal] = useState<any>(null);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const onSubmit = async (e:any,query: any) => {
        e.preventDefault()
        await getTrade(query)
            .then((res: any) => {
                setData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
            .catch((err)=>{
                toast.error(`${err?.response?.data?.error?.message || errors.find((item:any)=>item.errorCode === err?.response?.data?.error?.code).errorText}`)
            })
    };

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

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent>
                <form onSubmit={(e) => onSubmit(e, query)}>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            tradesListOfFilters?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       queryUpdate={queryUpdate}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
                                                       selectedDayRange={selectedDayRange}
                                                       setSelectedDayRange={setSelectedDayRange}/>
                            })
                        }
                    </div>
                    <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                        <button className={'button bg-red-600'} onClick={(e) => {
                            e.preventDefault()
                            setQuery(initialValue)
                            setSelectedDayRange({from: null, to: null})
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
                            rowId={['tradeTime','tradeDate','orderId','tradeId']}
                            detailCellRendererParams={detailCellRendererParams}
                            masterDetail={true}
            />

            <TablePagination setData={setData}
                query={query}
                             api={`${MARKET_RULES_MANAGEMENT}/request/SearchTrades?`}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    )
}