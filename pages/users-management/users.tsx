import React, {createContext, useState} from "react";
import dynamic from "next/dynamic";
import {getUsers} from "../../api/users-management.api";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const TablePagination = dynamic(() => import('../../components/common/table/TablePagination'))
const UsersToolbar = dynamic(() => import('../../components/users-management/users/UsersToolbar'))
const ToggleButton = dynamic(() => import('../../components/users-management/users/ToggleButton'))
const UserDetailComponent = dynamic(() => import('../../components/users-management/users/UserDetailComponent'))


type initialType = { PageNumber: number, PageSize: number, UserId: string, UserName: string, Mobile: string, Email: string, FirstName: string, FamilyName: string, RoleId: string, IsActive: any, date: string }
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    UserId: '',
    UserName: '',
    Mobile: '',
    Email: '',
    FirstName: '',
    FamilyName: '',
    RoleId: '',
    IsActive: null,
    date: '',
}
const usersListOfFilters = [
    {title: 'PageNumber', name: 'شماره صفحه', type: null},
    {title: 'PageSize', name: 'تعداد', type: null},
    // {title: 'UserId', name: "شناسه کاربری", type: 'input'},
    {title: 'UserName', name: "نام کاربری", type: 'input'},
    {title: 'PhoneNumber', name: "تلفن همراه", type: 'input'},
    {title: 'Email', name: "ایمیل", type: 'input'},
    {title: 'FirstName', name: "نام", type: 'input'},
    {title: 'FamilyName', name: "نام خانوادگی", type: 'input'},
    {title: 'RoleId', name: "آیدی نقش کاربر", type: 'input'},
    {title: 'IsActive', name: "وضعیت", type: 'selectInput'},
    {title: 'date', name: "تاریخ شروع و پایان", type: 'date'},
]
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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [selectedRows, setSelectedRows] = useState<any>([])

    const onSubmit = async (e: any, query: any) => {
        e?.preventDefault()
        await getUsers(query)
            .then((res: any) => {
                setData(res?.result?.pagedData);
                setTotalCount(res?.result?.totalCount)
            })
            .catch(() => setData([]))
    };

    return (
        <UsersContext.Provider value={{onSubmit,query,selectedRows}}>
            <div className={'flex flex-col h-full grow'}>
                <AccordionComponent>
                    <SearchComponent query={query}
                                     setQuery={setQuery}
                                     listOfFilters={usersListOfFilters}
                                     initialValue={initialValue}
                                     onSubmit={onSubmit}
                    />
                </AccordionComponent>
                <UsersToolbar/>
                <TableComponent data={data}
                                columnDefStructure={columnDefStructure}
                                rowId={['id']}
                                rowSelection={'single'}
                                masterDetail={true}
                                detailComponent={UserDetailComponent}
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
        </UsersContext.Provider>
    )
}