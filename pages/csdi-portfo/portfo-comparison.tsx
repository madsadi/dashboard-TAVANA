import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
import TableComponent from '../../components/common/table/table-component'
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { throwToast } from "components/common/functions/notification";
import CSDIPortfoComparisonToolbar from "components/csdi-portfo/csdi-portfo-comparison";

function CSDIPortfo() {
    const columnDefStructure = [
        {
            field: 'faInsCode',
            headerName: 'نماد ',
        },
        {
            headerName: 'تاریخ اول',
            children: [
                {
                    field: 'firstshareCount',
                    headerName: 'تعداد مانده ',
                    cellClassRules: {
                        // out of range style
                        'bg-green-200': (params: any) => params?.data?.firstshareCount > params?.data?.secondshareCount,
                        'bg-red-200': (params: any) => params?.data?.firstshareCount < params?.data?.secondshareCount,
                    },
                },
                {
                    field: 'firstlastPrice',
                    headerName: 'قیمت آخرین معامله',
                    cellClassRules: {
                        // out of range style
                        'bg-green-200': (params: any) => params?.data?.firstshareCount > params?.data?.secondshareCount,
                        'bg-red-200': (params: any) => params?.data?.firstshareCount < params?.data?.secondshareCount,
                    },
                },
                {
                    field: 'firstclosingPrice',
                    headerName: 'قیمت پایانی',
                    hide: true,
                    cellClassRules: {
                        // out of range style
                        'bg-green-200': (params: any) => params?.data?.firstshareCount > params?.data?.secondshareCount,
                        'bg-red-200': (params: any) => params?.data?.firstshareCount < params?.data?.secondshareCount,
                    },
                },
                {
                    field: 'firstnetValuebyClosingPrice',
                    headerName: 'خالص ارزش فروش ',
                    hide: true,
                    aggFunc: 'sum',
                    cellClassRules: {
                        // out of range style
                        'bg-green-200': (params: any) => params?.data?.firstshareCount > params?.data?.secondshareCount,
                        'bg-red-200': (params: any) => params?.data?.firstshareCount < params?.data?.secondshareCount,
                    },
                },
                {
                    field: 'firstnetValuebyLastPrice',
                    aggFunc: 'sum',
                    headerName: 'خالص ارزش فروش ',
                    cellClassRules: {
                        // out of range style
                        'bg-green-200': (params: any) => params?.data?.firstshareCount > params?.data?.secondshareCount,
                        'bg-red-200': (params: any) => params?.data?.firstshareCount < params?.data?.secondshareCount,
                    },
                },
                {
                    field: 'firstClosingPricePercentage',
                    headerName: 'درصد نماد ',
                    valueFormatter: (data: any) => data.data?.firstClosingPricePercentage ? (data.data?.firstClosingPricePercentage.toFixed(2) + '%') : null,
                    hide: true,
                    aggFunc: (params: any) => {
                        let total = 0;
                        params.values.forEach((value: number) => total += value);
                        return total.toFixed(2) + '%';
                    },
                    cellClassRules: {
                        // out of range style
                        'bg-green-200': (params: any) => params?.data?.firstshareCount > params?.data?.secondshareCount,
                        'bg-red-200': (params: any) => params?.data?.firstshareCount < params?.data?.secondshareCount,
                    },
                },
                {
                    field: 'firstLastPricePercentage',
                    headerName: 'درصد نماد ',
                    valueFormatter: (data: any) => data.data?.firstLastPricePercentage ? data.data?.firstLastPricePercentage.toFixed(2) + '%' : null,
                    aggFunc: (params: any) => {
                        let total = 0;
                        params.values.forEach((value: number) => total += value);
                        return total.toFixed(2) + '%';
                    },
                    cellClassRules: {
                        // out of range style
                        'bg-green-200': (params: any) => params?.data?.firstshareCount > params?.data?.secondshareCount,
                        'bg-red-200': (params: any) => params?.data?.firstshareCount < params?.data?.secondshareCount,
                    },
                },
            ]
        },
        {
            headerName: 'تاریخ دوم',
            children: [
                {
                    field: 'secondshareCount',
                    headerName: 'تعداد مانده ',
                    cellClassRules: {
                        'bg-green-200': (params: any) => params?.data?.secondshareCount > params?.data?.firstshareCount,
                        'bg-red-200': (params: any) => params?.data?.secondshareCount < params?.data?.firstshareCount,
                    }
                },
                {
                    field: 'secondlastPrice',
                    headerName: 'قیمت آخرین  معامله',
                    cellClassRules: {
                        'bg-green-200': (params: any) => params?.data?.secondshareCount > params?.data?.firstshareCount,
                        'bg-red-200': (params: any) => params?.data?.secondshareCount < params?.data?.firstshareCount,
                    }
                },
                {
                    field: 'secondclosingPrice',
                    headerName: 'قیمت پایانی',
                    hide: true,
                    cellClassRules: {
                        'bg-green-200': (params: any) => params?.data?.secondshareCount > params?.data?.firstshareCount,
                        'bg-red-200': (params: any) => params?.data?.secondshareCount < params?.data?.firstshareCount,
                    }
                },
                {
                    field: 'secondnetValuebyClosingPrice',
                    headerName: 'خالص ارزش فروش ',
                    aggFunc: 'sum',
                    hide: true,
                    cellClassRules: {
                        'bg-green-200': (params: any) => params?.data?.secondshareCount > params?.data?.firstshareCount,
                        'bg-red-200': (params: any) => params?.data?.secondshareCount < params?.data?.firstshareCount,
                    }
                },
                {
                    field: 'secondnetValuebyLastPrice',
                    headerName: 'خالص ارزش فروش ',
                    aggFunc: 'sum',
                    cellClassRules: {
                        'bg-green-200': (params: any) => params?.data?.secondshareCount > params?.data?.firstshareCount,
                        'bg-red-200': (params: any) => params?.data?.secondshareCount < params?.data?.firstshareCount,
                    }
                },
                {
                    field: 'secondClosingPricePercentage',
                    headerName: 'درصد نماد ',
                    valueFormatter: (data: any) => data.data?.secondClosingPricePercentage ? data.data?.secondClosingPricePercentage.toFixed(2) + '%' : null,
                    hide: true,
                    aggFunc: (params: any) => {
                        let total = 0;
                        params.values.forEach((value: number) => total += value);
                        return total.toFixed(2) + '%';
                    },
                    cellClassRules: {
                        'bg-green-200': (params: any) => params?.data?.secondshareCount > params?.data?.firstshareCount,
                        'bg-red-200': (params: any) => params?.data?.secondshareCount < params?.data?.firstshareCount,
                    }
                },
                {
                    field: 'secondLastPricePercentage',
                    valueFormatter: (data: any) => data.data?.secondLastPricePercentage ? data.data?.secondLastPricePercentage.toFixed(2) + '%' : null,
                    headerName: 'درصد نماد ',
                    aggFunc: (params: any) => {
                        let total = 0;
                        params.values.forEach((value: number) => total += value);
                        return total.toFixed(2) + '%';
                    },
                    cellClassRules: {
                        'bg-green-200': (params: any) => params?.data?.secondshareCount > params?.data?.firstshareCount,
                        'bg-red-200': (params: any) => params?.data?.secondshareCount < params?.data?.firstshareCount,
                    }
                },
            ]
        },

    ]
    const { query, fetchAsyncData } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/GetHistoricalCustomerPortfolio` })
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const ref: any = useRef()

    const findColId = (keyword: string, visible: boolean) => {
        const colsss = ref.current?.getTableColumns()

        ref.current?.tableColumnVisibility(colsss.filter((item: any) => item.colId.toLowerCase().includes(keyword.toLowerCase())).map((col: any) => col.colId), visible)
    }


    const fetchHandler = async (query: any) => {
        const { DateFirst, DateSecond, ...rest } = query
        if (rest.TradingCode || rest.BourseCode) {
            setLoading(true)
            const [result1, result2] = await Promise.all([await fetchAsyncData({ ...rest, Date: DateFirst }).catch(() => setLoading(false)), await fetchAsyncData({ ...rest, Date: DateSecond }).catch(() => setLoading(false))])
            let res1 = result1;
            let res2 = result2;

            if (res2?.data.result.totalCount > rest.PageSize || res1?.data.result.totalCount > rest.PageSize) {
                if (res2?.data.result.totalCount > res1?.data.result.totalCount) {
                    res1 = await fetchAsyncData({ ...rest, Date: DateFirst, PageSize: res2?.data.result.totalCount, PageNumber: 1 })
                } else {
                    res2 = await fetchAsyncData({ ...rest, Date: DateSecond, PageSize: res1?.data.result.totalCount, PageNumber: 1 })
                }
            }
            let netValueByClosingPriceSum1 = res1?.data.result.pagedData.reduce((a: any, b: any) => a + b.netValueByClosingPrice, 0)
            let netValueByLastPriceSum1 = res1?.data.result.pagedData.reduce((a: any, b: any) => a + b.netValueByLastPrice, 0)

            let netValueByClosingPriceSum2 = res2?.data.result.pagedData.reduce((a: any, b: any) => a + b.netValueByClosingPrice, 0)
            let netValueByLastPriceSum2 = res2?.data.result.pagedData.reduce((a: any, b: any) => a + b.netValueByLastPrice, 0)

            let rowData: any[] = []
            const baseData = res1?.data.result.pagedData.map((item: any) => {
                return (
                    {
                        faInsCode: item.faInsCode,
                        firstlastPrice: item.lastPrice || 0,
                        firstclosingPrice: item.closingPrice || 0,
                        firstshareCount: item.shareCount || 0,
                        firstnetValuebyClosingPrice: item.netValueByClosingPrice || 0,
                        firstClosingPricePercentage: item.netValueByClosingPrice ? ((item.netValueByClosingPrice || 0) / netValueByClosingPriceSum1) * 100 : 0,
                        firstLastPricePercentage: item.netValueByLastPrice ? ((item.netValueByLastPrice || 0) / netValueByLastPriceSum1) * 100 : 0,
                        firstnetValuebyLastPrice: item.netValueByLastPrice || 0,
                        secondlastPrice: 0,
                        secondclosingPrice: 0,
                        secondshareCount: 0,
                        secondClosingPricePercentage: 0,
                        secondLastPricePercentage: 0,
                        secondnetValuebyClosingPrice: 0,
                        secondnetValuebyLastPrice: 0,
                    })
            }
            )
            rowData.push(...baseData)
            res2?.data.result.pagedData.map((item: any) => {
                let index = rowData.findIndex((r: any) => r.faInsCode === item.faInsCode)
                if (index >= 0) {
                    rowData.splice(index, 1, {
                        ...rowData[index],
                        secondlastPrice: item.lastPrice || 0,
                        secondclosingPrice: item.closingPrice || 0,
                        secondshareCount: item.shareCount || 0,
                        secondClosingPricePercentage: item.netValueByClosingPrice ? ((item.netValueByClosingPrice || 0) / netValueByClosingPriceSum2) * 100 : 0,
                        secondLastPricePercentage: item.netValueByLastPrice ? ((item.netValueByLastPrice || 0) / netValueByLastPriceSum2) * 100 : 0,
                        secondnetValuebyClosingPrice: item.netValueByClosingPrice || 0,
                        secondnetValuebyLastPrice: item.netValueByLastPrice || 0,
                    })
                } else {
                    rowData.push(
                        {
                            faInsCode: item.faInsCode,
                            firstlastPrice: 0,
                            firstclosingPrice: 0,
                            firstshareCount: 0,
                            firstnetValuebyClosingPrice: 0,
                            firstnetValuebyLastPrice: 0,
                            firstClosingPricePercentage: 0,
                            firstLastPricePercentage: 0,
                            secondlastPrice: item.lastPrice || 0,
                            secondclosingPrice: item.closingPrice || 0,
                            secondshareCount: item.shareCount || 0,
                            secondClosingPricePercentage: item.netValueByClosingPrice ? ((item.netValueByClosingPrice || 0) / netValueByClosingPriceSum2) * 100 : 0,
                            secondLastPricePercentage: item.netValueByLastPrice ? ((item.netValueByLastPrice || 0) / netValueByLastPriceSum2) * 100 : 0,
                            secondnetValuebyClosingPrice: item.netValueByClosingPrice || 0,
                            secondnetValuebyLastPrice: item.netValueByLastPrice || 0,
                        })
                }
            }
            )

            setData({
                date: { first: DateFirst, second: DateSecond },
                result: {
                    pagedData: rowData,
                    totalCount: res2?.data.result.totalCount > res1?.data.result.totalCount ? res2?.data.result.totalCount : res1?.data.result.totalCount
                }
            })
            setLoading(false)
        } else {
            throwToast({ type: 'warning', value: ' لطفا یکی از ورودی های کد معاملاتی یا کد بورسی را پر کنید ' })
        }

    }

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent onSubmit={fetchHandler} loading={loading} module={ModuleIdentifier.CSDI_PORTFO_comparison} />
            </AccordionComponent>
            <CSDIPortfoComparisonToolbar toggleAction={findColId} data={data} />
            <TableComponent
                data={data?.result?.pagedData}
                ref={ref}
                module={ModuleIdentifier.CSDI_PORTFO_comparison}
                columnDefStructure={columnDefStructure}
                rowId={['faInsCode']}
                groupIncludeFooter={true}
                groupIncludeTotalFooter={true}
                pagination={true}
                totalCount={data?.result?.totalCount}
                fetcher={fetchHandler}
                query={query}
            />
        </div>
    )
}

export default withPermission(CSDIPortfo, ModuleIdentifier.CSDI_PORTFO_comparison)