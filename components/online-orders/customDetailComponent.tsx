import {AgGridReact} from "ag-grid-react";
import {useCallback, useMemo, useRef} from "react";
import {formatNumber, jalali} from "../common/functions/common-funcions";
import {LoadingOverlay, NoRowOverlay} from "../common/table/customOverlay";
import Image from "next/image";

export default function CustomDetailComponent({data, node, api}: { data: any, node: any, api: any }) {
    const rowId = node.id;

    //Grid
    const gridRefDetail: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%', margin: '0 auto'}), []);

    const colDefs = [
        {field: 'instrumentId'},
        {field: 'direction'},
        {field: 'number'},
        {field: 'duration', valueFormatter: "x.toLocaleString() + 's'"},
        {field: 'switchCode'},
    ];

    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            flex: 1,
            valueFormatter: formatNumber
        };
    }, []);
    const onGridReady = (params: any) => {
        const gridInfo = {
            id: node.id,
            api: params.api,
            columnApi: params.columnApi,
        };
        api.addDetailGridInfo(rowId, gridInfo);
    };
    const getRowId = useCallback((params: any) => {
        return params.data.orderId
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
            noRowsMessageFunc: () => 'هنوز معامله ای ثبت نشده.',
        };
    }, []);

    //Grid

    return (
        <div className={'m-3'}>
            <div className={'mb-3 p-2 flex align-items-center bg-black-alpha-10 border-round-sm'}>
                <div className={'h-6 w-6'}>
                    <Image width={48} height={48} src="/icons/avatar.svg" alt="avatar"/>
                </div>
                <div className={'mr-4'}>
                    <div className={'flex space-x-5 space-x-reverse'}>
                        <div>
                            عنوان کاربر: <span className={'font-semibold'}>{data?.customerTitle}</span>
                        </div>
                        <div>
                            کد ملی:<span className={'font-semibold'}> {data?.customerNationalId}</span>
                        </div>
                        <div>
                            شناسه مشتری: <span className={'font-semibold'}>{data?.customerId}</span>
                        </div>
                        <div>
                            شناسه کاربر: <span className={'font-semibold'}>{data?.userId}</span>
                        </div>
                    </div>
                    <div className={'flex space-x-5 space-x-reverse'}>
                        <div>
                            شناسه سفارش اولیه: <span className={'font-semibold'}>{data?.referenceOrderId}</span>
                        </div>
                        <div>
                            شناسه نماد: <span className={'font-semibold'}>{data?.instrumentId}</span>
                        </div>
                        <div>
                            زمان دریافت: <span
                            className={'font-semibold'}>{data?.orderEntryDateTime ? jalali(data?.orderEntryDateTime).time : '-'}-{data?.orderEntryDateTime ? jalali(data?.orderEntryDateTime).date : '-'}</span>
                        </div>
                        <div>
                            زمان ثبت: <span
                            className={'font-semibold'}>{data?.submitInBrokerDateTime ? jalali(data?.submitInBrokerDateTime).time : '-'}-{data?.submitInBrokerDateTime ? jalali(data?.submitInBrokerDateTime).date : '-'}</span>
                        </div>

                        <div>
                            تاریخ اعتبار سفارش: <span
                            className={'font-semibold'}>{data?.orderValidityDate ? jalali(data?.orderValidityDate).date : '-'}</span>
                        </div>
                        <div>
                            زمان اولویت سفارش: <span
                            className={'font-semibold'}>{data?.orderPriorityDateTime ? jalali(data?.orderPriorityDateTime).time : '-'}-{data?.orderPriorityDateTime ? jalali(data?.orderPriorityDateTime).date : '-'}</span>
                        </div>
                        <div>
                            نام نرم افزار: <span className={'font-semibold'}>{data?.applicationSourceName}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={gridStyle} className="ag-theme-alpine overflow-hidden relative">
                <AgGridReact
                    ref={gridRefDetail}
                    defaultColDef={defaultColDef}
                    loadingOverlayComponent={loadingOverlayComponent}
                    loadingOverlayComponentParams={loadingOverlayComponentParams}
                    noRowsOverlayComponent={noRowsOverlayComponent}
                    noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                    rowHeight={35}
                    headerHeight={35}
                    animateRows={true}
                    getRowId={getRowId}
                    columnDefs={colDefs}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    )
}