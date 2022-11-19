import React, {Fragment, useCallback, useMemo, useRef, useState} from "react";
import {getOrders} from "../../api/onlineTrade";
import {dateRangeHandler, formatNumber, jalali} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import {AgGridReact} from 'ag-grid-react';
import moment from "jalali-moment";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import CustomDetailComponent from "../../components/onlineOrders/customDetailComponent";
import {EnumsStatus, OrderType, originEnum, sides, validityType} from "../../components/commonFn/Enums";
import {Accordion} from "flowbite-react";
import {Listbox, Menu, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import SymbolSearchSection from "../../components/common/SymbolSearchSecion";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function OnlineOrders() {
    const columnDefStructure = [
        // {
        //     field: 'userTitle',
        //     headerName: 'عنوان کاربر',
        //     flex: 0.8
        // },
        // {
        //     field: 'customerNationalID',
        //     headerName: 'کد ملی مشتری',
        // },
        {
            field: 'customerTitle',
            headerName: 'عنوان مشتری',
            cellRenderer: 'agGroupCellRenderer'
        },
        // {
        //     field: 'referenceOrderId',
        //     headerName: 'شناسه سفارش اولیه',
        // },
        // {
        //     field: 'instrumentId',
        //     headerName: 'شناسه نماد',
        // },
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
        // {
        //     field: 'orderValidityDate',
        //     headerName: 'تاریخ اعتبار سفارش',
        //     // cellRendererSelector: () => {
        //     //     const ColourCellRenderer = (props: any) => {
        //     //         return (
        //     //             <>
        //     //                 <span>{jalali(props.data.orderValidityDate).date}</span>
        //     //                 <span>{jalali(props.data.orderValidityDate).time}</span>
        //     //             </>
        //     //         )
        //     //     };
        //     //     const moodDetails = {
        //     //         component: ColourCellRenderer,
        //     //     }
        //     //     return moodDetails;
        //     // },
        // }
        // ,{
        //     field: 'applicationSourceName',
        //     headerName: 'نام نرم افزار',
        // },
        {
            field: 'userRequestDateTime',
            headerName: 'زمان درخواست کاربر',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.userRequestDateTime).date}</span>
                            <span className={'ml-2'}>{jalali(props.data.userRequestDateTime).time}</span>
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
        //     field: 'orderEntryDateTime',
        //     headerName: 'زمان دریافت سفارش',
        // cellRendererSelector: () => {
        //     const ColourCellRenderer = (props: any) => {
        //         return (
        //             <>
        //                 <span>{jalali(props.data.orderEntryDateTime).date}</span>
        //                 <span>{jalali(props.data.orderEntryDateTime).time}</span>
        //             </>
        //         )
        //     };
        //     const moodDetails = {
        //         component: ColourCellRenderer,
        //     }
        //     return moodDetails;
        // },
        // },
        // {
        //     field: 'submitInCapDateTime',
        //     headerName: 'زمان ارسال به هسته',
        // cellRendererSelector: () => {
        //     const ColourCellRenderer = (props: any) => {
        //         return (
        //             <>
        //                 <span>{jalali(props.data.submitInCapDateTime).date}</span>
        //                 <span>{jalali(props.data.submitInCapDateTime).time}</span>
        //             </>
        //         )
        //     };
        //     const moodDetails = {
        //         component: ColourCellRenderer,
        //     }
        //     return moodDetails;
        // },
        // },
        {
            field: 'receiveResponseFromCapServerDateTime',
            headerName: 'زمان ثبت در هسته',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.receiveResponseFromCapServerDateTime).date}</span>
                            <span className={'ml-2'}>{jalali(props.data.receiveResponseFromCapServerDateTime).time}</span>
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

    const pageSize = 20;
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
        await getOrders(query)
            .then((res: any) => {
                gridRef.current.api.setRowData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
    };
    const getRowId = useCallback((params: any) => {
        return params.data.orderId
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
                                <div className={'relative'}>
                                    <SymbolSearchSection query={query} queryUpdate={queryUpdate}/>
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
                                    <label className={'block'} htmlFor="OrderType">نوع سفارش</label>
                                    <div className="relative rounded">
                                        <Listbox name={'status'} value={query.OrderType}
                                                 onChange={(e) => queryUpdate('OrderType', e)}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{OrderType.find((item: any) => item.id === query.OrderType)?.title}</span>
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
                                                            {OrderType.map((type: any) => (
                                                                <Listbox.Option
                                                                    key={type.id}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={type.id}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {type.title}
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
                                    <label htmlFor="ValidityType">اعتبار</label>
                                    <div className="relative rounded">
                                        <Listbox name={'status'} value={query.ValidityType}
                                                 onChange={(e) => queryUpdate('ValidityType', e)}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{validityType.find((item: any) => item.id === query.ValidityType)?.title}</span>
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
                                                            {validityType.map((type: any) => (
                                                                <Listbox.Option
                                                                    key={type.id}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={type.id}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {type.title}
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
                                    <label htmlFor="OrderStatus">وضعیت سفارش</label>
                                    <div className="relative rounded">
                                        <Listbox name={'status'} value={query.OrderStatus}
                                                 onChange={(e) => queryUpdate('OrderStatus', e)}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{EnumsStatus.find((item: any) => item.id === query.OrderStatus)?.title}</span>
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
                                                            {EnumsStatus.map((status: any) => (
                                                                <Listbox.Option
                                                                    key={status.id}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={status.id}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {status.title}
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
                                    <label className={'block'} htmlFor="ApplicationSource">مبدا سفارش</label>
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
            <div className={'relative grow overflow-hidden border border-border'}>
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
                        detailCellRenderer={'myDetailCellRenderer'}
                        frameworkComponents={{myDetailCellRenderer: CustomDetailComponent}}
                        masterDetail={true}
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