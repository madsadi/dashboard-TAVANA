import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {useSelector} from "react-redux";
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {toast} from "react-toastify";
import {formatNumber, jalali} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";
import {AgGridReact} from "ag-grid-react";

export default function CategoryResultTableSection() {
    const columnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
        },
        {
            field: 'id',
            headerName: 'شناسه',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'marketCode',
            headerName: 'کد بازار',
        },
        {
            field: 'marketTitle',
            headerName: 'بازار',
        },
        {
            field: 'offerTypeCode',
            headerName: 'کد نوع عرضه',
            flex: 0,
        },
        {
            field: 'offerTypeTitle',
            headerName: 'نوع عرضه',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'sideCode',
            headerName: 'کد سمت سفارش',
            flex: 0,
        }, {
            field: 'sideTitle',
            headerName: 'سمت سفارش',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'settlementDelayCode',
            headerName: 'کد تاخیر در تسویه',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'settlementDelayTitle',
            headerName: 'تاخیر در تسویه',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerTypeCode',
            headerName: 'کد نوع مشتری',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'customerTypeTitle',
            headerName: 'نوع مشتری',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerCounterSideCode',
            headerName: 'کد نوع طرف مقابل',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerCounterSideTitle',
            headerName: 'نوع طرف مقابل',
            flex: 0,
            width: 120,
            minWidth: 120
        }
    ]

    const {categorySearchResult}=useSelector((state:any)=>state.commissionConfig)

    const [totalRecords, setTotalRecords] = useState(0);
    const [basicFirst, setBasicFirst] = useState(0);
    const [basicRows, setBasicRows] = useState(10);
    const [loading, setLoading] = useState(false);

    //Grid
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            flex: 1,
            valueFormatter: formatNumber,
            minWidth:120
        };
    }, []);
    const getRowId = useCallback((params: any) => {
        return params.data.instrumentId
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
    //Grid

    const search=async (body:any)=>{
        await commissionSearch('/CommissionCategory/Search?', body
        ).then(res => {
            gridRef.current?.api?.setRowData(res?.result?.pagedData)
            if (totalRecords!==res?.result?.totalCount){
                setTotalRecords(res?.result?.totalCount)
            }
        })
            .catch(err =>toast.error('ناموفق'))
    }

    useEffect(() => {
        let body=[...categorySearchResult,{PageNumber:(Number(basicFirst)/Number(basicRows))+1},{PageSize:basicRows}]
        search(body)
    }, [basicFirst,basicRows]);

    const onBasicPageChange = (event:any) => {
        setBasicFirst(event.first);
        setBasicRows(event.rows);
    }

    // const rightToolbarTemplate = () => {
    //     let body=[...categorySearchResult,{PageSize:totalRecords}]
    //     const search=async (body:any)=>{
    //         setLoading(true)
    //         await commissionSearch('/CommissionCategory/Search?', body)
    //             .then(res => {
    //                 setLoading(false)
    //             })
    //             .catch(err => {
    //                 setLoading(false)
    //                 toast.error('ناموفق')
    //             })
    //     }
    //
    //
    //     return (
    //         <>
    //             {/*<button type="button" icon="pi pi-file-excel" label={'خروجی'} onClick={()=>search(body)} className="p-button-success mr-auto" data-pr-tooltip="XLS" />*/}
    //             {/*{loading && <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}/>}*/}
    //         </>
    //     )
    // }

    // const header=()=>{
    //     return <div className={'flex'}>{rightToolbarTemplate()}</div>
    // }
    return (
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
                />
            </div>
        </div>
    );
}
