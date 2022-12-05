import React, {useMemo, useRef, useState} from "react";
import moment from "jalali-moment";
import {AgGridReact} from "ag-grid-react";
import {formatNumber, jalali} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import {tradingSession} from "../../api/oms";
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

export default function TradingSession() {
    const columnDefStructure = [
        {
            field: 'sessionStatusCode',
            headerName: 'کد وضعیت جلسه معاملاتی',
        },
        {
            field: 'sessionStatusTitle',
            headerName: 'وضعیت جلسه معاملاتی',
        },
        {
            field: 'startDate',
            headerName: 'تاریخ و زمان شروع',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.startDate ? jalali(rowData.data.startDate).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.startDate ? jalali(rowData.data.startDate).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'endDate',
            headerName: 'تاریخ و زمان پایان',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{rowData.data.endDate ? jalali(rowData.data.endDate).date:'-'}</span>
                            <span className={'ml-4'}>{rowData.data.endDate ? jalali(rowData.data.endDate).time:'-'}</span>
                        </>)
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]

    const [query, setQuery] = useState<initialType>(initialValue)
    const [totalCount, setTotal] = useState<any>(null);

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
        await tradingSession(query)
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

    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent query={query} setQuery={setQuery} api={`${MARKET_RULES_MANAGEMENT}/request/GetTradingSessionStatus`} gridRef={gridRef} listOfFilters={listOfFilters} initialValue={initialValue} setTotalCount={setTotal}/>
            <div className={'relative grow overflow-hidden border border-border rounded-b-lg'}>
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
                        asyncTransactionWaitMillis={1000}
                        columnHoverHighlight={true}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${MARKET_RULES_MANAGEMENT}/request/GetTradingSessionStatus?`} setQuery={setQuery} gridRef={gridRef} totalCount={totalCount}/>
        </div>
    )
}