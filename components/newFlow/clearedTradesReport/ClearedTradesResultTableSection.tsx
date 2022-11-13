import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {useSelector} from "react-redux";
import {AgGridReact} from "ag-grid-react";
import {formatNumber, jalali} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";

export default function ClearedTradesResultTableSection() {
    const columnDefStructure = [
        {
            field: 'id',
            headerName: 'تاریخ',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'date',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.date).date}</span>
                            <span className={'text-sm ml-3'}>{jalali(props.data.date).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 180,
        },
        {
            field: 'fullName',
            headerName: 'عنوان مشتری',
        },
        {
            field: 'nationalCode',
            headerName: 'کد ملی',
            flex: 0,
            width: 180
        },
        {
            field: 'stationName',
            headerName: 'ایستگاه معمالاتی',
        },
        {
            field: 'stationCode',
            headerName: 'کد ایستگاه',
        },
        {
            field: 'ticket',
            headerName: 'تیکت',
        },
        {
            field: 'tradeDate',
            headerName: 'تاریخ معامله',
        },
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'symbolName',
            headerName: 'نام نماد',
            flex: 0,
            width: 180,
        },
        {
            field: 'symbol',
            headerName: 'نماد',
            flex: 0,
            width: 180,
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر در تسویه',
            flex: 0,
            width: 120
        },
        {
            field: 'bourseCode',
            headerName: 'کد بورسی',
        },
        {
            field: 'price',
            headerName: 'قیمت',
        },
        {
            field: 'shares',
            headerName: 'حجم',
        },
        {
            field: 'settlementValue',
            headerName: 'ارزش ناخالص',
        },
        {
            field: 'symbolMessage',
            headerName: 'متن پیام',
        },
    ]

    const {clearedTradesResult}=useSelector((state:any)=>state.netFlowConfig)

    //GRID CUSTOMISATION
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);

    const getRowId = useCallback((params: any) => {
        var data = params.data;
        return data.orderId
    }, []);

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
            loadingMessage: 'در حال بارگزاری...',
        };
    }, []);
    const noRowsOverlayComponent = useMemo(() => {
        return NoRowOverlay;
    }, []);
    const noRowsOverlayComponentParams = useMemo(() => {
        return {
            noRowsMessageFunc: () => 'سفارشی با این فیلتر یافت نشد.',
        };
    }, []);
    //GRID CUSTOMISATION

    useEffect(() => {
        if (clearedTradesResult){
            gridRef?.current?.api?.setRowData(clearedTradesResult)
        }
    }, [clearedTradesResult]);

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                columnDefs: [
                    {field: 'brokerCommission', headerName: 'کارمزد کارگزاری'},
                    {field: 'brfCommission', headerName: 'سهم صندوق توسعه'},
                    {
                        field: 'bourseCommisison',
                        headerName: 'کارمزد بورس'
                    },
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    {field: 'tmcCommission', headerName: 'کارمزد فناوری'},
                    {field: 'accessCommission', headerName: 'حق دسترسی'},
                    {field: 'csdCommission', headerName: 'کارمزد سپرده گزاری'},
                    {field: 'rayanBourseCommission', headerName: 'کارمزد رایان'},
                    {field: 'inventoryCommission', headerName: 'هزینه انبارداری'},
                    {field: 'tax', headerName: 'مالیات'},
                    {field: 'vatCommission', headerName: 'مالیات ارزش افزوده'},
                    {field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری'},
                    {field: 'farCommission', headerName: 'هزینه فرآوری'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: (params: any) => {
                params.successCallback(params?.feeDetail)
            },
        };
    }, []);

    return (
        <div className={'relative grow overflow-hidden border border-border rounded-b-xl'}>
            {/*<div>*/}
            {/*    {header()}*/}
            {/*</div>*/}
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
                    detailCellRendererParams={detailCellRendererParams}
                    masterDetail={true}
                />
            </div>
        </div>
    );
}
