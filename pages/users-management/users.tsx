import React, { useState} from "react";
import {getUsers} from "../../api/users";
import CustomDetailComponent from "../../components/online-orders/orders/customDetailComponent";
import { jalali} from "../../components/common/functions/common-funcions";
import InputComponent from "../../components/common/components/InputComponent";
import AccordionComponent from "../../components/common/components/AccordionComponent";
import TableComponent from "../../components/common/table/table-component";

export default function Users() {
    const columnDefStructure: any = [
        {
            field: 'id',
            headerName: 'شناسه حساب کاربری',
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
            field: 'phoneNumber',
            headerName: 'موبایل',
        },
        {
            field: 'email',
            headerName: 'ایمیل',
        },
        {
            field: 'birthdate',
            headerName: 'تاریخ تولد',
            cellRendererSelector: () => {
                const ColourCellRenderer = (rowData: any) => {
                    return (
                        <span>{jalali(rowData.data.birthdate).date}</span>
                    )
                    const moodDetails = {
                        component: ColourCellRenderer,
                    }
                    return moodDetails;
                }
            }
        },
        {
            field: 'nationalId',
            headerName: 'کدملی',
        },
        {
            field: 'fatherName',
            headerName: 'نام پدر',
        },
        {
            field: 'userRoles',
            headerName: 'نقش کاربر',
        }
    ]

    type initialType = { Skip: number, PageSize: number, firstName: string, lastName: string, userName: string, phoneNumber: string, roleId: string}
    const initialValue = {
        Skip: 1,
        PageSize: 20,
        firstName: '',
        lastName: '',
        userName: '',
        phoneNumber: '',
        roleId: '',
    }
    const usersListOfFilters = [
        { title: 'Skip', name: 'شماره صفحه', type: null },
        { title: 'PageSize', name: 'تعداد', type: null },
        { title: 'firstName', name: "نام", type: 'input' },
        { title: 'lastName', name: "نام خانوادگی", type: 'input'},
        { title: 'userName', name: "نام کاربری", type: 'input' },
        { title: 'phoneNumber', name: "تلفن همراه", type: 'input' },
        { title: 'roleId', name: "آیدی نقش کاربر",type: 'input'},
    ]

    const [query, setQuery] = useState<initialType>(initialValue)
    const [data, setData] = useState<any>([])

    const onSubmit = async (e:any,query: any) => {
        e.preventDefault()
        await getUsers(query)
            .then((res: any) => setData(res?.result))
            .catch(() => setData([]))
    };

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    return (
        <div className={'flex flex-col h-full grow'}>
            <AccordionComponent>
                <form onSubmit={(e) => onSubmit(e,query)}>
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
                                                       />
                            })
                        }
                    </div>
                    <div className={'flex space-x-3 space-x-reverse float-left my-10'}>
                        <button className={'button bg-red-600'} onClick={(e) => {
                            e.preventDefault()
                            setQuery(initialValue)
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
                            rowSelection={'single'}
                            masterDetail={true}
                            detailCellRenderer={'myDetailCellRenderer'}
                            detailCellRendererParams={CustomDetailComponent}
            />
        </div>
    )
}