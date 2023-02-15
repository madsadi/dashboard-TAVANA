import React, {createContext, useCallback, useMemo, useRef, useState} from "react";
import useForm from "../../hooks/useForm";
import {groupCancel, insCancel} from "../../api/onlineTrade";
import Modal from "../../components/common/layout/Modal";
import {toast} from "react-toastify";
import {AgGridReact} from "ag-grid-react";
import {formatNumber, jalali} from "../../components/common/functions/common-funcions";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/table/customOverlay";
import moment from "jalali-moment";
import SymbolSearchSection from "../../components/common/components/SymbolSearchSecion";
import TablePagination from "../../components/common/table/TablePagination";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import InputComponent from "../../components/common/components/InputComponent";
import {errors} from "../../dictionary/Enums";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import TableComponent from "../../components/common/table/table-component";
import {HoldingsBranchesDetail} from "../customer-management/[[...page]]";

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

const InstrumentGroupFilters = [
    {title: 'instrumentGroupIdentification', name: 'کد گروه نمادها', type: 'input'},
    {title: 'orderSide', name: 'سمت سفارش', type: 'selectInput'},
    {title: 'orderOrigin', name: 'نوع کاربر', type: 'selectInput'},
    {title: 'orderTechnicalOrigin', name: 'مرجع تکنیکال سفارش', type: 'selectInput'},
]
const InstrumentFilters = [
    {title: 'orderSide', name: 'سمت سفارش', type: 'selectInput'},
    {title: 'orderOrigin', name: 'نوع کاربر', type: 'selectInput'},
    {title: 'orderTechnicalOrigin', name: 'مرجع تکنیکال سفارش', type: 'selectInput'},
]

const CancelOrderContext = createContext({})
export default function CancelOrders() {
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const [data, setData] = useState<any>([]);

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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [GPRemoving, setGPRemoving] = useState(false)
    const [InsRemoving, setInsRemoving] = useState(false)
    const [totalCount, setTotalCount] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    const {inputs, handleChange} = useForm()

    //Grid
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            flex: 1,
            valueFormatter: formatNumber
        };
    }, []);
    const getRowId = useCallback((params: any) => {
        return params.data.id + params.data.userRequestDateTime
    }, []);
    const loadingOverlayComponent = useMemo(() => {
        return LoadingOverlay;
    }, []);
    const loadingOverlayComponentParams = useMemo(() => {
        return {
            loadingMessage: 'در حال بارگزاری...',
        };
    }, []);
    const noRowsOverlayComponent = useMemo(() => {
        return NoRowOverlay;
    }, []);
    const noRowsOverlayComponentParams = useMemo(() => {
        return {
            noRowsMessageFunc: () => 'هنوز گزارشی ثبت نشده.',
        };
    }, []);
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
    //Grid


    const confirmGPRemoving = async () => {
        await groupCancel({
            instrumentGroupIdentification: inputs.instrumentGroupIdentification,
            orderSide: inputs.orderSide ? Number(inputs.orderSide) : 0,
            orderOrigin: inputs.orderOrigin ? Number(inputs.orderOrigin) : 0,
            orderTechnicalOrigin: inputs.orderTechnicalOrigin ? Number(inputs.orderTechnicalOrigin) : 0,
        }).then(() => {
            toast.success('با موفقیت انجام شد')
            setGPRemoving(false)
        })
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code).errorText}`)
            })
    }
    const confirmInsRemoving = async () => {
        await insCancel({
            isin: inputs.InstrumentId,
            orderSide: inputs.orderSide ? Number(inputs.orderSide) : 0,
            orderOrigin: inputs.orderOrigin ? Number(inputs.orderOrigin) : 0,
            orderTechnicalOrigin: inputs.orderTechnicalOrigin ? Number(inputs.orderTechnicalOrigin) : 0,
        }).then(() => {
            toast.success('با موفقیت انجام شد')
            setInsRemoving(false)
        })
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code).errorText}`)
            })
    }

    const queryUpdate = (key: string, value: any) => {
        handleChange({target: {name: key, value: value}})
    }

    return (
        <CancelOrderContext.Provider value={{data,setData,query,selectedProducts,setSelectedProducts}}>
            <div className="flex flex-col h-full flex-1">
                <Modal title="حذف سفارش گروه" open={GPRemoving} setOpen={setGPRemoving}>
                    <div className="grid grid-cols-2 gap-4 pt-5">
                        {InstrumentGroupFilters.map((filter: any) => {
                            return <InputComponent key={filter.title} type={filter.type} name={filter.name}
                                                   queryUpdate={queryUpdate} valueType={filter?.valueType}
                                                   query={inputs} title={filter.title}
                                                   selectedDayRange={selectedDayRange}
                                                   setSelectedDayRange={setSelectedDayRange}/>

                        })}
                    </div>
                    <div className={'text-left space-x-2 space-x-reverse mt-4'}>
                        <button className="button bg-red-500" onClick={() => setGPRemoving(false)}>
                            لغو
                        </button>
                        <button className="button bg-lime-600" onClick={confirmGPRemoving}>تایید</button>
                    </div>
                </Modal>
                <Modal title={"حذف سفارش نماد"} open={InsRemoving} setOpen={setInsRemoving}>
                    <div className="grid grid-cols-2 gap-4 pt-5">
                        <div className={'text-center'}>
                            <SymbolSearchSection query={inputs} queryUpdate={queryUpdate}/>
                        </div>
                        {InstrumentFilters.map((filter: any) => {
                            return <InputComponent key={filter.title} type={filter.type} name={filter.name}
                                                   queryUpdate={queryUpdate} valueType={filter?.valueType}
                                                   query={inputs} title={filter.title}
                                                   selectedDayRange={selectedDayRange}
                                                   setSelectedDayRange={setSelectedDayRange}/>

                        })}
                    </div>
                    <div className={'text-left space-x-2 space-x-reverse mt-4'}>
                        <button className="button bg-red-500" onClick={() => setInsRemoving(false)}>لغو
                        </button>
                        <button className="button bg-lime-600" onClick={confirmInsRemoving}>تایید</button>
                    </div>
                </Modal>
                <AccordionComponent query={query}
                                    setQuery={setQuery}
                                    api={`${MARKET_RULES_MANAGEMENT}/GlobalCancel/SearchGlobalCancelOrder`}
                                    listOfFilters={listOfFilters}
                                    initialValue={initialValue}
                                    setTotalCount={setTotalCount}
                                    context={CancelOrderContext}
                />
                <div className={'flex space-x-reverse space-x-2 border-x border-border p-2'}>
                    <button className="button bg-red-500 "
                            onClick={() => setGPRemoving(true)}>حذف سفارش گروه
                    </button>
                    <button className="button bg-lime-600"
                            onClick={() => setInsRemoving(true)}>حذف سفارش نماد
                    </button>
                </div>
                <TableComponent columnDefStructure={columnDefStructure}
                                rowId={['id', 'userRequestDateTime']}
                                masterDetail={true}
                                detailCellRendererParams={detailCellRendererParams}
                                context={CancelOrderContext}
                />
                <TablePagination query={query}
                                 api={`${MARKET_RULES_MANAGEMENT}/GlobalCancel/SearchGlobalCancelOrder?`}
                                 setQuery={setQuery}
                                 totalCount={totalCount}
                                 context={CancelOrderContext}
                />
            </div>
        </CancelOrderContext.Provider>
    )
}