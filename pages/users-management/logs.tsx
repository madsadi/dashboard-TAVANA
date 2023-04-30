import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
import { jalali} from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import {USERS} from "../../api/constants";

type initialType = { PageNumber: number, PageSize: number, UserId: string, NationalId: string, Name: string, StartDate: string, EndDate: string}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    // StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    StartDate: ``,
    EndDate: ``,
    UserId: '',
    NationalId: '',
    Name: '',
}
const usersListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'UserId', name: "شناسه کاربر", type: 'input' },
    { title: 'NationalId', name: "کد ملی کاربر", type: 'input'},
    { title: 'Name', name: "نام کاربر", type: 'input' },
    { title: 'date', name: "تاریخ شروع و پایان",type: 'date'},
]

export default function Users() {
    const columnDefStructure: any = [
        {
            field: 'userId',
            headerName: 'شناسه کاربر',
        },
        {
            field: 'name',
            headerName: 'نام کاربر',
        },
        {
            field: 'typeTitle',
            headerName: 'نوع',
        },
        {
            field: 'date',
            headerName: 'تاریخ',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <>
                            <span>{jalali(rowData.data.date).date}</span>
                            <span className={'ml-2'}>{jalali(rowData.data.date).time}</span>
                        </>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'clientId',
            headerName: 'نرم افزار'
        },
        {
            field: 'succeed',
            headerName: 'وضعیت'
        },
        {
            field: 'ip',
        },
        {
            field: 'userAgent',
        },
        {
            field: 'browser',
            headerName: 'مرورگر'
        },
        {
            field: 'os',
            headerName: 'سیستم عامل'
        },
        {
            field: 'isMobile',
            headerName: 'از طریق موبایل',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span>{rowData.data.isMobile ? 'بله' : 'خیر'}</span>
                    )
                };
                const moodDetails = {
                    component: ColourCellRenderer,
                }
                return moodDetails;
            },
        },
        {
            field: 'errorMessage',
            headerName: 'خطا'
        }
    ]

    const {data,query,fetchData}:any = useQuery({url:`${USERS}/users/SearchUserActivityLogs`})

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent listOfFilters={usersListOfFilters}
                                 initialValue={initialValue}
                                 onSubmit={fetchData}
                />
            </AccordionComponent>
            <TableComponent data={data?.result?.pagedData}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}
                            pagination={true}
                            totalCount={data?.result?.totalCount}
                            fetcher={fetchData}
                            query={query}
            />
        </div>
    )
}