import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { useSelector } from "react-redux";
import { formatNumber, jalali } from "../commonFn/commonFn";
import { AgGridReact } from "ag-grid-react";
import { LoadingOverlay, NoRowOverlay } from "../common/customOverlay";
import ToolBar from "./ToolBar";

export default function ResultTable() {
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
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
            flex: 0,
            width: 120,
        },
        {
            field: 'faInsName',
            headerName: 'عنوان نماد',
            flex: 0,
            width: 120,
        },
        {
            field: 'maxQuantity',
            headerName: 'بیشینه حجم سفارش',
            flex: 0,
            width: 120,
            minWidth: 120
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
            width: 150,
            minWidth: 150
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
                            <span className={'ml-2'}>{jalali(props.data.fromActiveDateTime).time}</span>
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
                            <span className={'ml-2'}>{jalali(props.data.fromActiveDateTime).time}</span>
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
            width: 200,
            minWidth: 200
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
                            <span className={'ml-2'}>{jalali(props.data.createDateTime).time}</span>
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
            width: 200,
            minWidth: 200,
        },
        {
            field: 'updatedDateTime',
            headerName: 'زمان تغییر',
            flex: 0,
            width: 150,
            minWidth: 150,
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.updatedDateTime).date}</span>
                            <span className={'ml-2'}>{jalali(props.data.updatedDateTime).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        }
    ]

    const { bookBuildingResult } = useSelector((state: any) => state.bookBuildingConfig)

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
            noRowsMessageFunc: () => 'نمادی ثبت نشده.',
        };
    }, []);

    useEffect(() => {
        if (bookBuildingResult) {
            gridRef.current?.api?.setRowData(bookBuildingResult)
        }
    }, [bookBuildingResult]);

    //Grid

    return (
        <div className={'relative flex flex-col grow overflow-hidden border border-border rounded'}>
            <div>
                <ToolBar gridRef={gridRef} />
            </div>
            <div className={'relative grow'}>
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
                        detailRowHeight={100}
                        rowSelection={'single'}
                    />
                </div>
            </div>
        </div>
    );
}
