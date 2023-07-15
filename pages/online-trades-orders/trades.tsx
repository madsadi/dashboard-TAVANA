import React, {useMemo} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
import {formatNumber, jalali} from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import {ADMIN_GATEWAY} from "../../api/constants";
import {throwToast} from "../../components/common/functions/notification";
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";

export default function Trades() {
    function chunk(str: string, n: number) {
        var ret = [];
        var i;
        var len;

        for (i = 0, len = str?.length; i < len; i += n) {
            ret.push(str.substr(i, n))
        }

        return ret
    };

    const columnDefStructure = [
        {
            field: 'customerTitle',
            headerName: 'عنوان مشتری',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'userTitle',
            headerName: 'عنوان کاربر',
            flex: 0.8
        },
        {
            field: 'traderId',
            headerName: 'شناسه معاملاتی',
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'isCanceled',
            headerName: 'وضعیت',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span>{rowData.data.isCanceled ? 'ابطال کامل معاملات' : 'تائید شده'}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'orderSideTitle',
            headerName: 'طرف سفارش',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span
                            className={`${rowData.data.orderSideTitle === 'خرید' ? 'text-green-400' : 'text-red-500'}`}>{rowData.data.orderSideTitle}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'tradePrice',
            headerName: 'قیمت',
        },
        {
            field: 'tradeQuantity',
            headerName: 'حجم',
        },
        {
            field: 'tradeDate',
            headerName: 'تاریخ معامله',
            cellRendererSelector: () => {
                const ColourCellRenderer = (props: any) => {
                    return (
                        <>
                            <span>{jalali(props.data.tradeDate).date}</span>
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
            field: 'tradeTime',
            headerName: 'زمان معامله',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{chunk(rowData.data.tradeTime, 2).join(':')}</span>
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
            field: 'applicationSourceName',
            headerName: 'نام نرم افزار',
        }
    ]
    const {data, loading, query, fetchData} = useQuery({url: `${ADMIN_GATEWAY}/api/request/SearchTrades`})

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                columnDefs: [
                    {field: 'userId', headerName: 'شناسه کاربر'},
                    {
                        field: 'customerNationalId',
                        headerName: 'کد ملی مشتری',
                    },
                    {
                        field: 'customerId',
                        headerName: 'شناسه مشتری',
                    },
                    {
                        field: 'tradeId',
                        headerName: 'شناسه معامله'
                    },
                    {
                        field: 'instrumentId',
                        headerName: 'شناسه نماد'
                    },
                    {field: 'orderId', headerName: 'شناسه سفارش'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([params.data])
            },
        };
    }, []);

    const fetchHandler =(query:any)=>{
        if (query?.StartDate && query?.EndDate){
            fetchData(query)
        }else{
            throwToast({type:'warning',value:'ورودی تاریخ الزامی می باشد'})
        }
    }
    return (
        <div className="flex flex-col h-full grow">
            <AccordionComponent>
                <SearchComponent onSubmit={fetchHandler} loading={loading} module={ModuleIdentifier.ONLINE_TRADES}/>
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                            loading={loading}
                            columnDefStructure={columnDefStructure}
                            rowId={['tradeTime', 'tradeDate', 'orderId', 'tradeId']}
                            detailCellRendererParams={detailCellRendererParams}
                            masterDetail={true}
                            pagination={true}
                            totalCount={data?.result?.totalCount}
                            fetcher={fetchHandler}
                            query={query}
            />
        </div>
    )
}