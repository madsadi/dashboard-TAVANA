import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, { useContext, useState } from "react";
import { RolesContext } from "../../../pages/users-management/roles";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import { Button } from "../../common/components/button/button";

export default function AddNew() {
    const { toolbar, service, module } = useSearchFilters(ModuleIdentifier.USER_MANAGEMENT_roles, 'add')
    const { fetchData, query: searchQuery } = useContext<any>(RolesContext)
    const { mutate } = useMutation({ url: `${IDP}/api/roles/create` })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        await mutate(query)
            .then(() => {
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
                setModal(false)
                setQuery({ name: '' })
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <Button label={'نقش جدید'}
                className="bg-lime-600"
                onClick={() => setModal(true)}
                allowed={[[service, module, 'Create'].join('.')]}
            />
            <Modal title={'نقش جدید'}
                setOpen={setModal}
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
                            type={"submit"}
                            onClick={addNewHandler}
                            loading={loading}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}