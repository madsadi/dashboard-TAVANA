import React, {useMemo} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const CancelOrdersToolbar = dynamic(() => import('../../components/online-orders/cancel-orders/CancelOrdersToolbar'))
import {formatNumber, jalali} from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";

const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'date', name: 'تاریخ', type: 'date'},
]
type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    // StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    StartDate: '',
    // EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: '',
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
    const {data, loading, query, fetchData} = useQuery({url: `${ADMIN_GATEWAY}/GlobalCancel/SearchGlobalCancelOrder`})

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

    return (
            <div className="flex flex-col h-full flex-1">
                <AccordionComponent>
                    <SearchComponent listOfFilters={listOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={fetchData}
                    />
                </AccordionComponent>
                <CancelOrdersToolbar/>
                <TableComponent data={data?.result?.pagedData}
                                loading={loading}
                                columnDefStructure={columnDefStructure}
                                rowId={['id', 'userRequestDateTime']}
                                masterDetail={true}
                                detailCellRendererParams={detailCellRendererParams}
                                pagination={true}
                                totalCount={data?.result?.totalCount}
                                fetcher={fetchData}
                                query={query}
                />
            </div>
    )
}