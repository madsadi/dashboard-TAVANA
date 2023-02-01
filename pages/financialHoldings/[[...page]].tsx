import AccordionComponent from "../../components/common/AccordionComponent";
import { MARKET_RULES_MANAGEMENT } from "../../api/constants";
import { AgGridReact } from "ag-grid-react";
import TablePagination from "../../components/common/TablePagination";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatNumber } from "../../components/commonFn/commonFn";
import { LoadingOverlay, NoRowOverlay } from "../../components/common/customOverlay";
import Toolbar from "../../components/financialHoldings/Toolbar";
import usePageStructure from "../../hooks/usePageStructure";
import { useRouter } from "next/router";
import { GetRowIdParams } from "ag-grid-community";

export default function HoldingsSubPages() {
    const [query, setQuery] = useState<any>(null)
    const [initialValue, setInitialValue] = useState<any>({})
    const [totalCount, setTotal] = useState<any>(null);
    const { page } = usePageStructure()
    const router = useRouter()
    let pageAddress = router.query.page?.[0]
    useEffect(() => {
        if (page?.listOfFilters) {
            let initialValue: any = { PageNumber: 1, PageSize: 20 };
            (page?.listOfFilters)?.map((item: any) => {
                if (item.title === 'date') {
                    initialValue['StartDate'] = '';
                    initialValue['EndDate'] = '';
                } else if (item.title !== 'PageNumber' && item.title !== 'PageSize') {
                    initialValue[item.title] = '';
                }
            })
            setQuery(initialValue)
            setInitialValue(initialValue)
        }
    }, [page?.listOfFilters])

    useEffect(() => {
        gridRef?.current?.api?.setRowData([])
        setTotal(null)
    }, [pageAddress])
    //Grid
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            flex: 1,
            valueFormatter: formatNumber
        };
    }, []);
    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data?.id
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

    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent query={query} setQuery={setQuery}
                api={`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search`} gridRef={gridRef}
                listOfFilters={page?.listOfFilters} initialValue={initialValue} setTotalCount={setTotal}
                pagedData={true} />
            <Toolbar gridRef={gridRef} />
            <div className={'relative grow overflow-hidden border border-border rounded-b-lg'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        enableRtl={true}
                        columnDefs={page?.columnsDefStructure}
                        getRowId={getRowId}
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
                        frameworkComponents={{ myDetailCellRenderer: HoldingsBranchesDetail }}
                        masterDetail={router.query?.page?.[0] === 'branch'}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search?`}
                setQuery={setQuery} gridRef={gridRef} totalCount={totalCount} />
        </div>
    )
}

export const HoldingsBranchesDetail = ({ data }: { data: any }) => {
    return (<div className={'p-5'}>
        شناسه آدرس:
        <span className={'mx-2'}>
            {data?.address?.id}
        </span>
    </div>)
}