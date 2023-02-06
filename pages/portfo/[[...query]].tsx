import AccordionComponent from "../../components/common/components/AccordionComponent";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import TablePagination from "../../components/common/table/TablePagination";
import {formatNumber, jalali} from "../../components/common/functions/common-funcions";
import {LoadingOverlay, NoRowOverlay} from "../../components/common/table/customOverlay";
import {useRouter} from "next/router";
import {getPortfolioBook} from "../../api/portfo";

type initialType = { CustomerId: string, InstrumentId: string, PageNumber: number, PageSize: number }
const initialValue = {
    InstrumentId: '',
    CustomerId: '',
    PageNumber: 1,
    PageSize: 20,
}

export default function PortfolioBook(){

    const columnDefStructure = [
        {
            field: 'transactionId',
            headerName: 'شناسه تراکنش',
        },{
            field: 'transactionReferenceId',
            headerName: 'شناسه تراکنش مرجع',
        },{
            field: 'transactionTitle',
            headerName: 'نوع تراکنش',
        },{
            field: 'sideTitle',
            headerName: 'سمت تراکنش',
        },{
            field: 'quantity',
            headerName: 'حجم تراکنش',
        },
        {
            field: 'referenceRemainQuantity',
            headerName: 'مانده تراکنش مرجع',
        },
        {
            field: 'receivedDateTime',
            headerName: 'زمان دریافت',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{props.data.receivedDateTime ? jalali(props.data.receivedDateTime).date:'-'}</span>
                            <span className={'ml-2'}>{props.data.receivedDateTime ? jalali(props.data.receivedDateTime).time:'-'}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'openBuyOrder',
            headerName: 'مجموع حجم سفارشات خرید باز',
        }, {
            field: 'openSellOrder',
            headerName: 'مجموع حجم سفارشات فروش باز',
        },
        {
            field: 'intradayBuy',
            headerName: 'مجموع حجم خرید انجام شده',
        },
        {
            field: 'intradaySell',
            headerName: 'مجموع حجم فروش انجام شده',
        },
        {
            field: 'currentShareCount',
            headerName: 'تعداد مانده دارایی',
        },
        {
            field: 'sellableShareCount',
            headerName: 'تعداد مانده قابل فروش',
        },
        {
            field: 'transactionErrorMessage',
            headerName: 'خطای تراکنش',
        },
        {
            field: 'transactionDateTime',
            headerName: 'زمان تراکنش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{props.data.transactionDateTime ? jalali(props.data.transactionDateTime).date:'-'}</span>
                            <span className={'ml-2'}>{props.data.transactionDateTime ? jalali(props.data.transactionDateTime).time:'-'}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]

    const router = useRouter()

    const [query, setQuery] = useState<initialType>(initialValue)
    const [totalCount, setTotalCount] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>([])

    //GRID
    const gridRef: any = useRef();
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
        return params.data.transactionId+params.data.receivedDateTime
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
    //GRID

    const getPortfolioData = async (query:initialType)=>{
        await getPortfolioBook(query)
            .then((res)=> {
                gridRef.current.api.setRowData(res?.result?.pagedData);
                setUserInfo(res?.result?.pagedData[0])
                setTotalCount(res?.result?.totalCount)
            })
    }
    let dep = router.query?.query?.[0]
    useEffect(()=>{
            if (dep){
                const queryData = dep.split('&')
                let _query = {...query};
                _query['InstrumentId'] = queryData[1];
                _query['CustomerId'] = queryData[0];
                setQuery(_query)
                getPortfolioData({...query,InstrumentId:queryData[1],CustomerId:queryData[0]})

            }
    },[dep]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className={'flex flex-col h-full flex-1'}>
            <div className={'border border-border rounded-t-xl flex space-x-4 justify-between p-3'}>
                <div>
                    عنوان مشتری:
                    <span className={'mr-2 font-bold'}>{userInfo?.customerTitle}</span>
                </div>
                <div>
                    شناسه ملی:
                    <span className={'mr-2 font-bold'}>{userInfo?.customerNationalId}</span>
                </div>
                <div>
                    آیدی مشتری:
                    <span className={'mr-2 font-bold'}>{userInfo?.customerId}</span>
                </div>
                <div>
                    شناسه نماد:
                    <span className={'mr-2 font-bold'}>{userInfo?.instrumentId}</span>
                </div>
                <div>
                    نماد:
                    <span className={'mr-2 font-bold'}>{userInfo?.faInsCode }</span>
                </div>
            </div>
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
                        columnHoverHighlight={true}
                    />
                </div>
            </div>
            <TablePagination query={query} api={`${MARKET_RULES_MANAGEMENT}/request/SearchIntradayPortfolioBook?`}
                             setQuery={setQuery} gridRef={gridRef} totalCount={totalCount}/>
        </div>
    )
}