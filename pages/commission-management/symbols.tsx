import React, { useMemo, useState } from "react";
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
import { formatNumber } from "components/common/functions/common-funcions";

function SymbolsCommission() {
    const [selectedRows, setSelectedRows] = useState<any>([])
    const [activeTab, setActiveTab] = useState<string>('Abstract')
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
            cellRenderer: 'agGroupCellRenderer'
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
        fetchData, query, loading
    }: any = useQuery({ url: `${ADMIN_GATEWAY}/api/request/InstrumentCommissionDetail/${activeTab === 'Abstract' ? 'GetAbstractCommissionCoefficient' : 'GetFullCommissionCoefficient'}` })

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                // getRowId:(params:any)=>params.data.orderId,
                columnDefs: [
                    {
                        field: 'category',
                        headerName: '',
                    },
                    {
                        field: 'broker',
                        headerName: 'کارگزاری',
                    },
                    {
                        field: 'access',
                        headerName: 'حق دسترسی',
                    },
                    {
                        field: 'brokerCmdFund',
                        headerName: 'سهم صندوق توسعه',
                    },
                    {
                        field: 'bourse',
                        headerName: 'بورس',
                    },
                    {
                        field: 'seoControl',
                        headerName: 'سازمان',
                    },
                    {
                        field: 'csd',
                        headerName: 'شرکت سپرده گذاری',
                    },
                    {
                        field: 'tmc',
                        headerName: 'مدیرت فناوری',
                    },
                    {
                        field: 'rayan',
                        headerName: 'رایان بورس',
                    },
                    {
                        field: 'tax',
                        headerName: 'مالیات',
                    },
                    {
                        field: 'addedValue',
                        headerName: 'ارزش افزوده',
                    },
                    {
                        field: 'charge',
                        headerName: 'عوارض',
                    },
                    {
                        field: 'inventory',
                        headerName: 'انبارداری',
                    },
                    {
                        field: 'inventoryAddedValueTax',
                        headerName: 'ارزش افزوده انبارداری',
                    },
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                params.successCallback([
                    {
                        category: 'ضریب کارمزد',
                        broker: params.data.brokerCommissionCoeff,
                        access: params.data.accessCommissionCoeff,
                        brokerCmdFund: params.data.brokerCmdFundCoeff,
                        bourse: params.data.brokerCmdFundCoeff,
                        seoControl: params.data.seoControlCommissionCoeff,
                        csd: params.data.csdCommissionCoeff,
                        tmc: params.data.tmcCommissionCoeff,
                        rayan: params.data.rayanCommissionCoeff,
                        tax: params.data.taxCoeff,
                        addedValue: params.data.addedValueTax,
                        charge: params.data.charge,
                        inventory: params.data.inventoryCoeff,
                        inventoryAddedValueTax: params.data.inventoryAddedValueTaxCoeff,
                    },
                    {
                        category: 'مقدار کمینه',
                        broker: params.data.minBrokerCommissionValue,
                    },
                    {
                        category: 'مقدار بیشینه',
                        broker: params.data.maxBrokerCommissionValue,
                        access: params.data.maxAccessCommissionValue,
                        brokerCmdFund: params.data.maxBrokerCmdFundValue,
                        bourse: params.data.maxBourseCommissionValue,
                        seoControl: params.data.maxSeoControlCommissionValue,
                        csd: params.data.maxCsdCommissionValue,
                        tmc: params.data.maxTmcCommissionValue,
                        rayan: params.data.maxRayanCommissionValue,
                        tax: params.data.maxTaxValue,
                        addedValue: params.data.maxAddedVlueTax,
                        inventory: params.data.maxInventoryValue,
                        inventoryAddedValueTax: params.data.maxInventoryAddedValueTax,
                    }
                ]);
            },
        };
    }, []);

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <div className="flex">
                <button onClick={() => { setActiveTab('Abstract'); setData({ pagedData: [], totalCount: 0 }) }} className={`px-10 py-2 rounded-t ${activeTab === 'Abstract' ? 'bg-border font-bold' : 'text-gray-400'}`}>خلاصه کارمزد نماد</button>
                <button onClick={() => { setActiveTab('Full'); setData({ pagedData: [], totalCount: 0 }) }} className={`px-10 py-2 rounded-t ${activeTab === 'Full' ? 'bg-border font-bold' : 'text-gray-400'}`}>جزیئات کارمزد</button>
            </div>
            <AccordionComponent className={'rounded-tr-none'}>
                <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.COMMISSION_MANAGEMENT_symbols} />
            </AccordionComponent>
            <TableComponent data={data?.pagedData}
                columnDefStructure={tabItems[activeTab]}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                rowId={['id']}
                detailCellRendererParams={detailCellRendererParams}
                masterDetail={true}
                pagination={true}
                totalCount={data?.totalCount}
                fetcher={fetchData}
                query={query}
            />
        </div>
    )
}

export default withPermission(SymbolsCommission, ModuleIdentifier.COMMISSION_MANAGEMENT_symbols)