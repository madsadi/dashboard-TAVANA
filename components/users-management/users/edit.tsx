import React, { useContext, useEffect, useState } from "react";
import Modal from "../../common/layout/modal";
import InputComponent from "../../common/components/input-generator";
import { UsersContext } from "../../../pages/users-management/users";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import { Button } from "../../common/components/button/button";

export default function Edit() {
    const { toolbar, service, modules, restriction } = useSearchFilters(ModuleIdentifier.USER_MANAGEMENT_users, 'edit')

    const { fetchData, query: searchQuery, selectedRows } = useContext<any>(UsersContext)
    const { mutate } = useMutation({ url: `${IDP}/api/users/update` })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)

    const editHandler = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        await mutate({ userId: selectedRows[0].id, ...query })
            .then(() => {
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
                setModal(false)
                setQuery({})
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }

    const openHandler = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای تغییر انتخاب کنید' })
        }
    }

    useEffect(() => {
        if (modal && selectedRows.length) {
            let { firstName, email, nationalId, phoneNumber, lastName, username } = selectedRows[0]
            setQuery({ firstName, email, nationalId, phoneNumber, lastName, username })
        }
    }, [modal])

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <Button label={'ویرایش'}
                className="bg-orange-500"
                onClick={openHandler}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Edit'].join('.')] : []}
            />
            <Modal title={'ویرایش اطلاعات کاربر'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            toolbar.map((item: any) => {
                                return <InputComponent key={item.title}
                                    query={query}
                                    item={item}
                                    onChange={onChange}
                                />

                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <Button label={'لغو'}
                            className="bg-red-500"
                            onClick={(e) => {
                                e.preventDefault()
                                setModal(false)
                            }}
                        />
                        <Button label={'تایید'}
                            className="bg-lime-600"
                            onClick={editHandler}
                            type={'submit'}
                            loading={loading}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}