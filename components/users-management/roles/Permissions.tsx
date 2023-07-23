import React, { useContext, useEffect, useState } from "react";
import Modal from "../../common/layout/Modal";
import { RolesContext } from "../../../pages/users-management/roles";
import { useFuzzy } from 'react-use-fuzzy';
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../../store/user-management.config";
import { throwToast } from "../../common/functions/notification";
import useQuery from "../../../hooks/useQuery";
import { IDP } from "../../../api/constants";
import useMutation from "../../../hooks/useMutation";
import { Button } from "../../common/components/button/button";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import filters from "../../../constants/filters";

export default function Permissions() {
    const { userDetail: userDetailValue } = useSelector((state: any) => state.userManagementConfig)
    const { selectedRows, setSelectedRows } = useContext<any>(RolesContext)
    const { fetchAsyncData: getRolePermission } = useQuery({ url: `${IDP}/api/roles/get-role-permission` })
    const { fetchAsyncData: servicePermissions } = useQuery({ url: `${IDP}/api/service-permossion/get-all-service-permission` })
    const { mutate: addPermissionToRole } = useMutation({ url: `${IDP}/api/roles/add-permission-to-role` })
    const { mutate: removePermissionFromRole } = useMutation({ url: `${IDP}/api/roles/remove-permission-from-role` })

    const [modal, setModal] = useState(false)
    const [permissions, setPermissions] = useState<any>([])
    const [userPermissions, setUserPermissions] = useState<any>([])
    const { result, keyword, search } = useFuzzy<any>(permissions, {
        keys: ['id', 'service', 'serviceTitle', 'module', 'moduleTitle', 'action', 'actionTitle'],
    });

    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllRoles = async () => {
            await servicePermissions()
                .then((res) => {
                    setPermissions(res?.data?.result)
                })
        }
        const fetchUserRoles = async () => {
            await getRolePermission({ id: selectedRows[0].id })
                .then((res) => {
                    setUserPermissions(res?.data?.result)
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
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای تغییر انتخاب کنید' })
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
        if (mode === 'add') {
            await addPermissionToRole({
                service: permission.service,
                roleId: selectedRows[0].id,
                module: permission.module,
                action: permission.action
            })
                .then(() => {
                    actionOfTransfer(permission.id)
                })
                .catch((err) => throwToast({ type: 'error', value: err }))
        } else {
            await removePermissionFromRole({
                service: permission.service,
                roleId: selectedRows[0].id,
                module: permission.module,
                action: permission.action
            })
                .then(() => {
                    actionOfTransfer(permission.id)
                })
                .catch((err) => throwToast({ type: 'error', value: err }))
        }
    }

    useEffect(() => {
        if (!modal) {
            setSelectedRows([])
            dispatch(userDetail(!userDetailValue))
        }
    }, [modal])

    return (
        <>
            <Button label={'ویرایش دسترسی های نقش'}
                className="bg-orange-500"
                onClick={openHandler}
                allowed={[[filters[ModuleIdentifier.USER_MANAGEMENT_roles]?.service, filters[ModuleIdentifier.USER_MANAGEMENT_roles]?.module, 'RollAndPermissionManagment'].join('.')]}
            />
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
                                <input className={'w-full'} type="text" placeholder={'جستجو دسترسی'}
                                    onChange={(e) => search(e.target.value)} value={keyword} />
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
                </div>
            </Modal>
        </>
    )
}