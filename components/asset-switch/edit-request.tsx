import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/layout/modal";
import InputComponent from "../common/components/input-generator";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../common/functions/notification";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";
import { Button } from "../common/components/button/button";
import { AssetSwitchContext } from "pages/portfo/asset-switch";

export default function EditRequest() {
    const { toolbar, service, modules, restriction } = useSearchFilters(ModuleIdentifier.ASSET_SWITCH, 'edit')
    const { fetchData, query: searchQuery, selectedRows } = useContext<any>(AssetSwitchContext)
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/UpdateAssetSwitch`, method: "PUT" })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)

    const editHandler = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        {
            selectedRows.map((row: any) => {
                mutate({ id: row.id, status: row?.status, description: row?.description })
                    .then(() => {
                        throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
                        setModal(false)
                        setQuery({})
                        fetchData(searchQuery)
                    })
                    .catch((err) => throwToast({ type: 'error', value: err }))
            })
            setLoading(false)
        }
    }

    const openHandler = () => {
        if (selectedRows?.length) {
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'برای ویرایش حداقل یک مورد انتخاب کنید' })
        }
    }

    useEffect(() => {
        if (modal && selectedRows.length === 1) {
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
                className="bg-secondary"
                onClick={openHandler}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Edit'].join('.')] : []}
            />
            <Modal title={'ویرایش درخواست تغییر ناظر'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            toolbar.filter((input: any) => selectedRows.length > 1 ? !input.readOnly : input).map((item: any) => {
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
                            className="bg-error"
                            onClick={(e) => {
                                e.preventDefault()
                                setModal(false)
                            }}
                        />
                        <Button label={'تایید'}
                            className="bg-primary"
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