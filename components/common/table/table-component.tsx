import { AgGridReact } from "ag-grid-react";
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { formatNumber } from "../functions/common-funcions";
import { LoadingOverlay, NoRowOverlay } from "./custom-overlay";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ExcelStyle } from "ag-grid-community";
import { Loader } from "../components/loader";
const TablePagination = dynamic(() => import('./table-pagination'))
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const TableComponent: React.FC<any> = forwardRef((props, ref) => {
    let { data = [],
        module,
        columnDefStructure,
        rowSelection,
        onGridReady = () => { gridRef?.current?.api?.setRowData([]) },
        rowId,
        isRowSelectable,
        masterDetail = false,
        detailComponent = null,
        detailCellRendererParams = null,
        setSelectedRows = () => null,
        selectedRows = [],
        onRowClicked = null,
        suppressRowClickSelection = false,
        pagination = false,
        totalCount = 0,
        fetcher = () => null,
        query = null,
        loading = false,
        indexOfOpenedDetail = -1,
    } = props

    const excelStyles: ExcelStyle[] = [
        {
            id: 'textFormat',
            dataType: 'String',
        }
    ];

    const gridRef: any = useRef();
    const router = useRouter()

    useEffect(() => {
        gridRef?.current?.api?.setRowData([])
    }, [router.asPath])

    const gridStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            flex: 1,
            cellClass: "textFormat",
            valueFormatter: formatNumber
        };
    }, []);
    const getRowId = useCallback((params: any) => {
        let id = rowId.map((s: string) => params.data[s])
        return id.join("-")
    }, [rowId]);

    const loadingOverlayComponent = useMemo(() => {
        return loading && LoadingOverlay;
    }, [loading]);

    const loadingOverlayComponentParams = useMemo(() => {
        return {
            loadingMessage: 'در حال بارگزاری...',
        };
    }, [loading]);

    const noRowsOverlayComponent = useMemo(() => {
        return NoRowOverlay;
    }, []);

    const noRowsOverlayComponentParams = useMemo(() => {
        return {
            noRowsMessageFunc: () => 'هنوز گزارشی ثبت نشده.',
        };
    }, []);

    const onSelectionChanged = () => {
        const selectedRows = gridRef.current?.api?.getSelectedRows();
        setSelectedRows(selectedRows)
    }

    useEffect(() => {
        if (selectedRows.length === 0) {
            gridRef.current?.api?.deselectAll()
        }
    }, [selectedRows.length])

    const onFirstDataRendered = () => {
        if (indexOfOpenedDetail >= 0) {
            gridRef.current.api.getDisplayedRowAtIndex(indexOfOpenedDetail)?.setExpanded(true);
        }
    }

    const ExportAction = useCallback(() => {
        gridRef?.current?.api.exportDataAsExcel();
    }, []);

    useImperativeHandle(ref, () => ({
        updateRow(newData: any) {
            gridRef.current?.api?.applyTransaction({
                update: [newData]
            })
        },
        addNewRow(newData: any, index?: number) {
            gridRef.current?.api?.applyTransaction({
                add: [newData],
                addIndex: index
            })
        },
        removeRow(newData: any) {
            gridRef.current?.api?.applyTransaction({
                remove: [newData]
            })
        },
        flushUpdates() {
            gridRef.current?.api?.flushAsyncTransactions()
        },
        tableColumnVisibility(cols: any, visible: boolean) {
            gridRef.current?.columnApi?.setColumnsVisible(cols, visible)
        },
        getTableColumns() {
            return gridRef.current?.columnApi?.getColumns()
        },
        changeTableColumns(defStructure: any) {
            gridRef.current?.api?.setColumnDefs(defStructure)
        },
    }));

    return (
        <>
            <div className={'relative grow overflow-hidden border border-border rounded-b-xl min-h-[200px]'}>
                {/*{!loading ? <div className={'absolute left-0 top-0 w-full h-full flex bg-gray-200/80 blur-md'}/>:null}*/}
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
                        rowData={data}
                        enableRtl={true}
                        columnDefs={columnDefStructure}
                        onGridReady={onGridReady}
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
                        detailCellRenderer={detailComponent}
                        detailCellRendererParams={detailCellRendererParams}
                        masterDetail={masterDetail}
                        isRowSelectable={isRowSelectable}
                        rowSelection={rowSelection}
                        onSelectionChanged={onSelectionChanged}
                        onRowClicked={onRowClicked}
                        suppressRowClickSelection={suppressRowClickSelection}
                        onFirstDataRendered={onFirstDataRendered}
                        excelStyles={excelStyles}
                    />
                </div>
            </div>
            {pagination ? <TablePagination onSubmit={fetcher}
                module={module}
                query={query}
                totalCount={totalCount || 0}
                exportExcel={ExportAction}
            /> : null}
        </>
    )
}
)

export default memo(TableComponent);