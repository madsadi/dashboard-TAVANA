import React, {Fragment, useCallback, useMemo, useRef, useState} from "react";
import {getTrade} from "../../api/onlineTrade";
import {dateRangeHandler, formatNumber, jalali} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import {AgGridReact} from 'ag-grid-react';
import moment from "jalali-moment";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {originEnum, sides} from "../../components/commonFn/Enums";
import {CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Accordion} from "flowbite-react";
import {Listbox, Transition} from "@headlessui/react";
import SymbolSearchSection from "../../components/common/SymbolSearchSecion";
import TablePagination from "../../components/common/TablePagination";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function OnlineTrades() {
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
        await getTrade(query)
            .then((res: any) => {
                gridRef.current.api.setRowData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            });
    };
    const getRowId = useCallback((params: any) => {
        return params.data.tradeId
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
            noRowsMessageFunc: () => 'هنوز معامله ای ثبت نشده.',
        };
    }, []);

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                columnDefs: [
                    {field: 'userId', headerName: 'شناسه کاربر'},
                    {
                        field: 'customerNationalID',
                        headerName: 'شناسه ملی مشتری',
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
                            <div className={'grid grid-cols-6 gap-4'}>
                                <div>
                                    <label className={'block'} htmlFor="OrderId">شناسه سفارش</label>
                                    <input id="OrderId" value={query.OrderId}
                                           onChange={(e) => queryUpdate('OrderId', e.target.value)}/>
                                </div>
                                <div>
                                    <SymbolSearchSection query={query} queryUpdate={queryUpdate}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="TradeId">شناسه معامله</label>
                                    <input id="TradeId" value={query.TradeId}
                                           onChange={(e) => queryUpdate('TradeId', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="OrderSide">سمت</label>
                                    <div className="relative rounded">
                                        <Listbox name={'status'} value={query.OrderSide}
                                                 onChange={(e) => queryUpdate('OrderSide', e)}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{sides.find((item: any) => item.id === query.OrderSide)?.title}</span>
                                                        </span>
                                                        <span className="pointer-events-none flex items-center mr-auto">
                                                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="false"/>
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options
                                                            className="absolute z-10 mt-1 min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                            {sides.map((side: any) => (
                                                                <Listbox.Option
                                                                    key={side.id}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={side.id}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {side.title}
                                                                    </span>
                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? '' : '',
                                                                                            'flex items-center mr-auto'
                                                                                        )}
                                                                                    >
                                                                        <CheckIcon className="h-5 w-5"
                                                                                   aria-hidden="true"/>
                                                                    </span>
                                                                                ) : null}
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            )}
                                        </Listbox>
                                    </div>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="UserId">شناسه کاربر</label>
                                    <input id="UserId" value={query.UserId}
                                           onChange={(e) => queryUpdate('UserId', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="CustomerId">شناسه مشتری</label>
                                    <input id="CustomerId" value={query.CustomerId}
                                           onChange={(e) => queryUpdate('CustomerId', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="TraderId">شناسه معامله گر</label>
                                    <input id="TraderId" value={query.TraderId}
                                           onChange={(e) => queryUpdate('TraderId', e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="ApplicationSource">مبدا سفارش</label>
                                    <div className="relative rounded">
                                        <Listbox name={'status'} value={query.ApplicationSource}
                                                 onChange={(e) => queryUpdate('ApplicationSource', e)}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{originEnum.find((item: any) => item.id === query.ApplicationSource)?.title}</span>
                                                        </span>
                                                        <span className="pointer-events-none flex items-center mr-auto">
                                                            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="false"/>
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options
                                                            className="absolute z-10 mt-1 min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                            {originEnum.map((origin: any) => (
                                                                <Listbox.Option
                                                                    key={origin.id}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={origin.id}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {origin.title}
                                                                    </span>
                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? '' : '',
                                                                                            'flex items-center mr-auto'
                                                                                        )}
                                                                                    >
                                                                        <CheckIcon className="h-5 w-5"
                                                                                   aria-hidden="true"/>
                                                                    </span>
                                                                                ) : null}
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            )}
                                        </Listbox>
                                    </div>
                                </div>
                                <div>
                                    <DatePicker
                                        value={selectedDayRange}
                                        onChange={(e) => {
                                            setSelectedDayRange(e);
                                            if (e.from) {
                                                setQuery({
                                                    ...query,
                                                    StartDate: `${moment.from(`${e.from?.year}/${e.from?.month}/${e.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-M-D')}`
                                                })
                                            }
                                            if (e.to) {
                                                setQuery({
                                                    ...query,
                                                    EndDate: `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-M-D')}`
                                                })
                                            }
                                        }}
                                        shouldHighlightWeekends
                                        renderInput={renderCustomInput}
                                        locale={'fa'}
                                        calendarPopperPosition={'bottom'}
                                    />
                                </div>
                            </div>
                            <div className={'flex mt-4 space-x-2 space-x-reverse mr-auto'}>
                            <button
                                className={'justify-content-center rounded-full bg-red-500 border-red-500 px-5 p-1 w-fit h-fit mt-auto'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setQuery(initialValue)
                                    onGridReady(initialValue)
                                }}>
                                لغو فیلتر ها
                            </button>
                                <button className={'justify-content-center bg-lime-600 rounded-full px-5 p-1 w-fit h-fit mt-auto'}
                                    type={'submit'}>
                                جستجو
                            </button>
                            </div>
                        </form>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <div className={'relative grow overflow-hidden border border-border rounded-b-xl'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        onGridReady={() => onGridReady(query)}
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
            <TablePagination query={query} api={`${MARKET_RULES_MANAGEMENT}/request/SearchTrades?`} setQuery={setQuery} gridRef={gridRef} totalCount={totalCount}/>
        </div>
    )
}