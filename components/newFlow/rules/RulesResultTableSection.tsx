import React, {useState, useRef, useMemo, useCallback} from 'react';
import {AgGridReact} from "ag-grid-react";
import {formatNumber} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";
import {Accordion} from "flowbite-react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {clearedTradesReportSearch} from "../../../api/clearedTradesReport";
import moment from "jalali-moment";
import {toast} from "react-toastify";
import TablePagination from "../../common/TablePagination";
import {NETFLOW_BASE_URL} from "../../../api/constants";

type initialType = { StartDate: string, EndTime: string, PageNumber: number, PageSize: number, Name: string, BuyerCode: string, SellerCode: string, Symbol: string, SettlementDelay: string }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: '',
    EndTime: '',
    Name: '',
    BuyerCode: '',
    SellerCode: '',
    Symbol: '',
    SettlementDelay: ''
}

export default function RulesResultTableSection() {
    const columnDefStructure = [
        {
            field: 'name',
            headerName: 'نام',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            width: 160,
        },
        {
            field: 'startDate',
            headerName: 'تاریخ شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{props.data.startDate}</span>
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
            field: 'endDate',
            headerName: 'تاریخ شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{props.data.endDate}</span>
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
            field: 'buyerCode',
            headerName: 'شناسه خریدار',
            flex: 0,
            width: 180,
        },
        {
            field: 'sellerCode',
            headerName: 'شناسه فروشنده',
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر',
        }
    ]

    //GRID CUSTOMISATION
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);

    const getRowId = useCallback((params: any) => {
        return params.data.tierName + params.data.name+ params.data.startDate+ params.data.endDate
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
        if (params?.node?.data?.side === 1) {
            return {backgroundColor: 'rgba(5,122,85,0.18)'};
        } else {
            return {backgroundColor: 'rgba(225,29,72,0.18)'};
        }
    };
    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                rowStyle:rowStyle,
                getRowStyle:getRowStyle,
                suppressRowTransform:true,
                columnDefs: [
                    {field: 'type', headerName: 'دسته',rowSpan: (params:any) => params.data.side === 1 ? 2 : 1 ,
                        cellClassRules: {
                            'cell-span': (params:any)=>params.data.side === 1,
                        },
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span className={`my-auto`}>{props.node.rowIndex >1 ? 'ضریب کارمزد':'سقف کارمزد'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                    {field: 'accountCommission', headerName: 'هزینه دسترسی'},
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    {field: 'tmcCommission', headerName: 'کارمزد فناوری'},
                    {field: 'csdCommission', headerName: 'کارمزد سپرده گزاری'},
                    {field: 'rayanBourseCommission', headerName: 'کارمزد رایان'},
                    {field: 'bourseCommission', headerName: 'بورس مربوطه'},
                    {field: 'brokerCommission', headerName: 'کارگزار'},
                    {field: 'tax', headerName: 'مالیات'},
                    {field: 'vatCommission', headerName: 'مالیات ارزش افزوده'},
                    {field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری'},
                    {field: 'side', headerName: 'سمت',
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span>{props.data.side === 1 ? 'خرید':'فروش'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([...params.data?.feeBond,...params.data?.feeValue])
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
        await clearedTradesReportSearch('/Report/rules',
            {
                StartDate: selectedDayRange.from ? moment.from(`${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'):'',
                EndTime: selectedDayRange.to ? moment.from(`${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'):'',
                Name: query.Name,
                Symbol: query.Symbol,
                SettlementDelay: Number(query.SettlementDelay),
                BuyerCode: query.BuyerCode,
                SellerCode: query.SellerCode,
                PageNumber: query.PageNumber,
                PageSize: query.PageSize
            },
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
                                        onChange={(e) => {
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
                                                    EndTime: `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
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
                                    <label className={'block'} htmlFor="Name">نام</label>
                                    <input className={'w-full'} id="Name" value={query.Name}
                                           onChange={(e) => queryUpdate('Name', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="SettlementDelay">تاخیر</label>
                                    <input className={'w-full'} id="SettlementDelay" value={query.SettlementDelay}
                                           onChange={(e) => queryUpdate('SettlementDelay', e.target.value)}/>
                                </div>

                                <div>
                                    <label className={'block'} htmlFor="BuyerCode">شناسه خریدار</label>
                                    <input className={'w-full'} id="BuyerCode" value={query.BuyerCode}
                                           onChange={(e) => queryUpdate('BuyerCode', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="SellerCode">شناسه فروشنده</label>
                                    <input className={'w-full'} id="SellerCode" value={query.SellerCode}
                                           onChange={(e) => queryUpdate('SellerCode', e.target.value)}/>
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="Symbol">نماد</label>
                                    <input className={'w-full'} id="Symbol" value={query.Symbol}
                                           onChange={(e) => queryUpdate('Symbol', e.target.value)}/>
                                </div>
                            </div>
                            <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                                <button className={'p-1 px-2 rounded-full bg-red-600'} onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedDayRange({from: null, to: null})
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
                        suppressRowTransform={true}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${NETFLOW_BASE_URL}/Report/rules?`} setQuery={setQuery}
                             totalCount={totalCount} gridRef={gridRef} pagedData={false}/>
        </>
    );
}
