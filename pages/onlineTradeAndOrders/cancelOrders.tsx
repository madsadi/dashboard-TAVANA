import React, {Fragment, useCallback, useMemo, useRef, useState} from "react";
import useForm from "../../hooks/useForm";
import {canceledOrders, groupCancel, insCancel} from "../../api/onlineTrade";
import Modal from "../../components/common/Modal";
import {toast} from "react-toastify";
import {AgGridReact} from "ag-grid-react";
import {dateRangeHandler, formatNumber, jalali} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import {Accordion} from "flowbite-react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import SymbolSearchSection from "../../components/common/SymbolSearchSecion";
import TablePagination from "../../components/common/TablePagination";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import AccordionComponent from "../../components/common/AccordionComponent";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
}
const listOfFilters = [
    {title:'PageNumber',name:'شماره صفحه',type:null},
    {title:'PageSize',name:'تعداد',type:null},
    {title:'date',name:'تاریخ',type:'date'},
]

export default function CancelOrders() {

    const columnDefStructure = [
        {
            field: 'instrumentGroupIdentification',
            headerName: 'کد گروه نمادها',
            cellRenderer: 'agGroupCellRenderer'
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
            // cellRendererSelector: () => {
            //         const ColourCellRenderer = (props: any) => {
            //             return (
            //                 <>
            //                     <span>{jalali(props.data.userRequestDateTime).date}</span>
            //                     <span>{jalali(props.data.userRequestDateTime).time}</span>
            //                 </>
            //             )
            //         };
            //         const moodDetails = {
            //             component: ColourCellRenderer,
            //         }
            //         return moodDetails;
            //     },
        },
        {
            field: 'lrf',
            headerName: 'شناسه درخواست در هسته',
        },
        {
            field: 'submitInCapDateTime',
            headerName: 'زمان ثبت در هسته',
            // cellRendererSelector: () => {
            //     const ColourCellRenderer = (props: any) => {
            //         return (
            //             <>
            //                 <span>{jalali(props.data.submitInCapDateTime).date}</span>
            //                 <span className={'ml-2'}>{jalali(props.data.submitInCapDateTime).time}</span>
            //             </>
            //         )
            //     };
            //     const moodDetails = {
            //         component: ColourCellRenderer,
            //     }
            //     return moodDetails;
            // },
        },
        {
            field: 'errorText',
            headerName: 'خطا',
        }
    ]

    type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number}
    const initialValue = {
        PageNumber: 1,
        PageSize: 20,
        StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
        EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    }

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
        return params.data.id
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
                        field: 'userIp',
                        headerName: 'IP کاربر'
                    },
                    {field: 'sourceOfRequestTitle', headerName: 'نرم افزار'},
                    {field: 'tradingDateTime', headerName: 'زمان اجرا',
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
                    {field: 'errorCode', headerName: 'کد خطای,'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params])
            },
        };
    }, []);
    //Grid


    const confirmGPRemoving = async () => {
        await groupCancel({
            instrumentGroupIdentification: inputs.instrumentGroupIdentification,
            orderSide: Number(inputs.orderSide),
        }).then(() => {
            toast.success('با موفقیت انجام شد')
            setGPRemoving(false)
        })
            .catch(() => {
                toast.error('نا موفق')
            })
    }
    const confirmInsRemoving = async () => {
        await insCancel({
            isin: inputs.InstrumentId,
            orderSide: Number(inputs.orderSide),
        }).then(() => {
            toast.success('با موفقیت انجام شد')
            setInsRemoving(false)
        })
            .catch(() => {
                toast.error('نا موفق')
            })
    }

    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    const getCanceledOrders=async (query:any)=>{
        await canceledOrders(query)
            .then((res)=> {
                gridRef.current?.api?.setRowData(res?.result?.pagedData);
                setTotalCount(res?.result?.totalCount)
            })
    }

    const queryUpdate = (key: string, value: any) => {
        handleChange({target:{name:key,value:value}})
    }

    return (
        <div className="flex flex-col h-full flex-1">
            <Modal title="حذف سفارش گروه" open={GPRemoving} setOpen={setGPRemoving}>
                <div className="grid grid-cols-2 gap-4 pt-5">
                    <div className={'text-center'}>
                        <label className={'block'} htmlFor="instrumentGroupIdentification">کد گروه نمادها</label>
                        <input id="instrumentGroupIdentification" value={inputs.instrumentGroupIdentification}
                               name={'instrumentGroupIdentification'}
                               onChange={handleChange}/>
                    </div>
                    <div className={'text-center'}>
                        <label className={'block'} htmlFor="orderSide">سمت خرید</label>
                        <input id="orderSide" value={inputs.orderSide}
                               name={'orderSide'}
                               onChange={handleChange}/>
                    </div>
                    {/*<div className="col-12 md:col-6 p-float-label">*/}
                    {/*    <input id="orderOrigin" value={inputs.orderOrigin}*/}
                    {/*               name={'orderOrigin'}*/}
                    {/*               onChange={handleChange}/>*/}
                    {/*    <label htmlFor="orderOrigin">نوع کاربر</label>*/}
                    {/*</div>*/}
                    {/*<div className="col-12 md:col-6 p-float-label">*/}
                    {/*    <input id="orderTechnicalOrigin" value={inputs.orderTechnicalOrigin}*/}
                    {/*               name={'orderTechnicalOrigin'}*/}
                    {/*               onChange={handleChange}/>*/}
                    {/*    <label htmlFor="orderTechnicalOrigin">مرجع تکنیکال سفارش</label>*/}
                    {/*</div>*/}
                </div>
                <div className={'text-left space-x-2 space-x-reverse mt-4'}>
                    <button className="rounded-full bg-red-500 p-1 px-5" onClick={() => setGPRemoving(false)}>لغو</button>
                    <button className="rounded-full bg-lime-600 p-1 px-5" onClick={confirmGPRemoving}>تایید</button>
                </div>
            </Modal>
            <Modal title={"حذف سفارش نماد"} open={InsRemoving} setOpen={setInsRemoving}>
                <div className="grid grid-cols-2 gap-4 pt-5">
                    <div className={'text-center'}>
                        <SymbolSearchSection query={inputs} queryUpdate={queryUpdate}/>
                        {/*<label className={'block'} htmlFor="InstrumentId">نماد</label>*/}
                        {/*<input id="InstrumentId" value={inputs.instrumentId}*/}
                        {/*       name={'InstrumentId'}*/}
                        {/*       onChange={handleChange}/>*/}
                    </div>
                    <div className={'text-center'}>
                        <label className={'block'} htmlFor="orderSide">سمت خرید</label>
                        <input id="orderSide" value={inputs.orderSide}
                               name={'orderSide'}
                               onChange={handleChange}/>
                    </div>
                    {/*<div className="col-12 md:col-6 p-float-label">*/}
                    {/*    <input id="orderOrigin" value={inputs.orderOrigin}*/}
                    {/*               name={'orderOrigin'}*/}
                    {/*               onChange={handleChange}/>*/}
                    {/*    <label htmlFor="orderOrigin">نوع کاربر</label>*/}
                    {/*</div>*/}
                    {/*<div className="col-12 md:col-6 p-float-label">*/}
                    {/*    <input id="orderTechnicalOrigin" value={inputs.orderTechnicalOrigin}*/}
                    {/*               name={'orderTechnicalOrigin'}*/}
                    {/*               onChange={handleChange}/>*/}
                    {/*    <label htmlFor="orderTechnicalOrigin">مرجع تکنیکال سفارش</label>*/}
                    {/*</div>*/}
                </div>
                <div className={'text-left space-x-2 space-x-reverse mt-4'}>
                    <button className="rounded-full bg-red-500 p-1 px-5" onClick={() => setInsRemoving(false)}>لغو</button>
                    <button className="rounded-full bg-lime-600 p-1 px-5" onClick={confirmInsRemoving}>تایید</button>
                </div>
            </Modal>
            <AccordionComponent query={query} setQuery={setQuery} api={`${MARKET_RULES_MANAGEMENT}/GlobalCancel/SearchGlobalCancelOrder`} gridRef={gridRef} listOfFilters={listOfFilters} initialValue={initialValue} setTotalCount={setTotalCount}/>
            <div className={'flex justify-end space-x-reverse space-x-2 border-x border-border p-2'}>
                <button className="rounded-full bg-red-500 p-1 px-2"
                        onClick={() => setGPRemoving(true)}>حذف سفارش گروه</button>
                <button className="rounded-full bg-lime-600 p-1 px-2"
                        onClick={() => setInsRemoving(true)}>حذف سفارش نماد</button>
            </div>
            <div className={'relative grow overflow-hidden border border-border rounded-b-xl'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        defaultColDef={defaultColDef}
                        loadingOverlayComponent={loadingOverlayComponent}
                        loadingOverlayComponentParams={loadingOverlayComponentParams}
                        noRowsOverlayComponent={noRowsOverlayComponent}
                        noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                        rowHeight={35}
                        headerHeight={35}
                        animateRows={true}
                        getRowId={getRowId}
                        asyncTransactionWaitMillis={1000}
                        columnHoverHighlight={true}
                        detailCellRendererParams={detailCellRendererParams}
                        masterDetail={true}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${MARKET_RULES_MANAGEMENT}/GlobalCancel/SearchGlobalCancelOrder?`} setQuery={setQuery} gridRef={gridRef} totalCount={totalCount}/>
        </div>
    )
}