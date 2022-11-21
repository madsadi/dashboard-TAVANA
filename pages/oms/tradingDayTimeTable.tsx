import {Accordion} from "flowbite-react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import React, {useMemo, useRef, useState} from "react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import {AgGridReact} from "ag-grid-react";
import {dateRangeHandler, formatNumber, jalali} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import {tradingDayTimeTable, tradingSession} from "../../api/oms";

export default function TradingDayTimeTable() {
    const columnDefStructure = [
        {
            field: 'instrumentGroupId',
            headerName: 'کد گروه نماد',
        },
        {
            field: 'tradingSessionDate',
            headerName: 'تاریخ جلسه معاملاتی',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.tradingSessionDate ? jalali(rowData.data.tradingSessionDate).date:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },{
            field: 'tradingDayInsGroupTitle',
            headerName: 'وضعیت معاملاتی گروه',
        },{
            field: 'eventTriggerTime',
            headerName: 'زمانبندی اجرای وضعیت',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.eventTriggerTime ? jalali(rowData.data.eventTriggerTime).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.eventTriggerTime ? jalali(rowData.data.eventTriggerTime).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },{
            field: 'afterOpeningInsGroupTitle',
            headerName: 'وضعیت بعد از گشایش',
        },
        {
            field: 'eventDate',
            headerName: 'تاریخ وزمان ارسال',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.eventDate ? jalali(rowData.data.eventDate).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.eventDate ? jalali(rowData.data.eventDate).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'dateReceived',
            headerName: 'تاریخ و زمان دریافت',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.dateReceived ? jalali(rowData.data.dateReceived).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.dateReceived ? jalali(rowData.data.dateReceived).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]

    const pageSize = 20;
    type initialType = { FromDate: string, ToDate: string, PageNumber: number, PageSize: number,InstrumentGroupId:string }
    const initialValue = {
        PageNumber: 1,
        PageSize: 20,
        InstrumentGroupId: '',
        FromDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
        ToDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    }

    const [query, setQuery] = useState<initialType>(initialValue)
    const [totalCount, setTotal] = useState<any>(null);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
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
    const onGridReady = async (query: any) => {
        await tradingDayTimeTable(query)
            .then((res: any) => {
                gridRef.current.api.setRowData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
    };

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
            noRowsMessageFunc: () => 'هنوز معامله ای ثبت نشده.',
        };
    }, []);
    //Grid

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    return (
        <div className="flex flex-col h-full grow">
            <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                <Accordion.Panel>
                    <Accordion.Title style={{padding: '0.5rem'}}>
                        جستجو
                    </Accordion.Title>
                    <Accordion.Content style={{transition: 'all'}}>
                        <form className={'flex'} onSubmit={(e) => {
                            e.preventDefault()
                            onGridReady(query);
                        }}>
                            <div>
                                <DatePicker
                                    value={selectedDayRange}
                                    onChange={(e) => {
                                        setSelectedDayRange(e);
                                        if (e.from) {
                                            setQuery({
                                                ...query,
                                                FromDate: `${moment.from(`${e.from?.year}/${e.from?.month}/${e.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-M-D')}`
                                            })
                                        }
                                        if (e.to) {
                                            setQuery({
                                                ...query,
                                                ToDate: `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-M-D')}`
                                            })
                                        }
                                    }}
                                    shouldHighlightWeekends
                                    renderInput={renderCustomInput}
                                    locale={'fa'}
                                    calendarPopperPosition={'bottom'}
                                />
                            </div>
                            <div className={'mr-4'}>
                                <label className={'block'} htmlFor="InstrumentGroupId">کد گروه نماد</label>
                                <input id="InstrumentGroupId" value={query.InstrumentGroupId}
                                       onChange={(e) => queryUpdate('InstrumentGroupId', e.target.value)}/>
                            </div>
                            <div className={'flex mt-4 space-x-2 space-x-reverse mr-auto'}>
                                <button
                                    className={'justify-content-center rounded-full bg-red-500 border-red-500 px-5 p-1 w-fit h-fit mt-auto'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setQuery(initialValue)
                                        setSelectedDayRange({from:null,to:null})
                                        onGridReady(initialValue)
                                    }}>
                                    لغو فیلتر ها
                                </button>
                                <button
                                    className={'justify-content-center bg-lime-600 rounded-full px-5 p-1 w-fit h-fit mt-auto'}
                                    type={'submit'}>
                                    جستجو
                                </button>
                            </div>
                        </form>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <div className={'relative grow overflow-hidden border border-border'}>
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
                        asyncTransactionWaitMillis={1000}
                        columnHoverHighlight={true}
                    />
                </div>
            </div>
            <div className={'flex items-center mx-auto py-3'}>
                {/*<ChevronDoubleRightIcon className={'h-4 w-4'}/>*/}
                <button onClick={() => {
                    queryUpdate('PageNumber', query.PageNumber - 1)
                    onGridReady({...query, PageNumber: query.PageNumber - 1})
                }}
                        className={`${query.PageNumber <= 1 ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                        disabled={query.PageNumber <= 1}>

                    <ChevronRightIcon className={'h-4 w-4'}/>
                </button>
                <div className={'mx-3 h-fit'}>صفحه {query.PageNumber}<span
                    className={'mx-4'}>از</span>{Math.ceil(totalCount / pageSize)} </div>
                <button onClick={() => {
                    queryUpdate('PageNumber', query.PageNumber + 1)
                    onGridReady({...query, PageNumber: query.PageNumber + 1})
                }}
                        className={`${query.PageNumber >= Math.ceil(totalCount / query.PageSize) ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                        disabled={query.PageNumber >= Math.ceil(totalCount / query.PageSize)}>
                    <ChevronLeftIcon className={'h-4 w-4'}/>
                </button>
                {/*<ChevronDoubleLeftIcon className={'h-4 w-4'}/>*/}
            </div>
        </div>
    )
}