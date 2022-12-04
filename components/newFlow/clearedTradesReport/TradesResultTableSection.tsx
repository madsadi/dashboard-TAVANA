import React, {useState, useEffect, useRef, useMemo, useCallback, Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AgGridReact} from "ag-grid-react";
import {formatNumber, jalali} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";
import {Accordion} from "flowbite-react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {clearedTradesReportSearch} from "../../../api/clearedTradesReport";
import moment from "jalali-moment";
import {clearedTradesResult} from "../../../store/netFlowConfig";
import {toast} from "react-toastify";
import TablePagination from "../../common/TablePagination";
import {NETFLOW_BASE_URL} from "../../../api/constants";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number ,Side:string,InstrumentId:string,Ticket:string,StationCode:string,BourseCode:string,NationalCode:string, LastName:string,
    FirstName:string,
    Symbol:string}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    Side:'',
    InstrumentId:'',
    Ticket:'',
    StationCode:'',
    BourseCode:'',
    NationalCode:'',
    LastName:'',
    FirstName:'',
    Symbol:''
}

export default function TradesResultTableSection() {
    const columnDefStructure = [
        {
            field: 'ticket',
            headerName: 'شناسه',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            width: 160,
        },
        {
            field: 'georgianTradeDate',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                            <span>{jalali(props.data.georgianTradeDate).date}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 180,
        },
        {
            field: 'symbol',
            headerName: 'نماد',
            flex: 0,
            width: 180,
        },
        {
            field: 'symbolName',
            headerName: 'نام نماد',
            flex: 0,
            width: 180,
        },
        {
            field: 'fullName',
            headerName: 'عنوان مشتری',
        },
        {
            field: 'nationalCode',
            headerName: 'کد ملی',
            flex: 0,
            width: 180
        },
        {
            field: 'stationName',
            headerName: 'ایستگاه معمالاتی',
        },
        {
            field: 'stationCode',
            headerName: 'کد ایستگاه',
        },
        // {
        //     field: 'ticket',
        //     headerName: 'تیکت',
        // },
        {
            field: 'tradeDate',
            headerName: 'تاریخ معامله',
        },
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر در تسویه',
            flex: 0,
            width: 120
        },
        {
            field: 'bourseCode',
            headerName: 'کد بورسی',
        },
        {
            field: 'price',
            headerName: 'قیمت',
        },
        {
            field: 'shares',
            headerName: 'حجم',
        },
        {
            field: 'settlementValue',
            headerName: 'ارزش ناخالص',
        },
        {
            field: 'symbolMessage',
            headerName: 'متن پیام',
        },
    ]

    //GRID CUSTOMISATION
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);

    const getRowId = useCallback((params: any) => {
        return params.data.ticket
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            flex: 1,
            valueFormatter: formatNumber
        };
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
            noRowsMessageFunc: () => 'سفارشی با این فیلتر یافت نشد.',
        };
    }, []);
    //GRID CUSTOMISATION

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                columnDefs: [
                    {field: 'brokerCommission', headerName: 'کارمزد کارگزاری'},
                    {field: 'brfCommission', headerName: 'سهم صندوق توسعه'},
                    {
                        field: 'bourseCommisison',
                        headerName: 'کارمزد بورس'
                    },
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    {field: 'tmcCommission', headerName: 'کارمزد فناوری'},
                    {field: 'accessCommission', headerName: 'حق دسترسی'},
                    {field: 'csdCommission', headerName: 'کارمزد سپرده گزاری'},
                    {field: 'rayanBourseCommission', headerName: 'کارمزد رایان'},
                    {field: 'inventoryCommission', headerName: 'هزینه انبارداری'},
                    {field: 'tax', headerName: 'مالیات'},
                    {field: 'vatCommission', headerName: 'مالیات ارزش افزوده'},
                    {field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری'},
                    {field: 'farCommission', headerName: 'هزینه فرآوری'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data?.feeDetail])
            },
        };
    }, []);


    //search
    const [totalCount, setTotalCount] = useState<number>(0);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    const [query, setQuery] = useState<initialType>(initialValue)

    const options = [
        {name: 'خرید', code: '1'},
        {name: 'فروش', code: '2'},
        {name: 'هردو'},
    ];
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
    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await clearedTradesReportSearch('/Report/trades',
                {StartDate: moment.from(`${selectedDayRange.from ? selectedDayRange.from.year : ''}/${selectedDayRange.from ? selectedDayRange.from.month : ''}/${selectedDayRange.from ? selectedDayRange.from.day : ''}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
                EndDate: moment.from(`${selectedDayRange.to ? selectedDayRange.to.year : ''}/${selectedDayRange.to ? selectedDayRange.to.month : ''}/${selectedDayRange.to ? selectedDayRange.to.day : ''}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
                Ticket: query.Ticket,
                Symbol: query.Symbol,
                Side: Number(query.Side),
                FirstName: query.FirstName,
                LastName: query.LastName,
                NationalCode: query.NationalCode,
                BourseCode: query.BourseCode,
                StationCode: query.StationCode,
                InstrumentId: query.InstrumentId,
                PageNumber: query.PageNumber,
                PageSize: query.PageSize},
        ).then(res => {
            gridRef?.current?.api?.setRowData(res?.result)
            setTotalCount(res?.totalRecord)
            toast.success('با موفقیت انجام شد')
        })
            .catch(() => toast.error('ناموفق'))
    }

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    //search
    return (
        <>
            <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                <Accordion.Panel>
                    <Accordion.Title style={{padding: '0.5rem'}}>
                        جستجو
                    </Accordion.Title>
                    <Accordion.Content style={{transition: 'all'}}>
                        <form onSubmit={onSubmit}>
                            <div className="grid grid-cols-5 gap-4">
                                <div>
                                    <DatePicker
                                        value={selectedDayRange}
                                        onChange={(e)=>{
                                            setSelectedDayRange(e)
                                            if (e.from) {
                                                setQuery({
                                                    ...query,
                                                    StartDate: `${moment.from(`${e.from?.year}/${e.from?.month}/${e.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                                                })
                                            }
                                            if (e.to) {
                                                setQuery({
                                                    ...query,
                                                    EndDate: `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                                                })
                                            }
                                        }}
                                        shouldHighlightWeekends
                                        renderInput={renderCustomInput}
                                        locale={'fa'}
                                        calendarPopperPosition={'bottom'}
                                    />
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="Ticket">شماره تیکت</label>
                                    <input className={'w-full'} id="Ticket" value={query.Ticket}
                                           onChange={(e) => queryUpdate('Ticket', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="Symbol">نماد</label>
                                    <input className={'w-full'} id="Symbol" value={query.Symbol}
                                           onChange={(e) => queryUpdate('Symbol', e.target.value)}/>
                                </div>

                                <div>
                                    <label className={'block'} htmlFor="InstrumentId">شناسه نماد</label>
                                    <input className={'w-full'} id="InstrumentId" value={query.InstrumentId}
                                           onChange={(e) => queryUpdate('InstrumentId', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="FirstName">نام</label>
                                    <input className={'w-full'} id="FirstName" value={query.FirstName}
                                           onChange={(e) => queryUpdate('FirstName', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="LastName">نام خانوادگی</label>
                                    <input className={'w-full'} id="LastName" value={query.LastName}
                                           onChange={(e) => queryUpdate('LastName', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="NationalCode">کد ملی</label>
                                    <input className={'w-full'} id="NationalCode" value={query.NationalCode}
                                           onChange={(e) => queryUpdate('NationalCode', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="StationCode">کد ایستگاه معاملاتی</label>
                                    <input className={'w-full'} id="StationCode" value={query.StationCode}
                                           onChange={(e) => queryUpdate('StationCode', e.target.value)}/>
                                </div>
                                <div>
                                    <div className={'mt-auto'}>سمت</div>
                                    <div className="relative rounded">
                                        <Listbox name={'Deleted'} value={query.Side}
                                                 onChange={(e) => queryUpdate('Side', e)}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{options.find((item: any) => item.code === query.Side)?.name}</span>
                                                        </span>
                                                        <span className="pointer-events-none flex items-center mr-auto">
                                                            <ChevronDownIcon className="h-5 w-5 text-gray-400"
                                                                             aria-hidden="false"/>
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
                                                            {options.map((item: any) => (
                                                                <Listbox.Option
                                                                    key={item.name}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'bg-border' : '',
                                                                            'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                        )
                                                                    }
                                                                    value={item.code}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                    <span>
                                                                        {item.name}
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
                            </div>
                            <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                                <button className={'p-1 px-2 rounded-full bg-red-600'} onClick={(e)=>{
                                    e.preventDefault()
                                    setSelectedDayRange({from:null,to:null})
                                    setQuery(initialValue)
                                }}>
                                    لغو
                                </button>
                                <button className={'p-1 px-2 rounded-full bg-lime-600 '} type={'submit'}>
                                    جستجو
                                </button>
                            </div>
                        </form>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <div className={'relative grow overflow-hidden border border-border rounded-b-xl'}>
                {/*<div>*/}
                {/*    {header()}*/}
                {/*</div>*/}
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
                        rowSelection={'single'}
                        detailCellRendererParams={detailCellRendererParams}
                        masterDetail={true}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${NETFLOW_BASE_URL}/Report/trades?`} setQuery={setQuery} totalCount={totalCount} gridRef={gridRef} pagedData={false}/>
        </>
    );
}
