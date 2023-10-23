import React, { useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import DateCell from "components/common/table/date-cell";
import { CustomerOriginEnums, GetOfferTypeEnums, sides } from "constants/Enums";
import { throwToast } from "components/common/functions/notification";

function SymbolsCommission() {
    const [selectedRows, setSelectedRows] = useState<any>([])
    const [activeTab, setActiveTab] = useState<string>('Abstract')
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<{ pagedData: any[], totalCount: number }>({ pagedData: [], totalCount: 0 })

    const abstractColumnDefStructure: any = [
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'offerTypeCode',
            headerName: 'نوع عرضه',
            valueFormatter: (rowData: any) => {
                return GetOfferTypeEnums.find((item) => item.id === rowData.data.offerTypeCode)?.title
            }
        },
        {
            field: 'sideCode',
            headerName: 'سمت سفارش',
            valueFormatter: (rowData: any) => {
                return sides.find((item) => item.id === rowData.data.sideCode)?.title
            }
        },
        {
            field: 'totalCommissionCoeff',
            headerName: 'ضریب مجموع کارمزد',
        },
        {
            field: 'netTradeCoeff',
            headerName: 'ضریب ارزش تمام شده',
        },
        {
            field: 'breakEvenPriceCoeff',
            headerName: 'ضریب قیمت سربسر',
        },
        {
            field: 'beginningEffectingDate',
            headerName: 'تاریخ ابتدا',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <DateCell date={rowData.data.beginningEffectingDate} hideTime /> };
            },
        },
        {
            field: 'endEffectingDate',
            headerName: 'تاریخ انتها',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <DateCell date={rowData.data.endEffectingDate} hideTime /> };
            },
        },
        {
            field: 'valid',
            headerName: 'وضعیت نماد',
            valueFormatter: (rowData: any) => {
                return rowData.data.valid ? 'فعال' : 'غیر فعال'
            }
        },
        {
            field: 'deleted',
            headerName: 'حذف شده؟',
            valueFormatter: (rowData: any) => {
                return rowData.data.deleted ? 'حذف شده' : 'حذف نشده'
            }
        },
    ]
    const fullColumnDefStructure: any = [
        {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'faInsCode',
            headerName: 'نماد',
        },
        {
            field: 'offerTypeCode',
            headerName: 'نوع عرضه',
            valueFormatter: (rowData: any) => {
                return GetOfferTypeEnums.find((item) => item.id === rowData.data.offerTypeCode)?.title
            }
        },
        {
            field: 'sideCode',
            headerName: 'سمت سفارش',
            valueFormatter: (rowData: any) => {
                return sides.find((item) => item.id === rowData.data.sideCode)?.title
            }
        },
        {
            field: 'settlementDelayCode',
            headerName: 'تاخیر در تسویه ',
        },
        {
            field: 'customerTypeCode',
            headerName: 'نوع مشتری',
            valueFormatter: (rowData: any) => {
                return CustomerOriginEnums.find((item) => item.id === rowData.data.customerTypeCode)?.title
            }
        },
        {
            field: 'customerCounterSideCode',
            headerName: 'مشتری طرف مقابل',
            valueFormatter: (rowData: any) => {
                return CustomerOriginEnums.find((item) => item.id === rowData.data.customerCounterSideCode)?.title
            }
        },
        {
            field: 'netBrokerCommissionCoeff',
            headerName: 'ضریب کارمزد نقد کارگزاری',
        },
        {
            field: 'totalCommissionCoeff',
            headerName: 'ضریب مجموع کارمزد',
        },
        {
            field: 'netTradeCoeff',
            headerName: 'ضریب ارزش تمام شده',
        },
        {
            field: 'breakEvenPriceCoeff',
            headerName: 'ضریب قیمت سربسر',
        },
        {
            field: 'beginningEffectingDate',
            headerName: 'تاریخ ابتدا',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <DateCell date={rowData.data.beginningEffectingDate} hideTime /> };
            },
        },
        {
            field: 'endEffectingDate',
            headerName: 'تاریخ انتها',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <DateCell date={rowData.data.endEffectingDate} hideTime /> };
            },
        },
        {
            field: 'valid',
            headerName: 'وضعیت نماد',
            valueFormatter: (rowData: any) => {
                return rowData.data.valid ? 'فعال' : 'غیر فعال'
            }
        },
        {
            field: 'deleted',
            headerName: 'حذف شده؟',
            valueFormatter: (rowData: any) => {
                return rowData.data.deleted ? 'حذف شده' : 'حذف نشده'
            }
        },
    ]
    const tabItems: any = {
        'Abstract': abstractColumnDefStructure,
        'Full': fullColumnDefStructure
    }
    const {
        fetchAsyncData, query
    }: any = useQuery({ url: `${ADMIN_GATEWAY}/api/request/InstrumentCommissionDetail/${activeTab === 'Abstract' ? 'GetAbstractCommissionCoefficient' : 'GetFullCommissionCoefficient'}` })

    const fetchHandler = async (query: any) => {
        setLoading(true)
        await fetchAsyncData(query)
            .then((res: any) => setData(res?.data?.result))
            .catch((err: any) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }

    console.log(data);

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <div className="flex">
                <button onClick={() => { setActiveTab('Abstract'); setData({ pagedData: [], totalCount: 0 }) }} className={`px-10 py-2 rounded-t ${activeTab === 'Abstract' ? 'bg-border font-bold' : 'text-gray-400'}`}>خلاصه کارمزد نماد</button>
                <button onClick={() => { setActiveTab('Full'); setData({ pagedData: [], totalCount: 0 }) }} className={`px-10 py-2 rounded-t ${activeTab === 'Full' ? 'bg-border font-bold' : 'text-gray-400'}`}>جزیئات کارمزد</button>
            </div>
            <AccordionComponent className={'rounded-tr-none'}>
                <SearchComponent onSubmit={fetchHandler} loading={loading} module={ModuleIdentifier.COMMISSION_MANAGEMENT_symbols} />
            </AccordionComponent>
            <TableComponent data={data?.pagedData}
                columnDefStructure={tabItems[activeTab]}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                rowId={['id']}
                pagination={true}
                totalCount={data?.totalCount}
                fetcher={fetchHandler}
                query={query}
            />
        </div>
    )
}

export default withPermission(SymbolsCommission, ModuleIdentifier.COMMISSION_MANAGEMENT_symbols)