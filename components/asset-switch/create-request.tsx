import { ADMIN_GATEWAY } from "../../api/constants"
import { Button } from "../common/components/button/button"
import InputComponent from "../common/components/input-generator"
import { ModuleIdentifier } from "../common/functions/Module-Identifier"
import { throwToast } from "../common/functions/notification"
import Modal from "../common/layout/modal"
import useMutation from "hooks/useMutation"
import { useSearchFilters } from "../../hooks/useSearchFilters"
import { AssetSwitchContext } from "../../pages/portfo/asset-switch"
import { useContext, useState } from "react"


export const CreateRequest = () => {
    const { toolbar, service, modules, restriction } = useSearchFilters(ModuleIdentifier.ASSET_SWITCH, 'add')
    const { fetchData, query: searchQuery } = useContext<any>(AssetSwitchContext)
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/AssetSwitchRequest` })
    const [modal, setModal] = useState<boolean>(false)
    const [query, setQuery] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)

    const modalHandler = () => {
        setModal(true)
    }

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        await mutate(query)
            .then(() => {
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
                setModal(false)
                setQuery(null)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }

    return (
        <>
            <Button label="ایجاد درخواست تغییر ناظر"
                disabled={loading}
                allowed={restriction ? [[service[0], modules[0][0], 'Create'].join('')] : []}
                className={'bg-fuchsia-600'}
                onClick={modalHandler}
            />
            <Modal open={modal} setOpen={setModal} title="ایجاد درخواست تغییر ناظر">
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
                            onClick={addNewHandler}
                            loading={loading}
                            type={'submit'}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}