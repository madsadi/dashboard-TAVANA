import React, {useMemo, useState} from "react";
import {getCanceledOrders} from "../../api/online-trades-orders.api";
import {toast} from "react-toastify";
import {formatNumber, jalali} from "../../components/common/functions/common-funcions";
import moment from "jalali-moment";
import TablePagination from "../../components/common/table/TablePagination";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import InputComponent from "../../components/common/components/InputComponent";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import TableComponent from "../../components/common/table/table-component";
import CancelOrdersToolbar from "../../components/online-orders/cancel-orders/CancelOrdersToolbar";

const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'date', name: 'تاریخ', type: 'date'},
]
type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
}

export default function CancelOrders() {
    const columnDefStructure = [
        {
            field: 'id',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            minWidth: 40,
            maxWidth: 40
        },
        {
            field: 'instrumentGroupIdentification',
            headerName: 'کد گروه نمادها',
        },
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'orderSideTitle',
            headerName: 'سمت سفارش',
        }, {
            field: 'idOfTheBrokersOrderEntryServer',
            headerName: 'شناسه سرور سفارش',
        },
        {
            field: 'orderOriginTitle',
            headerName: 'نوع مشتری',
        },
        {
            field: 'orderTechnicalOriginTitle',
            headerName: 'مرجع تکنیکال سفارش',
        },
        {
            field: 'userRequestDateTime',
            headerName: 'زمان درخواست',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{props.data?.userRequestDateTime ? jalali(props.data?.userRequestDateTime).date : '-'}</span>
                            <span
                                className={'ml-2'}>{props.data?.userRequestDateTime ? jalali(props.data?.userRequestDateTime).time : '-'}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        // {
        //     field: 'lrf',
        //     headerName: 'شناسه درخواست در هسته',
        // },
        // {
        //     field: 'submitInCapDateTime',
        //     headerName: 'زمان ثبت در هسته',
        //     cellRendererSelector: () => {
        //         const ColourCellRenderer = (props: any) => {
        //             return (
        //                 <>
        //                     <span>{props.data?.submitInCapDateTime ? jalali(props.data?.submitInCapDateTime).date:'-'}</span>
        //                     <span className={'ml-2'}>{props.data?.submitInCapDateTime ? jalali(props.data?.submitInCapDateTime).time:'-'}</span>
        //                 </>
        //             )
        //         };
        //         const moodDetails = {
        //             component: ColourCellRenderer,
        //         }
        //         return moodDetails;
        //     },
        // },
        {
            field: 'errorText',
            headerName: 'خطا',
        }
    ]

    const [data, setData] = useState<any>([]);
    const [query, setQuery] = useState<initialType>(initialValue)
    const [totalCount, setTotalCount] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                columnDefs: [
                    {field: 'id', headerName: 'شناسه درخواست'},
                    {field: 'idOfBrokerIssuingTheOrder', headerName: 'کد کارگزاری'},
                    {
                        field: 'userId',
                        headerName: 'شناسه کاربر'
                    },
                    {
                        field: 'userIP',
                        headerName: 'IP کاربر'
                    },
                    {field: 'sourceOfRequestTitle', headerName: 'نرم افزار'},
                    {
                        field: 'tradingDateTime', headerName: 'زمان اجرا',
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <>
                                        <span>{jalali(props.data.tradingDateTime).date}</span>
                                        <span>{jalali(props.data.tradingDateTime).time}</span>
                                    </>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                    {field: 'errorCode', headerName: 'کد خطای'},
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

    const onSubmit = async (e: any, query: initialType) => {
        e.preventDefault()
        await getCanceledOrders(query)
            .then((res) => {
                setData(res.result?.pagedData)
                setTotalCount(res?.result?.totalCount)
                toast.success('با موفقیت انجام شد')
            })
            .catch(() => toast.error('ناموفق'))
    }

    return (
            <div className="flex flex-col h-full flex-1">
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
                <CancelOrdersToolbar/>
                <TableComponent data={data}
                                columnDefStructure={columnDefStructure}
                                rowId={['id', 'userRequestDateTime']}
                                masterDetail={true}
                                detailCellRendererParams={detailCellRendererParams}
                />
                <TablePagination setData={setData}
                                 query={query}
                                 api={`${MARKET_RULES_MANAGEMENT}/GlobalCancel/SearchGlobalCancelOrder?`}
                                 setQuery={setQuery}
                                 totalCount={totalCount}
                />
            </div>
    )
}