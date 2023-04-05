import TableComponent from "../../common/table/table-component";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getRolePermission} from "../../../api/users-management.api";

export default function RoleDetailComponent({data}: { data: any }) {
    const [rowData, setRowData] = useState([])
    const {userDetail} = useSelector((state: any) => state.userManagementConfig)

    const columnDefStructure: any = [
        {field: 'id', headerName: 'شناسه'},
        {field: 'serviceTitle', headerName: 'عنوان سرویس'},
        {field: 'moduleTitle', headerName: 'عنوان ماژول'},
        {field: 'actionTitle', headerName: 'عنوان عملیات'},
    ]

    useEffect(() => {
        const fetchUserPermission = async () => {
            await getRolePermission(data.id)
                .then((res) => setRowData(res?.result))
                .catch(() => setRowData([]))
        }
        fetchUserPermission()
    }, [userDetail])

    return (
        <div className={'m-5 flex flex-col h-full pb-16'}>
            <TableComponent data={rowData}
                            columnDefStructure={columnDefStructure}
                            rowId={['id']}/>
        </div>
    )
}