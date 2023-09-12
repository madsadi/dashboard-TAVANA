import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
import useQuery from "../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import MarketerContractToolbar from "components/marketer-app/marketer-contract/toolbar/marketer-contract-toolbar";
import ToggleButton from "components/marketer-app/marketer-contract/toggle-button";

export const MarketerContractContext = createContext({})
function MarketerContract() {
    const [selectedRows, setSelectedRows] = useState<any>([])

    const columnDefStructure: any = [
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
            field: 'ContractID',
            headerName: 'شناسه قرارداد',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'MarketerID',
            headerName: 'شناسه بازاریاب',
            cellRenderer: 'agGroupCellRenderer',
        },
        {
            field: 'Title',
            headerName: 'عنوان بازاریاب',
        },
        {
            field: 'CalculationBaseType',
            headerName: 'کد ملی',
        },
        {
            field: 'CoefficientBaseType',
            headerName: 'کد ملی',
        },
        {
            field: 'ContractType',
            headerName: 'نوع قرارداد',
        },
        {
            field: 'Description',
            headerName: 'توضیحات',
        },
        {
            field: 'IsDeleted',
            headerName: 'حذف شده؟',
        },
        {
            field: 'IsActive',
            headerName: 'وضعیت',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <ToggleButton data={{ isActive: rowData.data.IsActive, id: rowData.data.id }} /> };
            },
        },
    ]
    const {
        data, fetchData, query: searchQuery, loading
    }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer-contract/search` })

    return (
        <MarketerContractContext.Provider value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}>
            <div className={'flex flex-col h-full flex-1'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.MARKETER_APP_marketerContract} />
                </AccordionComponent>
                <MarketerContractToolbar />
                <TableComponent data={data?.result?.pagedData}
                    columnDefStructure={columnDefStructure}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    rowSelection={'multiple'}
                    rowId={['ContractID']}
                />
            </div>
        </MarketerContractContext.Provider>
    )
}

export default withPermission(MarketerContract, ModuleIdentifier.MARKETER_APP_marketerContract)