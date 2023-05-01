import {AgGridReact} from "ag-grid-react";
import React, {memo, useCallback, useEffect, useMemo, useRef} from "react";
import {formatNumber} from "../functions/common-funcions";
import {LoadingOverlay, NoRowOverlay} from "./customOverlay";
import dynamic from "next/dynamic";
const TablePagination = dynamic(() => import('./TablePagination'))

const TableComponent: React.FC<any> = (props) =>{
    let {data=[],
        columnDefStructure,
        rowSelection,
        onGridReady=()=>{gridRef?.current?.api?.setRowData([])},
        rowId,
        isRowSelectable=null,
        masterDetail=false,
        detailComponent=null,
        detailCellRendererParams=null,
        setSelectedRows=null,
        selectedRows=[],
        onRowClicked=null,
        suppressRowClickSelection=false,
        pagination=false,
        totalCount=0,
        fetcher=()=>null,
        query=null,
        loading=false
    } = props

    const gridRef: any = useRef();

    // useEffect(() => {
    //     gridRef?.current?.api?.setRowData(data)
    // },[data])

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
        let id = rowId.map((s:string)=>params.data[s])
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
    const onSelectionChanged = ()=>{
        const selectedRows = gridRef.current?.api?.getSelectedRows();
        setSelectedRows(selectedRows)
    }

    useEffect(()=>{
        if (selectedRows.length === 0){
            gridRef.current?.api?.deselectAll()
        }
    },[selectedRows.length])

    return(
        <>
            <div className={'relative grow overflow-hidden border border-border rounded-b-xl'}>
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
                    />
                </div>
            </div>
            {pagination ? <TablePagination onSubmit={fetcher}
                              query={query}
                              totalCount={totalCount || 0}
            />:null}
        </>
    )
}

export default memo(TableComponent);