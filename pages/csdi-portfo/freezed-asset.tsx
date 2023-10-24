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
import { personTypeEnums } from "constants/Enums";

function FreezedAsset() {
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
        },
        {
            field: 'personType',
            headerName: 'نوع مشتری',
            valueFormatter: (rowData: any) => {
                return personTypeEnums.find((item: any) => item.id === rowData.data.personType)?.title
            }
        },
        {
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
            field: 'isFreezed',
            headerName: 'وضعیت انجماد',
            valueFormatter: (rowData: any) => {
                return rowData.data.isFreezed ? 'انجماد' : 'آزاد'
            }
        },
        {
            field: 'effectiveDate',
            headerName: 'تاریخ و زمان تغییر',
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
    const { data, loading, query, fetchData } = useQuery({ url: `${ADMIN_GATEWAY}/api/request/SearchCustomerFreezedAsset` })

    return (
        <div className={'flex flex-col h-full flex-1 '}>
            <AccordionComponent>
                <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.CSDI_PORTFO_freezed_asset} />
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                module={ModuleIdentifier.CSDI_PORTFO_freezed_asset}
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

export default withPermission(FreezedAsset, ModuleIdentifier.CSDI_PORTFO_freezed_asset)