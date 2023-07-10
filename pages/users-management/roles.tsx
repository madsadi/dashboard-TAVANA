import React, {createContext, useState} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
const RolesToolbar = dynamic(() => import('../../components/users-management/roles/RolesToolbar'));
const RoleToggleButton = dynamic(() => import('../../components/users-management/roles/RoleToggleButton'));
import RoleDetailComponent from "../../components/users-management/roles/RoleDetailComponent";
import useQuery from "../../hooks/useQuery";
import {IDP} from "../../api/constants";
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";

export const RolesContext = createContext({})
export default function Roles() {
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
            field: 'id',
            headerName: 'شناسه نقش',
            cellRenderer: 'agGroupCellRenderer'
        },
        {
            field: 'name',
            headerName: 'نقش',
        },
        {
            field: 'isActive',
            headerName: 'وضعیت',
            cellRendererSelector: () => {
                return {component: RoleToggleButton};
            },
        }
    ]

    const {data, query, fetchData,loading}: any = useQuery({url: `${IDP}/api/roles/search`})
    const [selectedRows, setSelectedRows] = useState<any>([])

    return (
        <RolesContext.Provider value={{fetchData, query, selectedRows, setSelectedRows}}>
            <div className={'flex flex-col h-full grow'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.USER_MANAGEMENT_roles}/>
                </AccordionComponent>
                <RolesToolbar/>
                <TableComponent data={data?.result?.pagedData}
                                columnDefStructure={columnDefStructure}
                                rowId={['id']}
                                rowSelection={'single'}
                                masterDetail={true}
                                detailComponent={RoleDetailComponent}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                suppressRowClickSelection={true}
                                pagination={true}
                                totalCount={data?.result?.totalCount}
                                fetcher={fetchData}
                                query={query}
                />
            </div>
        </RolesContext.Provider>
    )
}