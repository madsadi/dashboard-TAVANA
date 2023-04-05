import React, { useState} from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import('../../components/common/components/Search.component'))
const TableComponent = dynamic(() => import('../../components/common/table/table-component'))
const AccordionComponent = dynamic(() => import('../../components/common/components/AccordionComponent'))
const TablePagination = dynamic(() => import('../../components/common/table/TablePagination'))
const CustomDetailComponent = dynamic(() => import('../../components/online-orders/orders/customDetailComponent'))
import { jalali} from "../../components/common/functions/common-funcions";
import {getUsersLogs} from "../../api/users-management.api";

type initialType = { PageNumber: number, PageSize: number, userId: string, nationalId: string, phoneNumber: string, StartDate: string, EndDate: string}
const initialValue = {
    PageNumber: 1,
    PageSize: 20,
    // StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
    StartDate: ``,
    EndDate: ``,
    userId: '',
    nationalId: '',
    phoneNumber: '',
}
const usersListOfFilters = [
    { title: 'PageNumber', name: 'شماره صفحه', type: null },
    { title: 'PageSize', name: 'تعداد', type: null },
    { title: 'firstName', name: "شناسه کاربر", type: 'input' },
    { title: 'lastName', name: "کد ملی کاربر", type: 'input'},
    { title: 'phoneNumber', name: "تلفن همراه", type: 'input' },
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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([]);
    const [totalCount, setTotal] = useState<any>(null);

    const onSubmit = async (e:any,query: any) => {
        e?.preventDefault()
        await getUsersLogs(query)
            .then((res: any) => {
                setData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
            .catch(() =>
                setData([]))
    };

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <SearchComponent query={query}
                                 setQuery={setQuery}
                                 listOfFilters={usersListOfFilters}
                                 initialValue={initialValue}
                                 onSubmit={onSubmit}
                />
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}
                            detailCellRenderer={'myDetailCellRenderer'}
                            detailComponentParams={CustomDetailComponent}
                            masterDetail={true}
            />
            <TablePagination onSubmit={onSubmit}
                             query={query}
                             setQuery={setQuery}
                             totalCount={totalCount}
                             />
        </div>
    )
}