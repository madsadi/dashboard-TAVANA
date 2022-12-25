import AccordionComponent from "../../components/common/AccordionComponent";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import React, {useCallback, useMemo, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import TablePagination from "../../components/common/TablePagination";
import {formatNumber} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";

const listOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'customerId', name: 'شناسه مشتری', type: 'input'},
    {title: 'InstrumentId', name: 'شناسه نماد', type: 'search'},
]
type initialType = { customerId: string, InstrumentId: string, PageNumber: number, PageSize: number }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    InstrumentId: '',
    customerId: '',
}

export default function LivePortfo(){

    const columnDefStructure = [
        {
            field: 'customerId',
            headerName: 'شناسه مشتری',
        },{
            field: 'customerTitle',
            headerName: 'عنوان مشتری',
        },{
            field: 'customerNationalId',
            headerName: 'کد ملی مشتری',
        },{
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },{
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'currentShareCount',
            headerName: 'حجم مانده',
        },
        {
            field: 'intradayBuy',
            headerName: 'حجم خرید',
        },
        {
            field: 'intradaySell',
            headerName: 'حجم فروش',
        }, {
            field: 'openBuyOrder',
            headerName: 'حجم سفارش های باز خرید',
        },
        {
            field: 'openSellOrder',
            headerName: 'حجم سفرش های باز فروش',
        },
        {
            field: 'sellableShareCount',
            headerName: 'حجم قابل فروش',
        }
    ]

    const [query, setQuery] = useState<initialType>(initialValue)
    const [totalCount, setTotalCount] = useState<any>(null)

    //GRID
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
        return params.data.instrumentId+params.data.customerId
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
            noRowsMessageFunc: () => 'هنوز گزارشی ثبت نشده.',
        };
    }, []);

    //GRID
    return(
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent query={query} setQuery={setQuery}
                                api={`${MARKET_RULES_MANAGEMENT}/request/SearchIntradayPortfolio`}
                                gridRef={gridRef} listOfFilters={listOfFilters} initialValue={initialValue}
                                setTotalCount={setTotalCount} pagedData={true}/>
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
                        columnHoverHighlight={true}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${MARKET_RULES_MANAGEMENT}/request/SearchIntradayPortfolio?`}
                             setQuery={setQuery} gridRef={gridRef} totalCount={totalCount}/>
        </div>
    )
}