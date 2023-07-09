import React, {createContext, useState} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'));
const TableComponent = dynamic(() => import('../../components/common/table/table-component'));
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'));
const UsersToolbar = dynamic(() => import('../../components/users-management/users/UsersToolbar'));
const ToggleButton = dynamic(() => import('../../components/users-management/users/ToggleButton'));
const UserDetailComponent = dynamic(() => import('../../components/users-management/users/UserDetailComponent'));
import useQuery from '../../hooks/useQuery';
import {IDP} from "../../api/constants";
import {ModuleIdentifier} from "../../components/common/functions/Module-Identifier";

export const UsersContext = createContext({})
export default function Users() {
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
                return {component: ToggleButton};
            },
        },
        {
            field: 'twoFactorEnabled',
            headerName: 'ورود دوعاملی',
        },
        {
            field: 'lockOutEnabled',
            headerName: 'قفل شده؟',
        },
        // {
        //     field: 'accessFailedCount',
        //     headerName: 'تعداد ورود ناموفق',
        // },
        // {
        //     field: 'lockOutEnd',
        //     headerName: 'قفل تا تاریخ',
        //     // cellRendererSelector: () => {
        //     //     const ColourCellRenderer = (rowData: any) => {
        //     //         return (
        //     //             <span>{jalali(rowData.data.LockOutEnd).date}</span>
        //     //         )
        //     //         const moodDetails = {
        //     //             component: ColourCellRenderer,
        //     //         }
        //     //         return moodDetails;
        //     //     }
        //     // }
        // },
        // {
        //     field: 'birthDate',
        //     headerName: 'تاریخ تولد',
        //     // cellRendererSelector: () => {
        //     //     const ColourCellRenderer = (rowData: any) => {
        //     //         return (
        //     //             <span>{jalali(rowData.data.BirthDate).date}</span>
        //     //         )
        //     //         const moodDetails = {
        //     //             component: ColourCellRenderer,
        //     //         }
        //     //         return moodDetails;
        //     //     }
        //     // }
        // }
    ]
    const [selectedRows, setSelectedRows] = useState<any>([])
    const {data,query,fetchData}:any = useQuery({url:`${IDP}/api/users/SearchUserAccount`,notifResults:true})

    return (
        <UsersContext.Provider value={{fetchData,query,selectedRows}}>
            <div className={'flex flex-col h-full grow'}>
                <AccordionComponent>
                    <SearchComponent onSubmit={fetchData} module={ModuleIdentifier.USER_MANAGEMENT_users}/>
                </AccordionComponent>
                <UsersToolbar/>
                <TableComponent data={data?.result?.pagedData}
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