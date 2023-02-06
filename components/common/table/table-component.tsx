import {AgGridReact} from "ag-grid-react";
import React, {useCallback, useContext, useEffect, useMemo, useRef} from "react";
import {formatNumber} from "../functions/common-funcions";
import {LoadingOverlay, NoRowOverlay} from "./customOverlay";
import {CustomerManagement} from "../../../pages/customer-management/[[...page]]";
import {useRouter} from "next/router";

const TableComponent: React.FC<any> = (props) =>{
    let {columnDefStructure,rowSelection,onGridReady=null,rowId,isRowSelectable=true,masterDetail=false,detailComponent=null} = props
    const {data,setData,setSelectedProducts} = useContext<any>(CustomerManagement)
    const router = useRouter()
    const gridRef: any = useRef();

    let pageAddress = router.query.page?.[0]

    useEffect(() => {
        setData([])
    }, [pageAddress])
    useEffect(() => {
        gridRef?.current?.api?.setRowData(data)
    }, [data])
    //Grid
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
    const onSelectionChanged = ()=>{
        const selectedRows = gridRef.current?.api?.getSelectedRows();
        setSelectedProducts(selectedRows)
    }
    //Grid

    return(
        <>
            <div className={'relative grow overflow-hidden border border-border rounded-b-xl'}>
                <div style={gridStyle} className="ag-theme-alpine absolute">
                    <AgGridReact
                        ref={gridRef}
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
                        masterDetail={masterDetail}
                        rowSelection={rowSelection}
                        onSelectionChanged={onSelectionChanged}
                    />
                </div>
            </div>
        </>
    )
}

export default TableComponent;