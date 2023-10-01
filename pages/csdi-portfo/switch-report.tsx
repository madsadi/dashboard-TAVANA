import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import DateCell from "components/common/table/date-cell";
import { withPermission } from "components/common/layout/with-permission";
import { changeTypeEnums, customerTypeEnums } from "constants/Enums";

function SwitchReport() {
    const columnDefStructure = [
        {
            field: 'tradingCode',
            headerName: 'کد معاملاتی',
        },
        {
            field: 'nationalId',
            headerName: 'کد ملی',
        },
        {
            field: 'customerTitle',
            headerName: 'عنوان مشتری',
        },
        {
            field: 'bourseCode',
            headerName: 'کد بورسی',
        }, {
            field: 'instrumentId',
            headerName: 'شناسه نماد',
        },
        {
            field: 'faInsCode',
            headerName: 'نماد ',
        },
        {
            field: 'faInsName',
            headerName: 'نام کامل نماد',
        },
        {
            field: 'customerType',
            headerName: 'حقیقی/حقوقی ',
            valueFormatter: (rowData: any) => {
                return (
                    customerTypeEnums.find((item) => item.id === rowData.data.customerType)?.title
                )
            },
        },
        {
            field: 'shareChange',
            headerName: 'تعداد تغییر ',
        },
        {
            field: 'shareCount',
            headerName: 'تعداد مانده ',
        },
        {
            field: 'changeTypeCode',
            headerName: 'کد نوع تغییر',
        },
        {
            field: 'changeType',
            headerName: 'نوع تغییر',
            cellClassRules: {
                // out of range style
                'text-emerald-500': (rowData: any) => rowData.data.changeType === 3 || rowData.data.changeType === 1,
                'text-rose-500': (rowData: any) => rowData.data.changeType === 4 || rowData.data.changeType === 2,
            },
            valueFormatter: (rowData: any) => {
                return (
                    changeTypeEnums.find((item) => item.id === rowData.data.changeType)?.title
                )
            },
        },
        {
            field: 'effectiveDate',
            headerName: 'تاریخ و زمان تغییر',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <DateCell date={rowData.data.effectiveDate} />
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        }
    ]
    const { data, loading, query, fetchData } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/GetCustomersAssetChangesByTrade` })

    return (
        <div className={'flex flex-col h-full flex-1 '}>
            <AccordionComponent>
                <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.CSDI_PORTFO_switch_report} />
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                module={ModuleIdentifier.CSDI_PORTFO_switch_report}
                loading={loading}
                columnDefStructure={columnDefStructure}
                rowId={['id']}
                pagination={true}
                totalCount={data?.result?.totalCount}
                fetcher={fetchData}
                query={query}
            />
        </div>
    )
}

export default withPermission(SwitchReport, ModuleIdentifier.CSDI_PORTFO_switch_report)