import React, {useState, useRef, useMemo, useCallback} from 'react';
import {AgGridReact} from "ag-grid-react";
import {formatNumber} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";
import {Accordion} from "flowbite-react";
import DatePicker, {DayRange, DayValue} from "@amir04lm26/react-modern-calendar-date-picker";
import {clearedTradesReportSearch} from "../../../api/clearedTradesReport";
import moment from "jalali-moment";
import {toast} from "react-toastify";
import TablePagination from "../../common/TablePagination";
import {NETFLOW_BASE_URL} from "../../../api/constants";
import AccordionComponent from "../../common/AccordionComponent";

type initialType = { StartDate: DayValue, EndTime: DayValue, PageNumber: number, PageSize: number, Name: string, BuyerCode: string, SellerCode: string, Symbol: string, SettlementDelay: string }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: null,
    EndTime: null,
    Name: '',
    BuyerCode: '',
    SellerCode: '',
    Symbol: '',
    SettlementDelay: ''
}
const listOfFilters = [
    {title:'PageNumber',name:'شماره صفحه',type:null},
    {title:'PageSize',name:'تعداد',type:null},
    {title:'date',name:'تاریخ',type:'date'},
    {title:'Name',name:'نام',type:'input'},
    {title:'BuyerCode',name:'شناسه خریدار',type:'input'},
    {title:'SellerCode',name:'شناسه فروشنده',type:'input'},
    {title:'Symbol',name:'نماد',type:'input'},
    {title:'SettlementDelay',name:'تاخیر',type:'input'},
]

export default function RulesResultTableSection() {
    const columnDefStructure = [
        {
            field: 'name',
            headerName: 'نام',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            width: 260,
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
    const [query, setQuery] = useState<initialType>(initialValue)

    console.log(query)
    //search
    return (
        <>
            <AccordionComponent query={query} setQuery={setQuery} api={'/Report/rules'} gridRef={gridRef} listOfFilters={listOfFilters} initialValue={initialValue} setTotalCount={setTotalCount}/>
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
