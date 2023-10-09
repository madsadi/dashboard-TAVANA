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
                },
                {
                    field: 'firstlastPrice',
                    headerName: 'قیمت آخرین معامله',
                },
                {
                    field: 'firstclosingPrice',
                    headerName: 'قیمت پایانی',
                    hide: true,
                },
                {
                    field: 'firstnetValuebyClosingPrice',
                    headerName: 'خالص ارزش فروش با قیمت پایانی',
                    hide: true,
                },
                {
                    field: 'firstnetValuebyLastPrice',
                    headerName: 'خالص ارزش فروش با قیمت  آخرین معامله',
                },

            ]
        },
        {
            headerName: 'تاریخ دوم',
            children: [
                {
                    field: 'secondshareCount',
                    headerName: 'تعداد مانده ',
                },
                {
                    field: 'secondlastPrice',
                    headerName: 'قیمت آخرین  معامله',
                },
                {
                    field: 'secondclosingPrice',
                    headerName: 'قیمت پایانی',
                    hide: true,
                },
                {
                    field: 'secondnetValuebyClosingPrice',
                    headerName: 'خالص ارزش فروش با قیمت پایانی',
                    hide: true,
                },
                {
                    field: 'secondnetValuebyLastPrice',
                    headerName: 'خالص ارزش فروش با قیمت  آخرین معامله',
                }
            ]
        },

    ]
    const { query, fetchAsyncData } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/GetHistoricalCustomerPortfolio` })
    const [data, setData] = useState<any>(null)
    const ref: any = useRef()

    const findColId = (keyword: string, visible: boolean) => {
        const colsss = ref.current?.getTableColumns()

        ref.current?.tableColumnVisibility(colsss.filter((item: any) => item.colId.toLowerCase().includes(keyword.toLowerCase())).map((col: any) => col.colId), visible)
    }


    const fetchHandler = async (query: any) => {
        const { DateFirst, DateSecond, ...rest } = query
        if (rest.TradingCode || rest.BourseCode) {
            const res1 = await fetchAsyncData({ ...rest, Date: DateFirst })
            const res2 = await fetchAsyncData({ ...rest, Date: DateSecond })

            let rowData: any[] = []
            const baseData = res1.data.result.pagedData.map((item: any) => {
                return (
                    {
                        faInsCode: item.faInsCode,
                        firstlastPrice: item.lastPrice,
                        firstclosingPrice: item.closingPrice,
                        firstshareCount: item.shareCount,
                        firstnetValuebyClosingPrice: item.netValueByClosingPrice,
                        firstnetValuebyLastPrice: item.netValueByLastPrice,
                    })
            }
            )
            rowData.push(...baseData)
            res2.data.result.pagedData.map((item: any) => {
                let index = rowData.findIndex((r: any) => r.faInsCode === item.faInsCode)
                if (index >= 0) {
                    rowData.splice(index, 1, {
                        ...rowData[index],
                        secondlastPrice: item.lastPrice,
                        secondclosingPrice: item.closingPrice,
                        secondshareCount: item.shareCount,
                        secondnetValuebyClosingPrice: item.netValueByClosingPrice,
                        secondnetValuebyLastPrice: item.netValueByLastPrice,
                    })
                } else {
                    rowData.push(
                        {
                            faInsCode: item.faInsCode,
                            secondlastPrice: item.lastPrice,
                            secondclosingPrice: item.closingPrice,
                            secondshareCount: item.shareCount,
                            secondnetValuebyClosingPrice: item.netValueByClosingPrice,
                            secondnetValuebyLastPrice: item.netValueByLastPrice,
                        })
                }
            }
            )

            setData({
                result: {
                    pagedData: rowData,
                    totalCount: res2.data.result.totalCount > res1.data.result.totalCount ? res2.data.result.totalCount : res1.data.result.totalCount
                }
            })
        } else {
            throwToast({ type: 'warning', value: ' لطفا یکی از ورودی های کد معاملاتی یا کد بورسی را پر کنید ' })
        }

    }

    return (
        <div className={'flex flex-col h-full flex-1 '}>
            <AccordionComponent>
                <SearchComponent onSubmit={fetchHandler} module={ModuleIdentifier.CSDI_PORTFO_comparison} />
            </AccordionComponent>
            <CSDIPortfoComparisonToolbar toggleAction={findColId} data={data} />
            <TableComponent
                data={data?.result?.pagedData}
                ref={ref}
                module={ModuleIdentifier.CSDI_PORTFO_comparison}
                columnDefStructure={columnDefStructure}
                rowId={['faInsCode']}
                pagination={true}
                totalCount={data?.result?.totalCount}
                fetcher={fetchHandler}
                query={query}
            />
        </div>
    )
}

export default withPermission(CSDIPortfo, ModuleIdentifier.CSDI_PORTFO_comparison)