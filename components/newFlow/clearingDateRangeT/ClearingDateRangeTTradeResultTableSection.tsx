import React, {useState, useRef, useMemo, useCallback} from 'react';
import {AgGridReact} from "ag-grid-react";
import {formatNumber, jalali} from "../../commonFn/commonFn";
import {LoadingOverlay, NoRowOverlay} from "../../common/customOverlay";
import moment from "jalali-moment";
import TablePagination from "../../common/TablePagination";
import {NETFLOW_BASE_URL} from "../../../api/constants";
import {enTierNameEnum} from '../../commonFn/Enums'
import AccordionComponent from "../../common/AccordionComponent";

type initialType = { StartDate: string, EndDate: string, PageNumber: number, PageSize: number ,EnTierName:string,SettlementDelay:string}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    EnTierName:'',
    SettlementDelay:'',
}
const listOfFilters = [
    {title:'PageNumber',name:'شماره صفحه',type:null},
    {title:'PageSize',name:'تعداد',type:null},
    {title:'date',name:'تاریخ',type:'date'},
    {title:'EnTierName',name:'نام انگلیسی گروه',type:'input'},
    {title:'SettlementDelay',name:'تاخیر',type:'input'},
]

export default function ClearingDateRangeTTradeResultTableSection() {
    const columnDefStructure = [
        {
            field: 'georgianTradeDate',
            headerName: 'تاریخ معامله',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{jalali(props.data.georgianTradeDate).date}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 120,
        },
        {
            field: 'enTierName',
            headerName: 'نام گروه',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <span>{enTierNameEnum.find((item:any)=>props.data.enTierName===item.enTitle).faTitle}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
            flex: 0,
            width: 250,
        },
        {
            field: 'brokerCode',
            headerName: 'کد کارگزار',
        },
        {
            cellRenderer: 'agGroupCellRenderer',
            field: 'brokerName',
            headerName: 'نام کارگزار',
        },
        {
            field: 'settlementDelay',
            headerName: 'تاخیر',
        },
        {
            field: 'buy',
            headerName: 'مبلغ خرید',
        },
        {
            field: 'sell',
            headerName: 'مبلغ فروش',
        },
        {
            field: 'sellerInterest',
            headerName: 'سود فروشنده',
        },
        {
            field: 'buyerInterest',
            headerName: 'سود خریدار',
        },
        {
            field: 'credit',
            headerName: 'بستانکار',
        },
        {
            field: 'debit',
            headerName: 'بدهکار',
        },
        {
            field: 'sellerBalance',
            headerName: 'مانده فروشنده',
        },
        {
            field: 'buyerBalance',
            headerName: 'مانده خریدار',
        },
    ]

    const [totalCount, setTotalCount] = useState<number>(0);
    const [query, setQuery] = useState<initialType>(initialValue)

    //GRID CUSTOMISATION
    const gridRef: any = useRef();
    const gridStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const getRowId = useCallback((params: any) => {
        return params.data.georgianTradeDate+params.data.enTierName+params.data.settlementDelay+params.data.sell
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
            noRowsMessageFunc: () => 'اطلاعاتی با این فیلتر یافت نشد.',
        };
    }, []);
    const getRowStyle = (params: any) => {
        if (params?.node?.rowIndex === 0) {
            return {borderRight: '2px solid rgba(5,122,85,1)'};
        } else {
            return {borderRight: '2px solid rgba(225,29,72,1)'};
        }
    };
    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                rowStyle: {},
                getRowStyle:getRowStyle,
                columnDefs: [
                    {field: 'type', headerName: 'سمت معامله',
                        cellRendererSelector: () => {
                            const ColourCellRenderer = (props: any) => {
                                return (
                                    <span className={`my-auto`}>{props.node.rowIndex === 0  ? 'کارمزد خرید':'کارمزد فروش'}</span>
                                )
                            };
                            const moodDetails = {
                                component: ColourCellRenderer,
                            }
                            return moodDetails;
                        },
                    },
                    {field: 'brokerCommission', headerName: 'کارگزار'},
                    {field: 'brfCommission', headerName: 'سهم صندوق توسعه'},
                    {field: 'accessCommission', headerName: 'کارمزد دسترسی'},
                    {
                        field: 'seoCommission',
                        headerName: 'کارمزد سازمان'
                    },
                    {field: 'tmcCommission', headerName: 'کارمزد فناوری'},
                    {field: 'csdCommission', headerName: 'کارمزد سپرده گزاری'},
                    {field: 'rayanBourseCommission', headerName: 'کارمزد رایان'},
                    {field: 'bourseCommisison', headerName: 'بورس مربوطه'},
                    {field: 'inventoryCommission', headerName: 'هزینه انبارداری'},
                    {field: 'farCommission', headerName: 'کارمزد فراوری'},
                    {field: 'tax', headerName: 'مالیات'},
                    {field: 'vatCommission', headerName: 'مالیات ارزش افزوده'},
                    {field: 'vtsCommission', headerName: 'مالیات ارزض افزوده هزینه انبارداری'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data?.buyCommission,params.data?.sellCommission])
            },
        };
    }, []);
    //GRID CUSTOMISATION

    return (
        <>
            <AccordionComponent query={query} setQuery={setQuery} api={`${NETFLOW_BASE_URL}/Report/clearing-date-range-T`} gridRef={gridRef} listOfFilters={listOfFilters} initialValue={initialValue} setTotalCount={setTotalCount}/>
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
                        detailCellRendererParams={detailCellRendererParams}
                        masterDetail={true}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${NETFLOW_BASE_URL}/Report/clearing-date-range-T?`} setQuery={setQuery} totalCount={totalCount} gridRef={gridRef} pagedData={false}/>
        </>
    );
}
