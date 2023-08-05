import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/layout/Modal";
import InputComponent from "../common/components/InputComponent";
import { UsersContext } from "../../pages/users-management/users";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY, IDP } from "../../api/constants";
import { throwToast } from "../common/functions/notification";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";
import { Button } from "../common/components/button/button";
import { AssetSwitchContext } from "pages/portfo/asset-switch";

export default function EditRequest() {
    const { toolbar, service, modules, restriction } = useSearchFilters(ModuleIdentifier.ASSET_SWITCH, 'edit')

    const { fetchData, query: searchQuery, selectedRows } = useContext<any>(AssetSwitchContext)
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/UpdateAssetSwitch` })
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
        if (selectedRows?.length) {
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'برای ویرایش حداقل یک مورد انتخاب کنید' })
        }
    }

    useEffect(() => {
        if (modal && selectedRows.length) {
            let { status, description, tradingCode, uniqueId, title, bourseCode, instrumentId, faInsCode, faInsName } = selectedRows[0]
            setQuery({ description, status, tradingCode, uniqueId, title, bourseCode, instrumentId, faInsCode, faInsName })
        }
    }, [modal])

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <Button label={'ویرایش درخواست تغییر ناظر'}
                className="bg-orange-500"
                onClick={openHandler}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Edit'].join('.')] : []}
            />
            <Modal title={'ویرایش درخواست تغییر ناظر'} setOpen={setModal}
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