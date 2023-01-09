import AccordionComponent from "../../components/common/AccordionComponent";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import {AgGridReact} from "ag-grid-react";
import TablePagination from "../../components/common/TablePagination";
import React, {useMemo, useRef, useState} from "react";
import {formatNumber} from "../../components/commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/customOverlay";
import Toolbar from "../../components/financialHoldings/Toolbar";
import usePageStructure from "../../hooks/usePageStructure";
import {useRouter} from "next/router";

type initialType = { Id: string, PageNumber: number, PageSize: number }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    Id: '',
}

export default function holdingsSubPages(){

    const [query, setQuery] = useState<initialType>(initialValue)
    const [totalCount, setTotal] = useState<any>(null);
    const {page} = usePageStructure()
    const router = useRouter()
    const listOfFilters = [
        {title:'PageNumber',name:'شماره صفحه',type:null},
        {title:'PageSize',name:'تعداد',type:null},
        {title:'Id',name:` شناسه ${page?.searchFilter}`,type:'input'},
    ]

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
    const loadingOverlayComponent = useMemo(() => {
        return LoadingOverlay;
    }, []);
    const loadingOverlayComponentParams = useMemo(() => {
        return {
            loadingMessage: 'گزارشی موجود نیست.',
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
    //Grid

    return(
        <div className="flex flex-col h-full grow">
            <AccordionComponent query={query} setQuery={setQuery} api={`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/GetById`} gridRef={gridRef} listOfFilters={listOfFilters} initialValue={initialValue} setTotalCount={setTotal} pagedData={true}/>
            <Toolbar gridRef={gridRef}/>
            <div className={'relative grow overflow-hidden border border-border rounded-b-lg'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={page?.columnDefStructure}
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
                        rowSelection={'single'}
                        detailCellRenderer={'myDetailCellRenderer'}
                        frameworkComponents={{myDetailCellRenderer: HoldingsBranchesDetail}}
                        masterDetail={router.query?.page?.[0] === 'branches'}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/GetById?`} setQuery={setQuery} gridRef={gridRef} totalCount={totalCount}/>
        </div>
    )
}

export const HoldingsBranchesDetail = ({data}: { data: any})=>{
    return (<div className={'p-5'}>
        {data.addressId}
    </div>)
}