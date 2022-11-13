import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import moment from 'jalali-moment'
import {useSelector} from "react-redux";
import {
    addBookBuilding,
    deleteBookBuilding,
    updateBookBuilding
} from "../../api/bookBuilding";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import Modal from "../common/Modal";
import {formatNumber, jalali} from "../commonFn/commonFn";
import {AgGridReact} from "ag-grid-react";
import {toast} from "react-toastify";
import {LoadingOverlay, NoRowOverlay} from "../common/customOverlay";
import SearchSection from "./searchSection";

export default function ResultTable() {
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
            field: 'instrumentId',
            headerName: 'شناسه نماد',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'faInsName',
            headerName: 'عنوان نماد',
        },
        {
            field: 'maxQuantity',
            headerName: 'بیشینه حجم سفارش',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'minPrice',
            headerName: 'حداقل قیمت سفارش',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'maxPrice',
            headerName: 'حداکثر قیمت سفارش',
            flex: 0,
            width: 150,
            minWidth: 150
        }, {
            field: 'fromActiveDateTime',
            headerName: 'زمان شروع',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.fromActiveDateTime).date}</span>
                            {/*<span>{jalali(props.data.fromActiveDateTime).time}</span>*/}
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'toActiveDateTime',
            headerName: 'زمان پایان',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.toActiveDateTime).date}</span>
                            {/*<span>{jalali(props.data.fromActiveDateTime).time}</span>*/}
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'createdBy',
            headerName: 'کاربر ایجاد کننده',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'createDateTime',
            headerName: 'زمان ایجاد',
            flex: 0,
            width: 120,
            minWidth: 120,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.createDateTime).date}</span>
                            {/*<span>{jalali(props.data.createDateTime).time}</span>*/}
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'updatedBy',
            headerName: 'کاربر تغییر دهنده',
            flex: 0,
            width: 120,
            minWidth: 120,
        },
        {
            field: 'updatedDateTime',
            headerName: 'زمان تغییر',
            flex: 0,
            width: 120,
            minWidth: 120,
            // cellRendererSelector: () => {
            //     const ColourCellRenderer = (props: any) => {
            //         return (
            //             <>
            //                 <span>{jalali(props.data.updatedDateTime).date}</span>
            //                 <span>{jalali(props.data.updatedDateTime).time}</span>
            //             </>
            //         )
            //     };
            //     const moodDetails = {
            //         component: ColourCellRenderer,
            //     }
            //     return moodDetails;
            // }
        }
    ]

    const {bookBuildingResult} = useSelector((state: any) => state.bookBuildingConfig)

    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [instrumentId, setInstrumentId] = useState<string>('');
    const [maxQuantity, setMaxQuantity] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [fault, setFaulty] = useState<boolean>(false)
    const [date, setDate] = useState<DayRange>({
        from: null,
        to: null
    });
    const [createdDayRange, setCreatedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

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
        return params.data.instrumentId
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
            noRowsMessageFunc: () => 'نمادی ثبت نشده.',
        };
    }, []);

    useEffect(() => {
        if (bookBuildingResult) {
            gridRef.current?.api?.setRowData(bookBuildingResult)
        }
    }, [bookBuildingResult]);

    //Grid

    const createdRenderCustomInput = ({ref}: { ref: any }) => (
        <div className={'w-full'}>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input readOnly ref={ref} className={'w-full'} id="rangeDate"
                   value={dateRangeHandler(createdDayRange)}/>
        </div>
    )
    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={dateRangeHandler(date)}/>
        </div>
    )
    const dateRangeHandler = (selectedDayRange: any) => {
        if (selectedDayRange.from && selectedDayRange.to) {
            return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`
        } else if (!selectedDayRange.from && !selectedDayRange.to) {
            return ''
        } else if (!selectedDayRange.from) {
            return ''
        } else if (!selectedDayRange.to) {
            return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا اطلاع ثانویه`
        }
    }

    const ToolbarTemplate = () => {
        const openUpdate = () => {
            if (gridRef.current?.api?.getSelectedRows().length ===1) {
                let _date:any={from:null,to:null}
                _date['from']={year:jalali(gridRef.current?.api?.getSelectedRows()[0]?.fromActiveDateTime).date.split('/')[0],month:jalali(gridRef.current?.api?.getSelectedRows()[0]?.fromActiveDateTime).date.split('/')[1],day:jalali(gridRef.current?.api?.getSelectedRows()[0]?.fromActiveDateTime).date.split('/')[2]}
                _date['to']={year:jalali(gridRef.current?.api?.getSelectedRows()[0]?.toActiveDateTime).date.split('/')[0],month:jalali(gridRef.current?.api?.getSelectedRows()[0]?.toActiveDateTime).date.split('/')[1],day:jalali(gridRef.current?.api?.getSelectedRows()[0]?.toActiveDateTime).date.split('/')[2]}
                setDate(_date)
                setUpdateDialog(true);
            } else {
                toast.error('لطفا یک گزینه را انتخاب کنید')
            }
        }

        const confirmDeleteSelected = () => {
            if (gridRef.current?.api?.getSelectedRows().length ===1) {
                setDeleteProductsDialog(true);
            } else {
                toast.error('لطفا یک گزینه را انتخاب کنید')
            }
        }

        const updateHandler = async () => {
            let item = gridRef.current?.api?.getSelectedRows()?.[0]
            await updateBookBuilding({
                instrumentId: item?.instrumentId,
                maxQuantity: item?.maxQuantity,
                minPrice: item?.minPrice,
                maxPrice: item?.maxPrice,
                toActiveDateTime: moment.from(`${item?.toActiveDateTime?.year}${item?.toActiveDateTime && item?.toActiveDateTime?.month < 10 ? `0${item?.toActiveDateTime?.month}` : item?.toActiveDateTime?.month}${item?.toActiveDateTime && item?.toActiveDateTime?.day < 10 ? `0${item?.toActiveDateTime?.day}` : item?.toActiveDateTime?.day}`, 'fa', 'YYYY-MM-DD').format(),
                fromActiveDateTime: moment.from(`${item?.fromActiveDateTime?.year}${item?.fromActiveDateTime && item?.fromActiveDateTime?.month < 10 ? `0${item?.fromActiveDateTime?.month}` : item?.fromActiveDateTime?.month}${item?.fromActiveDateTime && item?.fromActiveDateTime?.day < 10 ? `0${item?.fromActiveDateTime?.day}` : item?.fromActiveDateTime?.day}`, 'fa', 'YYYY-MM-DD').format(),

            })
                .then(res => {
                    toast.success('با موفقیت انجام شد')
                    setUpdateDialog(false)
                    gridRef.current?.api?.applyTransaction({
                        update:[{
                            instrumentId: item?.instrumentId,
                            maxQuantity: item?.maxQuantity,
                            minPrice: item?.minPrice,
                            maxPrice: item?.maxPrice,
                            toActiveDateTime: moment.from(`${date?.from?.year}${date?.from && date?.from?.month < 10 ? `0${date?.from?.month}` : date?.from?.month}${date?.from && date?.from?.day < 10 ? `0${date?.from?.day}` : date?.from?.day}`, 'fa', 'YYYY-MM-DD').format(),
                            fromActiveDateTime: moment.from(`${date?.to?.year}${date?.to && date?.to?.month < 10 ? `0${date?.to?.month}` : date?.to?.month}${date?.to && date?.to?.day < 10 ? `0${date?.to?.day}` : date?.to?.day}`, 'fa', 'YYYY-MM-DD').format(),
                        }]
                    })
                })
                .catch(err => toast.error(`${err?.response?.data?.title}`))
        }

        const addNewHandler = async () => {
            if (instrumentId && maxQuantity && minPrice && maxPrice && createdDayRange) {
                await addBookBuilding({
                    instrumentId: instrumentId,
                    maxQuantity: maxQuantity,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    toActiveDateTime: moment.from(`${createdDayRange.to?.year}${createdDayRange.to && createdDayRange.to?.month < 10 ? `0${createdDayRange.to?.month}` : createdDayRange.to?.month}${createdDayRange.to && createdDayRange.to?.day < 10 ? `0${createdDayRange.to?.day}` : createdDayRange.to?.day}`, 'fa', 'YYYY-MM-DD').format(),
                    fromActiveDateTime: moment.from(`${createdDayRange.from?.year}${createdDayRange.from && createdDayRange.from?.month < 10 ? `0${createdDayRange.from?.month}` : createdDayRange.from?.month}${createdDayRange.from && createdDayRange.from?.day < 10 ? `0${createdDayRange.from?.day}` : createdDayRange.from?.day}`, 'fa', 'YYYY-MM-DD').format(),
                }).then(res => {
                    setProductDialog(false);
                    toast.success('با موفقیت انجام شد')
                    gridRef.current.api.applyTransaction({
                        add: [{
                            instrumentId: instrumentId,
                            maxQuantity: maxQuantity,
                            minPrice: minPrice,
                            maxPrice: maxPrice
                        }],
                        addIndex: 0
                    })
                })
                    .catch(err => {
                        toast.error('ناموفق')
                    })
            } else {
                setFaulty(true)
                if (!maxQuantity) {
                    toast.error('بیشینه حجم سفارش را لطفا وارد کنید')
                } else if (!instrumentId) {
                    toast.error('کد نماد را لطفا وارد کنید')
                }
            }
        }
        const deleteHandler = async () => {
            await deleteBookBuilding(gridRef.current?.api?.getSelectedRows()?.[0]?.instrumentId)
                .then(res => {
                    gridRef.current.api.applyTransaction({
                        remove: [gridRef.current?.api?.getSelectedRows()?.[0]]
                    })
                    setDeleteProductsDialog(false);
                    toast.success('با موفقیت انجام شد')
                })
                .catch(err => {
                    toast.error('ناموفق')
                })
        }

        return (
            <div className={'flex p-2'}>
                <Modal title={'تایید حذف'} open={deleteProductsDialog} setOpen={setDeleteProductsDialog}>
                    <div className="flex flex-col">
                        <div className={'mx-auto'}>آیا از حذف ردیف مورد نظر اطمینان دارید؟</div>
                        <div className={'mr-auto space-x-reverse space-x-2 mt-3'}>
                            <button className="p-1 px-4 rounded-full bg-red-500"
                                    onClick={() => setDeleteProductsDialog(false)}>خیر
                            </button>
                            <button className="p-1 px-4 rounded-full bg-lime-600" onClick={deleteHandler}>بله</button>
                        </div>
                    </div>
                </Modal>
                <Modal title={'جزییات کارمزد جدید'} ModalWidth={'max-w-3xl'} setOpen={setProductDialog}
                       open={productDialog}>
                    <div className="field mt-4">
                        <form className={'grid grid-cols-2 gap-4'}>
                            <div>
                                <label className={'block'} htmlFor="faInsCode">نماد</label>
                                <input id="faInsCode" className={fault && !instrumentId ? 'attention w-full' : 'w-full'}
                                       value={instrumentId}
                                       onChange={(e) => {
                                           setInstrumentId(e.target.value);
                                           setFaulty(false)
                                       }}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="instrumentTypeCode">بیشینه حجم سفارش</label>
                                <input id="instrumentTypeCode"
                                       className={fault && !maxQuantity ? 'attention w-full' : 'w-full'} value={maxQuantity}
                                       onChange={(e) => {
                                           setMaxQuantity(e.target.value);
                                           setFaulty(false)
                                       }}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="sectorCode">حداقل قیمت سفارش</label>
                                <input id="sectorCode" value={minPrice} className={'w-full'}
                                       onChange={(e) => setMinPrice(e.target.value)}/>
                            </div>
                            <div>
                                <label className={'block w-full'} htmlFor="subSectorCode">حداکثر قیمت سفارش</label>
                                <input id="subSectorCode" value={maxPrice} className={'w-full'}
                                       onChange={(e) => setMaxPrice(e.target.value)}/>
                            </div>
                            <div>
                                <DatePicker
                                    value={createdDayRange}
                                    onChange={setCreatedDayRange}
                                    shouldHighlightWeekends
                                    renderInput={createdRenderCustomInput}
                                    locale={'fa'}
                                    calendarPopperPosition={'auto'}
                                />
                            </div>
                        </form>
                        <div className={'flex justify-end space-x-reverse space-x-2'}>
                            <button className="p-1 px-3 rounded-full bg-red-500"
                                    onClick={() => setProductDialog(false)}>لغو
                            </button>
                            <button className="p-1 px-3 rounded-full bg-lime-600" onClick={addNewHandler}>تایید</button>
                        </div>
                    </div>
                </Modal>
                <Modal title={'ایجاد تغییرات'} ModalWidth={'max-w-3xl'} open={updateDialog} setOpen={setUpdateDialog}>
                    <form className={'grid grid-cols-3 gap-4'}>
                        <div>
                            <label className={'block'} htmlFor="instrumentId">شناسه نماد</label>
                            <input className={'w-full'} id="instrumentId" readOnly
                                   value={gridRef.current?.api?.getSelectedRows()[0]?.instrumentId}/>
                        </div>
                        <div>
                            <label className={'block'} htmlFor="faInsCode2">نماد</label>
                            <input className={'w-full'} id="faInsCode2" readOnly
                                   value={gridRef.current?.api?.getSelectedRows()[0]?.faInsCode}/>
                        </div>
                        <div>
                            <label className={'block'} htmlFor="faInsName2">عنوان نماد</label>
                            <input className={'w-full'} id="faInsName2" readOnly
                                   value={gridRef.current?.api?.getSelectedRows()[0]?.faInsName}/>
                        </div>
                        <div>
                            <label className={'block'} htmlFor="instrumentTypeCode">بیشینه حجم سفارش</label>
                            <input id="instrumentTypeCode" className={fault && !maxQuantity ? 'attention w-full' : 'w-full'}
                                   value={gridRef.current?.api?.getSelectedRows()[0]?.maxQuantity}
                                   onChange={(e) => {
                                       setMaxQuantity(e.target.value);
                                       setFaulty(false)
                                   }}/>
                        </div>
                        <div>
                            <label className={'block'} htmlFor="sectorCode">حداقل قیمت سفارش</label>
                            <input id="sectorCode" value={gridRef.current?.api?.getSelectedRows()[0]?.minPrice} className={'w-full'}
                                   onChange={(e) => setMinPrice(e.target.value)}/>
                        </div>
                        <div>
                            <label className={'block'} htmlFor="subSectorCode">حداکثر قیمت سفارش</label>
                            <input id="subSectorCode" value={gridRef.current?.api?.getSelectedRows()[0]?.maxPrice} className={'w-full'}
                                   onChange={(e) => setMaxPrice(e.target.value)}/>
                        </div>
                        <div>
                            <DatePicker
                                value={date}
                                onChange={setDate}
                                shouldHighlightWeekends
                                renderInput={renderCustomInput}
                                locale={'fa'}
                                calendarPopperPosition={'auto'}
                            />
                        </div>
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2'}>
                        <button className="p-1 px-3 rounded-full bg-red-500" onClick={()=>setUpdateDialog(false)}>لغو</button>
                        <button className="p-1 px-3 rounded-full bg-lime-500" onClick={updateHandler}>تایید</button>
                    </div>
                </Modal>
                <SearchSection/>
                <div className={'flex space-x-2 space-x-reverse mr-auto'}>
                    <button className="bg-red-500 p-1 px-2 rounded-full h-fit" onClick={confirmDeleteSelected}>حذف</button>
                    <button className="bg-lime-600 p-1 px-2 rounded-full h-fit" onClick={()=>setProductDialog(true)}>جدید</button>
                    <button className="bg-lime-600 p-1 px-2 rounded-full h-fit" onClick={openUpdate}>تغییر</button>
                </div>
            </div>
        )
    }

    return (
        <div className={'relative grow overflow-hidden border border-border rounded'}>
            <div>
                {ToolbarTemplate()}
            </div>
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
                    detailRowHeight={100}
                    rowSelection={'single'}
                />
            </div>
        </div>
    );
}
