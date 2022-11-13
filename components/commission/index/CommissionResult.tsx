import React, {useEffect, useRef, useMemo, useCallback} from 'react';
import {useSelector} from "react-redux";
import {formatNumber, jalali} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";
import {AgGridReact} from "ag-grid-react";
import RulesExpressionDetail from "../../marketRulesManagement/RulesExpressionDetail";

export default function CommissionResult() {
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
            field: 'instrumentId',
            headerName: 'شناسه نماد',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'faInsName',
            headerName: 'عنوان نماد',
        },
        {
            field: 'maxQuantity',
            headerName: 'بیشینه حجم سفارش',
            flex: 0,
        },
        {
            field: 'minPrice',
            headerName: 'حداقل قیمت سفارش',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'maxPrice',
            headerName: 'حداکثر قیمت سفارش',
            flex: 0,
        }, {
            field: 'fromActiveDateTime',
            headerName: 'زمان شروع',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.fromActiveDateTime).date}</span>
                            <span>{jalali(props.data.fromActiveDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'toActiveDateTime',
            headerName: 'زمان پایان',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.toActiveDateTime).date}</span>
                            <span>{jalali(props.data.toActiveDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'createdBy',
            headerName: 'کاربر ایجاد کننده',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'createDateTime',
            headerName: 'زمان ایجاد',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.createDateTime).date}</span>
                            <span>{jalali(props.data.createDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'updatedBy',
            headerName: 'کاربر تغییر دهنده',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'updatedDateTime',
            headerName: 'زمان تغییر',
            flex: 0,
            width: 120,
            minWidth: 120
        }
    ]

    const {commission} = useSelector((state: any) => state.commissionConfig)

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

    useEffect(() => {
        if (commission) {
            gridRef.current?.api?.setRowData(commission)
        }
    }, [commission]);

    //Grid

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
