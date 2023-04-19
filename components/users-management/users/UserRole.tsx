import Modal from "../../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {UsersContext} from "../../../pages/users-management/users";
import {useDispatch, useSelector} from "react-redux";
import {userDetail} from "../../../store/user-management.config";
import {addUserRole, getActiveRoles, getUserRoles, removeUserRole} from "../../../api/users-management.api";

export default function UserRole() {
    const {userDetail:userDetailValue} = useSelector((state:any)=>state.userManagementConfig)
    const {selectedRows} = useContext<any>(UsersContext)
    const [modal, setModal] = useState(false)
    const [roles, setRoles] = useState<any>([])
    const [userRoles, setUserRoles] = useState<any>([])

    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllRoles = async ()=>{
            await getActiveRoles()
                .then((res) => {
                    setRoles(res?.result?.pagedData)
                })
        }
        const fetchUserRoles = async () => {
            await getUserRoles(selectedRows[0].id)
                .then((res) => {
                    setUserRoles(res?.result?.roles)
                    fetchAllRoles()
                })
        }
        if (selectedRows[0]){
            fetchUserRoles()
        }
    }, [selectedRows[0]])

    const openHandler = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }
    }

    const actionOfTransfer = (id:string)=>{
        let index = userRoles.findIndex((role:any)=>role.id === id)
        if (index>=0){
            let _userRoles = [...userRoles];
            _userRoles.splice(index,1)
            setUserRoles(_userRoles)
        }else{
            let roleObject = roles.find((role:any)=>role.id === id)
            setUserRoles([roleObject,...userRoles])
        }
    }

    const addRole = async (roleId: string) => {
        await addUserRole({userId: selectedRows[0].id, roleId: roleId})
            .then(() => actionOfTransfer(roleId))
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    const removeRole = async (roleId:string)=>{
        await removeUserRole({userId: selectedRows[0].id, roleId: roleId})
            .then(() => actionOfTransfer(roleId))
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    useEffect(()=>{
        if (!modal){
            dispatch(userDetail(!userDetailValue))
        }
    },[modal])
    return (
        <>
            <button className="button bg-orange-500" onClick={openHandler}>مدریت نقش کاربر</button>
            <Modal title={'مدیریت نقش کاربر'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="mt-4">
                    <div className={'grid grid-cols-2 gap-3'}>
                        <div>
                            <h1 className={'text-center'}>نقش های کاربر</h1>
                            <div
                                className={'border border-gray-400 rounded-md p-3 h-[300px] overflow-y-auto space-y-2 custom-scrollbar'}>
                                {
                                    userRoles.map((role: any) => {
                                        return (
                                            <button key={role?.name} onClick={()=>removeRole(role?.id)}
                                                    className={`flex w-full text-center px-3 py-1 bg-gray-300 text-black text-sm disabled:opacity-50 h-fit space-x-reverse space-x-5`}>
                                                {role?.name}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <h1 className={'text-center'}>کل نقش ها</h1>
                            <div
                                className={'border border-gray-400 rounded-md p-3 h-[300px] overflow-y-auto space-y-2 custom-scrollbar'}>
                                {
                                    roles.map((role: any) => {
                                        return (
                                            <button key={role.name} onClick={()=>addRole(role.id)} disabled={userRoles.find((item:any)=>item.id===role.id)}
                                                    className={`flex w-full text-center px-3 py-1 bg-gray-300 text-black text-sm disabled:opacity-50 h-fit space-x-reverse space-x-5`}>
                                                {role?.name}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}