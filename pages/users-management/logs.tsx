import React, { useState} from "react";
import {getUsersLogs} from "../../api/users.api";
import CustomDetailComponent from "../../components/online-orders/orders/customDetailComponent";
import { jalali} from "../../components/common/functions/common-funcions";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import TablePagination from "../../components/common/table/TablePagination";
import {USERS} from "../../api/constants";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import InputComponent from "../../components/common/components/InputComponent";
import TableComponent from "../../components/common/table/table-component";

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

    type initialType = { PageNumber: number, PageSize: number, userId: string, nationalId: string, phoneNumber: string, StartDate: string, EndDate: string}
    const initialValue = {
        PageNumber: 1,
        PageSize: 20,
        StartDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
        EndDate: `${moment().locale('en').format('YYYY-MM-DD')}`,
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

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([]);
    const [totalCount, setTotal] = useState<any>(null);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const onSubmit = async (e:any,query: any) => {
        e.preventDefault()
        await getUsersLogs(query)
            .then((res: any) => {
                setData(res?.result?.pagedData);
                setTotal(res?.result?.totalCount)
            })
            .catch(() =>
                setData([]))
    };

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    return (
        <div className={'flex flex-col h-full flex-1'}>
            <AccordionComponent>
                <form onSubmit={(e) => onSubmit(e, query)}>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            usersListOfFilters?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       queryUpdate={queryUpdate}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
                                                       selectedDayRange={selectedDayRange}
                                                       setSelectedDayRange={setSelectedDayRange}/>
                            })
                        }
                    </div>
                    <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                        <button className={'button bg-red-600'} onClick={(e) => {
                            e.preventDefault()
                            setQuery(initialValue)
                            setSelectedDayRange({from: null, to: null})
                            onSubmit(e, initialValue)
                        }}>
                            لغو فیلتر ها
                        </button>
                        <button className={'button bg-lime-600'} type={'submit'}>
                            جستجو
                        </button>
                    </div>
                </form>
            </AccordionComponent>
            <TableComponent data={data}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}
                            detailCellRenderer={'myDetailCellRenderer'}
                            detailComponentParams={CustomDetailComponent}
                            masterDetail={true}
            />
            <TablePagination setData={setData}
                             query={query}
                             api={`${USERS}/users/SearchUserActivityLogs?`}
                             setQuery={setQuery}
                             totalCount={totalCount}/>
        </div>
    )
}