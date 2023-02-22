import React, {createContext, useState} from "react";
import {getUsers} from "../../api/users.api";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import TableComponent from "../../components/common/table/table-component";
import SearchComponent from "../../components/common/components/Search.component";
import TablePagination from "../../components/common/table/TablePagination";
import UserDetailComponent from "../../components/users-management/users/UserDetailComponent";
import UsersToolbar from "../../components/users-management/users/UsersToolbar";
import ToggleButton from "../../components/users-management/users/ToggleButton";


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
    {title: 'UserId', name: "شناسه کاربری", type: 'input'},
    {title: 'UserName', name: "نام کاربری", type: 'input'},
    {title: 'Mobile', name: "تلفن همراه", type: 'input'},
    {title: 'Email', name: "تلفن همراه", type: 'input'},
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
            field: 'userId',
            headerName: 'شناسه حساب کاربری',
            cellRenderer: 'agGroupCellRenderer'
        },
        {
            field: 'username',
            headerName: 'نام کاربری',
        },
        {
            field: 'email',
            headerName: 'ایمیل',
        },
        {
            field: 'mobile',
            headerName: 'موبایل',
        },
        {
            field: 'firstName',
            headerName: 'نام',
        },
        {
            field: 'familyName',
            headerName: 'نام خانوادگی',
        },
        {
            field: 'uniqueId',
            headerName: 'شناسه یکتا',
        },
        {
            field: 'isActive',
            headerName: 'وضعیت',
            cellStyle:{textAlign:'center'},
            cellRendererSelector: () => {
                return {component: ToggleButton};
            },
        },
        {
            field: 'mobileConfirmed',
            headerName: 'موبایل تائید شده؟',
        },
        {
            field: 'twoFactorEnabled',
            headerName: 'ورود دوعاملی فعال؟',
        },
        {
            field: 'lockOutEnabled',
            headerName: 'قفل شده؟',
        },
        {
            field: 'accessFailedCount',
            headerName: 'تعداد ورود ناموفق',
        },
        {
            field: 'lockOutEnd',
            headerName: 'قفل تا تاریخ',
            // cellRendererSelector: () => {
            //     const ColourCellRenderer = (rowData: any) => {
            //         return (
            //             <span>{jalali(rowData.data.LockOutEnd).date}</span>
            //         )
            //         const moodDetails = {
            //             component: ColourCellRenderer,
            //         }
            //         return moodDetails;
            //     }
            // }
        },
        {
            field: 'birthDate',
            headerName: 'تاریخ تولد',
            // cellRendererSelector: () => {
            //     const ColourCellRenderer = (rowData: any) => {
            //         return (
            //             <span>{jalali(rowData.data.BirthDate).date}</span>
            //         )
            //         const moodDetails = {
            //             component: ColourCellRenderer,
            //         }
            //         return moodDetails;
            //     }
            // }
        }
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
                                rowId={['userId']}
                                rowSelection={'single'}
                                masterDetail={true}
                                detailComponent={UserDetailComponent}
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