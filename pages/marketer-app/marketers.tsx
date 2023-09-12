import React, { createContext } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
import useQuery from "../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import ToggleButton from "components/marketer-app/marketer-contract/toggle-button";
import MarketerToolbar from "components/marketer-app/marketer/marketer-toolbar";

export const MarketerContext = createContext({})
function MarketerContract() {

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
            field: 'Id',
            headerName: 'شناسه بازاریاب',
        },
        {
            field: 'Title',
            headerName: 'عنوان بازاریاب',
        },
        {
            field: 'TypeTitle',
            headerName: 'نوع بازاریاب',
        },
        {
            field: 'Mobile',
            headerName: 'موبایل',
        },
        {
            field: 'SubsidiaryTitle',
            headerName: 'عنوان شرکت',
        },
        {
            field: 'BranchTitle',
            headerName: 'عنوان شعبه',
        },
        {
            field: 'MarketerRefCode',
            headerName: 'کد بازاریاب',
        },
        {
            field: 'ReagentRefCode',
            headerName: 'کد معرف',
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
    }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer/search` })

    return (
        <MarketerContext.Provider value={{ fetchData, searchQuery, data }}>
            <div className={'flex flex-col h-full flex-1'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.MARKETER_APP_marketers} />
                </AccordionComponent>
                <MarketerToolbar />
                <TableComponent data={data?.result}
                    columnDefStructure={columnDefStructure}
                    rowId={['Id']}
                />
            </div>
        </MarketerContext.Provider>
    )
}

export default withPermission(MarketerContract, ModuleIdentifier.MARKETER_APP_marketers)