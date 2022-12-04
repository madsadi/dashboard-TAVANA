import React, {useState, useRef, useMemo, useCallback} from 'react';
import {AgGridReact} from "ag-grid-react";
import {formatNumber, jalali} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";
import {Accordion} from "flowbite-react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {clearedTradesReportSearch} from "../../../api/clearedTradesReport";
import moment from "jalali-moment";
import {toast} from "react-toastify";
import TablePagination from "../../common/TablePagination";
import {NETFLOW_BASE_URL} from "../../../api/constants";
import {enTierNameEnum} from '../../commonFn/Enums'

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number ,EnTierName:string,SettlementDelay:string}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EnTierName:'',
    SettlementDelay:'',
}

export default function ClearingDateRangeTTradeResultTableSection() {
    const columnDefStructure = [
        {
            field: 'georgianTradeDate',
            headerName: 'تاریخ معامله',
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
            width: 120,
        },
        {
            field: 'enTierName',
            headerName: 'نام گروه',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{enTierNameEnum.find((item:any)=>props.data.enTierName===item.enTitle).faTitle}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 250,
        },
        {
            field: 'brokerCode',
            headerName: 'کد کارگزار',
        },
        {
            cellRenderer: 'agGroupCellRenderer',
            field: 'brokerName',
            headerName: 'نام کارگزار',
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر',
        },
        {
            field: 'buy',
            headerName: 'مبلغ خرید',
        },
        {
            field: 'sell',
            headerName: 'مبلغ فروش',
        },
        {
            field: 'sellerInterest',
            headerName: 'سود فروشنده',
        },
        {
            field: 'buyerInterest',
            headerName: 'سود خریدار',
        },
        {
            field: 'credit',
            headerName: 'بستانکار',
        },
        {
            field: 'debit',
            headerName: 'بدهکار',
        },
        {
            field: 'sellerBalance',
            headerName: 'مانده فروشنده',
        },
        {
            field: 'buyerBalance',
            headerName: 'مانده خریدار',
        },
    ]

    //GRID CUSTOMISATION
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);

    const getRowId = useCallback((params: any) => {
        return params.data.georgianTradeDate+params.data.enTierName+params.data.settlementDelay+params.data.sell
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
            noRowsMessageFunc: () => 'اطلاعاتی با این فیلتر یافت نشد.',
        };
    }, []);
    //GRID CUSTOMISATION

    const rowStyle = {}
    const getRowStyle = (params: any) => {
        if (params?.node?.rowIndex === 0) {
            return {borderRight: '2px solid rgba(5,122,85,1)'};
        } else {
            return {borderRight: '2px solid rgba(225,29,72,1)'};
        }
    };

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                rowStyle:rowStyle,
                getRowStyle:getRowStyle,
                columnDefs: [
                    {field: 'type', headerName: 'سمت معامله',
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span className={`my-auto`}>{props.node.rowIndex === 0  ? 'کارمزد خرید':'کارمزد فروش'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                    {field: 'brokerCommission', headerName: 'کارگزار'},
                    {field: 'brfCommission', headerName: 'سهم صندوق توسعه'},
                    {field: 'accessCommission', headerName: 'کارمزد دسترسی'},
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    {field: 'tmcCommission', headerName: 'کارمزد فناوری'},
                    {field: 'csdCommission', headerName: 'کارمزد سپرده گزاری'},
                    {field: 'rayanBourseCommission', headerName: 'کارمزد رایان'},
                    {field: 'bourseCommisison', headerName: 'بورس مربوطه'},
                    {field: 'inventoryCommission', headerName: 'هزینه انبارداری'},
                    {field: 'farCommission', headerName: 'کارمزد فراوری'},
                    {field: 'tax', headerName: 'مالیات'},
                    {field: 'vatCommission', headerName: 'مالیات ارزش افزوده'},
                    {field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data?.buyCommission,params.data?.sellCommission])
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
        await clearedTradesReportSearch('/Report/clearing-date-range-T',
            {StartDate: selectedDayRange.from ? moment.from(`${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'):'',
                EndDate: selectedDayRange.to ? moment.from(`${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'):'',
                EnTierName: query.EnTierName,
                SettlementDelay: query.SettlementDelay,
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
                                    <label className={'block'} htmlFor="SettlementDelay">تاخیر</label>
                                    <input className={'w-full'} id="SettlementDelay" value={query.SettlementDelay}
                                           onChange={(e) => queryUpdate('SettlementDelay', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="EnTierName">نام انگلیسی گروه</label>
                                    <input className={'w-full'} id="EnTierName" value={query.EnTierName}
                                           onChange={(e) => queryUpdate('EnTierName', e.target.value)}/>
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
            <TablePagination query={query} api={`${NETFLOW_BASE_URL}/Report/clearing-date-range-T?`} setQuery={setQuery} totalCount={totalCount} gridRef={gridRef} pagedData={false}/>
        </>
    );
}
