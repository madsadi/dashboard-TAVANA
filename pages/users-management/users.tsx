import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/search'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'), {
    loading: () => <p>در حال بارگزاری...</p>,
});
const AccordionComponent = dynamic(() => import('../../components/common/components/accordion'));
const UsersToolbar = dynamic(() => import('../../components/users-management/users/users-toolbar'));
const ToggleButton = dynamic(() => import('../../components/users-management/users/toggle-button'));
const UserDetailComponent = dynamic(() => import('../../components/users-management/users/user-detail'));
import useQuery from '../../hooks/useQuery';
import { IDP } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import DateCell from "components/common/table/date-cell";
import { withPermission } from "components/common/layout/with-permission";

export const UsersContext = createContext({})
function Users(){

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
            field: 'username',
            headerName: 'نام کاربری',
            cellRenderer: 'agGroupCellRenderer'
        },
        {
            field: 'phoneNumber',
            headerName: 'موبایل',
        },
        {
            field: 'firstName',
            headerName: 'نام',
        },
        {
            field: 'lastName',
            headerName: 'نام خانوادگی',
        },
        {
            field: 'nationalId',
            headerName: 'کد ملی',
        },
        {
            field: 'isActive',
            headerName: 'وضعیت',
            // cellStyle:{textAlign:'center'},
            cellRendererSelector: () => {
                return { component: ToggleButton };
            },
        },
        {
            field: 'twoFactorEnabled',
            headerName: 'ورود دوعاملی',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span>{rowData.data.twoFactorEnabled ? 'فعال' : 'غیر فعال'}</span>
                    )
                }
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            }
        },
        {
            field: 'lockOutEnd',
            headerName: 'قفل تا تاریخ',
            cellRendererSelector: () => {
                return {
                    component: (rowData: any) => <DateCell date={rowData.data.LockOutEnd} />,
                };
            }
        },
    ]
    const [selectedRows, setSelectedRows] = useState<any>([])
    const { data, query, fetchData, loading }: any = useQuery({ url: `${IDP}/api/users/SearchUserAccount` })

    return (
        <UsersContext.Provider value={{ fetchData, query, selectedRows }}>
            <div className={'flex flex-col h-full grow'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} loading={loading} module={ModuleIdentifier.USER_MANAGEMENT_users} />
                </AccordionComponent>
                <UsersToolbar />
                <TableComponent data={data?.result}
                    module={ModuleIdentifier.USER_MANAGEMENT_users}
                    columnDefStructure={columnDefStructure}
                    rowId={['id']}
                    rowSelection={'single'}
                    masterDetail={true}
                    detailComponent={UserDetailComponent}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    suppressRowClickSelection={true}
                    pagination={true}
                    totalCount={data?.result?.totalCount}
                    fetcher={fetchData}
                    query={query}
                />
            </div>
        </UsersContext.Provider>
    )
}

export default withPermission(Users,ModuleIdentifier.USER_MANAGEMENT_users)