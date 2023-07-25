import React from 'react';
import dynamic from "next/dynamic";
const AccordionComponent = dynamic(() => import('../../common/components/AccordionComponent'))
const TableComponent = dynamic(() => import('../../common/table/table-component'))
const SearchComponent = dynamic(() => import('../../common/components/Search.component'))
import useQuery from "../../../hooks/useQuery";
import { COMMISSION_BASE_URL } from "../../../api/constants";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";

export default function CategoryResultTableSection() {
    const columnDefStructure = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            headerCheckboxSelectionFilteredOnly: true,
            resizable: false,
            minWidth: 40,
            maxWidth: 40,
        },
        {
            field: 'id',
            headerName: 'شناسه',
            flex: 0,
            width: 90,
            minWidth: 90
        },
        {
            field: 'marketCode',
            headerName: 'کد بازار',
        },
        {
            field: 'marketTitle',
            headerName: 'بازار',
        },
        {
            field: 'offerTypeCode',
            headerName: 'کد نوع عرضه',
            flex: 0,
        },
        {
            field: 'offerTypeTitle',
            headerName: 'نوع عرضه',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'sideCode',
            headerName: 'کد سمت سفارش',
            flex: 0,
        }, {
            field: 'sideTitle',
            headerName: 'سمت سفارش',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'settlementDelayCode',
            headerName: 'کد تاخیر در تسویه',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'settlementDelayTitle',
            headerName: 'تاخیر در تسویه',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerTypeCode',
            headerName: 'کد نوع مشتری',
            flex: 0,
            width: 150,
            minWidth: 150,
        },
        {
            field: 'customerTypeTitle',
            headerName: 'نوع مشتری',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerCounterSideCode',
            headerName: 'کد نوع طرف مقابل',
            flex: 0,
            width: 120,
            minWidth: 120
        },
        {
            field: 'customerCounterSideTitle',
            headerName: 'نوع طرف مقابل',
            flex: 0,
            width: 120,
            minWidth: 120
        }
    ]
    const { data, loading, fetchData } = useQuery({ url: `${COMMISSION_BASE_URL}/api/CommissionCategory/Search` })

    return (
        <div className={'relative flex flex-col grow overflow-hidden'}>
            <AccordionComponent>
                <SearchComponent module={ModuleIdentifier.COMMISSION_MANAGEMENT_category} loading={loading} onSubmit={fetchData} />
            </AccordionComponent>
            <TableComponent data={data?.result}
                module={ModuleIdentifier.COMMISSION_MANAGEMENT_category}
                loading={loading}
                columnDefStructure={columnDefStructure}
                rowId={['id']}
            />
        </div>
    );
}
