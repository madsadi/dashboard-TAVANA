import React, {useState, useRef, useMemo, useCallback} from 'react';
import {AgGridReact} from "ag-grid-react";
import {formatNumber, jalali} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";
import moment from "jalali-moment";
import TablePagination from "../../common/TablePagination";
import {NETFLOW_BASE_URL} from "../../../api/constants";
import AccordionComponent from "../../common/AccordionComponent";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number ,Side:string,InstrumentId:string,Ticket:string,Symbol:string}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    Side:'',
    InstrumentId:'',
    Ticket:'',
    Symbol:''
}
const listOfFilters = [
    {title:'PageNumber',name:'شماره صفحه',type:null},
    {title:'PageSize',name:'تعداد',type:null},
    {title:'date',name:'تاریخ',type:'date'},
    {title:'Ticket',name:'شماره تیکت',type:'input'},
    {title:'Symbol',name:'نماد',type:'input'},
    {title:'InstrumentId',name:'شناسه نماد',type:'input'},
    {title:'Side',name:'سمت',type:'selectInput'},
]

export default function ClearedTradeResultTableSection() {
    const columnDefStructure = [
        {
            field: 'ticket',
            headerName: 'شناسه',
            cellRenderer: 'agGroupCellRenderer',
            flex: 0,
            width: 160,
        },
        {
            field: 'date',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{jalali(props.data.date).date}</span>
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
            field: 'instrumentId',
            headerName: 'شناسه نماد',
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
    ]

    const [totalCount, setTotalCount] = useState<number>(0);
    const [query, setQuery] = useState<initialType>(initialValue)

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
    //GRID CUSTOMISATION

    return (
        <>
            <AccordionComponent query={query} setQuery={setQuery} api={`${NETFLOW_BASE_URL}/Report/cleared-trade`} gridRef={gridRef} listOfFilters={listOfFilters} initialValue={initialValue} setTotalCount={setTotalCount}/>
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
                        rowSelection={'single'}
                        detailCellRendererParams={detailCellRendererParams}
                        masterDetail={true}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${NETFLOW_BASE_URL}/Report/cleared-trade?`} setQuery={setQuery} totalCount={totalCount} gridRef={gridRef} pagedData={false}/>
        </>
    );
}
