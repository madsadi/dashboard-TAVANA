import React, {createContext, useMemo, useState} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const RolesToolbar = dynamic(() => import('../../components/users-management/roles/RolesToolbar'))
const TablePagination = dynamic(() => import('../../components/common/table/TablePagination'))
const RoleToggleButton = dynamic(() => import('../../components/users-management/roles/RoleToggleButton'))
import {getRolePermission, getRoles} from "../../api/roles.api";
import {formatNumber} from "../../components/common/functions/common-funcions";


type initialType = { PageNumber: number, PageSize: number, Name: string, IsActive: any }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    IsActive: null,
    Name: '',
}
const rolesListOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    {title: 'Name', name: "عنوان", type: 'input'},
    {title: 'IsActive', name: "وضعیت", type: 'selectInput'},
]
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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [selectedRows, setSelectedRows] = useState<any>([])

    const onSubmit = async (e: any, query: any) => {
        e?.preventDefault()
        await getRoles(query)
            .then((res: any) => {
                setData(res?.result?.pagedData);
                setTotalCount(res?.result?.totalCount)
            })
            .catch(() => setData([]))
    };

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                enableRtl: true,
                suppressRowTransform: true,
                columnDefs: [
                    { field: 'id', headerName: 'شناسه' },
                    { field: 'serviceTitle', headerName: 'عنوان سرویس'},
                    { field: 'moduleTitle', headerName: 'عنوان ماژول'},
                    {field: 'actionTitle', headerName: 'عنوان عملیات'},
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    flex: 1,
                    valueFormatter: formatNumber
                },
            },
            getDetailRowData: async (params: any) => {
                await getRolePermission(params.data.id)
                    .then((res)=>params.successCallback(res?.result))
                    .catch(()=>params.successCallback([]))
            },
        };
    }, []);

    return (
        <RolesContext.Provider value={{onSubmit,query,selectedRows,setSelectedRows}}>
            <div className={'flex flex-col h-full grow'}>
                <AccordionComponent>
                    <SearchComponent query={query}
                                     setQuery={setQuery}
                                     listOfFilters={rolesListOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={onSubmit}
                    />
                </AccordionComponent>
                <RolesToolbar/>
                <TableComponent data={data}
                                columnDefStructure={columnDefStructure}
                                rowId={['id']}
                                rowSelection={'single'}
                                masterDetail={true}
                                detailCellRendererParams={detailCellRendererParams}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                suppressRowClickSelection={true}
                />
                <TablePagination onSubmit={onSubmit}
                                 query={query}
                                 setQuery={setQuery}
                                 totalCount={totalCount}
                />
            </div>
        </RolesContext.Provider>
    )
}