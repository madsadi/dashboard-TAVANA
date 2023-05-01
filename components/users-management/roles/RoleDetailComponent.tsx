import React, {useEffect, useState} from "react";
import TableComponent from "../../common/table/table-component";
import {useSelector} from "react-redux";
import useQuery from "../../../hooks/useQuery";
import {IDP} from "../../../api/constants";

export default function RoleDetailComponent({data}: { data: any }) {
    const [rowData, setRowData] = useState([])
    const {userDetail} = useSelector((state: any) => state.userManagementConfig)
    const {fetchAsyncData: getRolePermission} = useQuery({url: `${IDP}/roles/get-role-permission`})

    const columnDefStructure: any = [
        {field: 'id', headerName: 'شناسه'},
        {field: 'serviceTitle', headerName: 'عنوان سرویس'},
        {field: 'moduleTitle', headerName: 'عنوان ماژول'},
        {field: 'actionTitle', headerName: 'عنوان عملیات'},
    ]

    useEffect(() => {
        const fetchUserPermission = async () => {
            await getRolePermission({id:data.id})
                .then((res) => setRowData(res?.data?.result))
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