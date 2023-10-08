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
import { CopyButton } from "components/common/components/copy-button";

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
            field: 'UniqueId',
            headerName: 'کد ملی بازاریاب',
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
            field: 'ReagentRefLink',
            headerName: 'لینک معرف',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <CopyButton condition={rowData?.data?.ReagentRefCode} id={rowData?.data?.MarketerID} entity={'reagentUrl'} inputModule={ModuleIdentifier.MARKETER_APP_marketers} /> }
            },
        },
        {
            field: 'MarketerRefLink',
            headerName: 'لینک بازاریاب',
            data: 'marketerUrl',
            cellRendererSelector: () => {
                return { component: (rowData: any) => <CopyButton condition={rowData?.data?.MarketerRefCode} id={rowData?.data?.MarketerID} entity={'marketerUrl'} inputModule={ModuleIdentifier.MARKETER_APP_marketers} /> }
            },
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
                <TableComponent data={data?.result.pagedData}
                    module={ModuleIdentifier.MARKETER_APP_marketers}
                    columnDefStructure={columnDefStructure}
                    rowId={['MarketerID']}
                    pagination={true}
                    totalCount={data?.result?.totalCount}
                    fetcher={fetchData}
                    query={searchQuery}
                />
            </div>
        </MarketerContext.Provider>
    )
}

export default withPermission(MarketerContract, ModuleIdentifier.MARKETER_APP_marketers)