import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
import { useRouter } from "next/router";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import DateCell from "components/common/table/date-cell";

function LivePortfo() {
    const router = useRouter()
    const columnDefStructure = [
        {
            field: 'tradingCode',
            headerName: 'کدمعاملاتی',
        },
        {
            field: 'nationalId',
            headerName: 'کد ملی ',
        },
        {
            field: 'bourseCode',
            headerName: 'کدبورسی ',
        },
        {
            field: 'customerTitle',
            headerName: 'عنوان مشتری',
        },
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        }, {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'faInsName',
            headerName: 'نام کامل نماد',
        },
        {
            field: 'currentShareCount',
            headerName: 'مانده سپرده گذاری',
        },
        {
            field: 'openBuyOrder',
            headerName: 'حجم سفارش های باز خرید',
        },
        {
            field: 'openSellOrder',
            headerName: 'حجم سفارش های باز فروش',
        },
        {
            field: 'intradayBuy',
            headerName: 'حجم خرید',
        },
        {
            field: 'intradaySell',
            headerName: 'حجم فروش',
        },
        {
            field: 'sellableShareCount',
            headerName: 'حجم قابل فروش',
        },
        {
            field: 'remainAssetCount',
            headerName: 'مانده دارایی',
        },
        {
            field: 'effectiveDate',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <DateCell date={rowData.data.effectiveDate} hideTime={true} />
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const { data, loading, query, fetchData } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/SearchIntradayPortfolio` })

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.PORTFO_live} />
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                loading={loading}
                columnDefStructure={columnDefStructure}
                rowId={['id']}
                onRowClicked={(e: any) => {
                    router.push(`/portfo/${e.data.customerId}&${e.data.instrumentId}`)
                }}
                pagination={true}
                totalCount={data?.result?.totalCount}
                fetcher={fetchData}
                query={query}
            />
        </div>
    )
}

export default withPermission(LivePortfo, ModuleIdentifier.PORTFO_live)
