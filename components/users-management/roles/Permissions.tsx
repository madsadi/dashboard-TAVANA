import Modal from "../../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {
    addOrRemovePermissionToRole,
    getRolePermission,
    servicePermissions
} from "../../../api/roles.api";
import {RolesContext} from "../../../pages/users-management/roles";
import {useFuzzy} from 'react-use-fuzzy';

export default function Permissions() {
    const {selectedRows,setSelectedRows} = useContext<any>(RolesContext)
    const [modal, setModal] = useState(false)
    const [permissions, setPermissions] = useState<any>([])
    const [userPermissions, setUserPermissions] = useState<any>([])
    const {result, keyword, search} = useFuzzy<any>(permissions, {
        keys: ['id', 'service', 'serviceTitle', 'module', 'moduleTitle', 'action', 'actionTitle'],
    });

    useEffect(() => {
        const fetchAllRoles = async () => {
            await servicePermissions()
                .then((res) => {
                    setPermissions(res?.result)
                })
        }
        const fetchUserRoles = async () => {
            await getRolePermission(selectedRows[0].id)
                .then((res) => {
                    setUserPermissions(res?.result)
                    fetchAllRoles()
                })
        }
        if (selectedRows[0]) {
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

    const actionOfTransfer = (id: string) => {
        let index = userPermissions.findIndex((role: any) => role.id === id)
        if (index >= 0) {
            let _userRoles = [...userPermissions];
            _userRoles.splice(index, 1)
            setUserPermissions(_userRoles)
        } else {
            let roleObject = permissions.find((role: any) => role.id === id)
            setUserPermissions([roleObject, ...userPermissions])
        }
    }

    const roleInsert = async (mode: string, permission: any) => {
        await addOrRemovePermissionToRole(mode, {
            service: permission.service,
            roleId: selectedRows[0].id,
            module: permission.module,
            action: permission.action
        })
            .then(() => {
                setSelectedRows([])
                actionOfTransfer(permission.id)
            })
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    return (
        <>
            <button className="button bg-orange-500" onClick={openHandler}>ویرایش دسترسی های نقش</button>
            <Modal title={'ویرایش دسترسی های نقش'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="mt-4">
                    <div className={'grid grid-cols-2 gap-3'}>
                        <div>
                            <h1 className={'text-center'}>دسترسی های نقش</h1>
                            <div
                                className={'border border-gray-400 rounded-md p-3 h-[300px] overflow-y-auto space-y-2 custom-scrollbar'}>
                                <div
                                    className={`sticky z-10 flex w-full text-center px-3 py-1 bg-gray-500 text-white text-sm disabled:opacity-50 h-fit space-x-reverse space-x-5`}>
                                    <div className={'basis-1/2'}>سرویس</div>
                                    <div className={'basis-1/4'}>ماژول</div>
                                    <div className={'basis-1/4'}>فعالیت</div>
                                </div>
                                {
                                    userPermissions.map((permission: any) => {
                                        return (
                                            <button key={permission?.id}
                                                    onClick={() => roleInsert('remove', permission)}
                                                    className={`flex w-full text-center px-3 py-1 bg-gray-300 text-black text-sm disabled:opacity-50 h-fit space-x-reverse space-x-5`}>
                                                <div className={'basis-1/2'}>{permission?.serviceTitle}</div>
                                                <div className={'basis-1/4'}>{permission.moduleTitle}</div>
                                                <div className={'basis-1/4'}>{permission.actionTitle}</div>
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>
                            <h1 className={'text-center'}>کل دسترسی ها</h1>
                            <div
                                className={'relative border border-gray-400 rounded-md p-3 h-[300px] overflow-y-auto space-y-2 custom-scrollbar'}>
                                <input className={'w-full'} type="text" placeholder={'جستجو دسترسی'} onChange={(e) => search(e.target.value)} value={keyword}/>
                                <div
                                    className={`sticky z-10 top-0 flex w-full text-center px-3 py-1 bg-gray-500 text-white text-sm disabled:opacity-50 h-fit space-x-reverse space-x-5`}>
                                    <div className={'basis-1/2'}>سرویس</div>
                                    <div className={'basis-1/4'}>ماژول</div>
                                    <div className={'basis-1/4'}>فعالیت</div>
                                </div>
                                {result.map((permission: any) => {
                                    return (
                                        <button key={permission.id}
                                                onClick={() => roleInsert('add', permission)}
                                                disabled={userPermissions.find((item: any) => item.id === permission.id)}
                                                className={`flex w-full text-center px-3 py-1 bg-gray-300 text-black text-sm disabled:opacity-50 h-fit space-x-reverse space-x-5`}>
                                            <div className={'basis-1/2'}>{permission?.serviceTitle}</div>
                                            <div className={'basis-1/4'}>{permission.moduleTitle}</div>
                                            <div className={'basis-1/4'}>{permission.actionTitle}</div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}>
                            لغو
                        </button>
                        <button type={"submit"} className="button bg-lime-600" onClick={() => setModal(false)}>
                            تایید
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}