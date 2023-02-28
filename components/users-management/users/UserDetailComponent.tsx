import Image from "next/image";
import {jalali} from "../../common/functions/common-funcions";
import React, {useEffect, useState} from "react";
import TableComponent from "../../common/table/table-component";
import {getUserRoles} from "../../../api/users.api";

export default function UserDetailComponent({data}:{data:any}){
    const [rowData,setRowData] = useState([])

    const columnDefStructure: any = [
        {
            field: 'id',
            headerName: 'شناسه نقش',
        },
        {
            field: 'name',
            headerName: 'عنوان نقش',
        },
        {
            field: 'isActive',
            headerName: 'وضعیت',
            cellRendererSelector: (rowData: any) => {
                const constValueGetter = () => {
                    return (
                        <span>{rowData.data.isActive ? 'فعال':'غیر فعال'}</span>
                    )
                };
                const moodDetails = {
                    component: constValueGetter,
                };
                return moodDetails;
            },
        }
    ]


    useEffect(()=>{
        const fetchUserRoles = async () => {
            await getUserRoles(data.userId)
                .then((res) => {
                    setRowData(res?.result?.roles)
                })
        }
        fetchUserRoles()
    },[])

    return(
        <div className={'m-5 flex flex-col h-full pb-16'}>
            <div className={'mb-3 p-2 flex align-items-center bg-black-alpha-10 border-round-sm'}>
                <div className={'h-6 w-6'}>
                    <Image width={48} height={48} src="/icons/avatar.svg" alt="avatar"/>
                </div>
                <div className={'mr-4'}>
                    <div className={'flex space-x-5 space-x-reverse'}>
                        <div>
                            تاریخ تغییر رمز عبور: <span className={'font-semibold'}>{jalali(data?.passwordSetDate).date}</span>
                        </div>
                        <div>
                            تاریخ ایجاد:<span className={'font-semibold'}>{jalali(data?.insertDateTime).date}</span>
                        </div>
                        <div>
                            تاریخ ویرایش: <span className={'font-semibold'}>{jalali(data?.updateDateTime).date}</span>
                        </div>
                    </div>
                </div>
            </div>
            <TableComponent data={rowData}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}
            />
        </div>
    )
}