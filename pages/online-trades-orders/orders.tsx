import React, {createContext, useMemo, useState} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const OrdersToolbar = dynamic(() => import('../../components/online-orders/orders/OrdersToolbar'))
const CustomDetailComponent = dynamic(() => import('../../components/online-orders/orders/customDetailComponent'))
import {jalali} from "../../components/common/functions/common-funcions";
import moment from "jalali-moment";
import { OrderType} from "../../dictionary/Enums";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number, OrderId: string, InstrumentId: string, OrderType: number | undefined, ValidityType: number | undefined, OrderSide: number | undefined, OrderStatus: number | undefined, UserId: string, CustomerId: string, TraderId: string, ApplicationSource: number | undefined }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    OrderId: '',
    InstrumentId: '',
    OrderType: undefined,
    OrderSide: undefined,
    ValidityType: undefined,
    OrderStatus: undefined,
    UserId: '',
    CustomerId: '',
    TraderId: '',
    ApplicationSource: undefined
}

const ordersListOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'OrderId', name: "شناسه سفارش", type: 'input'},
    {title: 'InstrumentId', name: "شناسه نماد", type: 'search'},
    {title: 'OrderType', name: "نوع سفارش", type: 'selectInput', valueType: 'number'},
    {title: 'OrderSide', name: "سمت", type: 'selectInput', valueType: 'number'},
    {title: 'ValidityType', name: "اعتبار", type: 'selectInput', valueType: 'number'},
    {title: 'OrderStatus', name: "وضعیت سفارش", type: 'selectInput', valueType: 'number'},
    {title: 'UserId', name: "شناسه کاربر", type: 'input'},
    {title: 'CustomerId', name: "شناسه مشتری", type: 'input'},
    {title: 'TraderId', name: "شناسه معامله گر", type: 'input'},
    {title: 'ApplicationSource', name: "مبدا سفارش", type: 'selectInput', valueType: 'number'},
    {title: 'date', name: "تاریخ شروع و پایان", type: 'date'},
]

export const OrdersContext = createContext({})
export default function Orders() {
    const columnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
        },
        {
            field: 'customerTitle',
            headerName: 'عنوان مشتری',
            cellRenderer: 'agGroupCellRenderer'
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
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
            field: 'price',
            headerName: 'قیمت',
        },
        {
            field: 'quantity',
            headerName: 'حجم',
        },
        {
            field: 'exequtedQuantity',
            headerName: 'حجم انجام شده',
        }, {
            field: 'remainingQuantity',
            headerName: 'حجم باقی مانده',
        },
        {
            field: 'orderStatusTitle',
            headerName: 'وضعیت سفارش',
        },
        {
            field: 'orderTypeTitle',
            headerName: 'نوع سفارش',
        }, {
            field: 'validityTypeTitle',
            headerName: 'اعتبار سفارش',
        },
        {
            field: 'userRequestDateTime',
            headerName: 'زمان درخواست کاربر',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{props.data.userRequestDateTime ? jalali(props.data.userRequestDateTime).date : '-'}</span>
                            <span
                                className={'ml-2'}>{props.data.userRequestDateTime ? jalali(props.data.userRequestDateTime).time : '-'}</span>
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
            field: 'receiveResponseFromCapServerDateTime',
            headerName: 'زمان ثبت در هسته',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{props.data.receiveResponseFromCapServerDateTime ? jalali(props.data.receiveResponseFromCapServerDateTime).date : '-'}</span>
                            <span
                                className={'ml-2'}>{props.data.receiveResponseFromCapServerDateTime ? jalali(props.data.receiveResponseFromCapServerDateTime).time : '-'}</span>
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

    const [selectedRows, setSelectedRows] = useState<any>([]);
    const {data,query,loading,fetchData}=useQuery({url:`${ADMIN_GATEWAY}/request/SearchOrders`})

    const isRowSelectable = useMemo(() => {
        return (rowNode: any) => {
            return rowNode.data.orderStatus < 4 && rowNode.data.orderStatus > 1;
        };
    }, []);

    return (
        <OrdersContext.Provider value={{selectedRows,setSelectedRows,fetchData,query}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <SearchComponent listOfFilters={ordersListOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={fetchData}
                    />
                </AccordionComponent>
                <OrdersToolbar/>
                <TableComponent data={data?.result?.pagedData}
                                loading={loading}
                                columnDefStructure={columnDefStructure}
                                rowId={['orderId']}
                                detailComponent={CustomDetailComponent}
                                masterDetail={true}
                                rowSelection={'multiple'}
                                isRowSelectable={isRowSelectable}
                                setSelectedRows={setSelectedRows}
                                pagination={true}
                                totalCount={data?.result?.totalCount}
                                fetcher={fetchData}
                                query={query}
                />
            </div>
        </OrdersContext.Provider>
    )
}