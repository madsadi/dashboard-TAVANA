import React, {createContext, useMemo, useState} from "react";
import {cancelOrder, getOrders} from "../../api/online-trades-orders.api";
import {jalali} from "../../components/common/functions/common-funcions";
import moment from "jalali-moment";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import CustomDetailComponent from "../../components/online-orders/orders/customDetailComponent";
import {errors, OrderType} from "../../dictionary/Enums";
import {toast} from "react-toastify";
import TablePagination from "../../components/common/table/TablePagination";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import InputComponent from "../../components/common/components/InputComponent";
import TableComponent from "../../components/common/table/table-component";
import OrdersToolbar from "../../components/online-orders/orders/OrdersToolbar";

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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [totalCount, setTotal] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    //Grid
    const onSubmit = async (e: any, query: any) => {
        e.preventDefault()
        await getOrders(query)
            .then((res: any) => {
                setData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code)?.errorText}`)
            })
    };

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const isRowSelectable = useMemo(() => {
        return (rowNode: any) => {
            return rowNode.data.orderStatus < 4 && rowNode.data.orderStatus > 1;
        };
    }, []);

    return (
        <OrdersContext.Provider value={{selectedRows,setSelectedRows,onSubmit,query}}>
            <div className="flex flex-col h-full grow">
                <AccordionComponent>
                    <form onSubmit={(e) => onSubmit(e, query)}>
                        <div className="grid grid-cols-5 gap-4">
                            {
                                ordersListOfFilters?.map((item: any) => {
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
                <OrdersToolbar/>
                <TableComponent data={data}
                                columnDefStructure={columnDefStructure}
                                rowId={['orderId']}
                                detailComponent={CustomDetailComponent}
                                masterDetail={true}
                                rowSelection={'multiple'}
                                isRowSelectable={isRowSelectable}
                                setSelectedRows={setSelectedRows}
                />
                <TablePagination setData={setData}
                                 query={query}
                                 api={`${MARKET_RULES_MANAGEMENT}/request/SearchOrders?`}
                                 setQuery={setQuery}
                                 totalCount={totalCount}/>
            </div>
        </OrdersContext.Provider>
    )
}