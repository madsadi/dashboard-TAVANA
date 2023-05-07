import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, {useContext, useState} from "react";
import {UsersContext} from "../../../pages/users-management/users";
import useMutation from "../../../hooks/useMutation";
import {IDP} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";
import {useSearchFilters} from "../../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../../common/functions/Module-Identifier";

export default function AddNew() {
    const {toolbar} = useSearchFilters(ModuleIdentifier.USER_MANAGEMENT_users,'add')
    const {fetchData, query: searchQuery} = useContext<any>(UsersContext)
    const {mutate} = useMutation({url:`${IDP}/users/create`})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await mutate(query)
            .then(() => {
                throwToast({type:'success',value:'با موفقیت انجام شد'})
                setModal(false)
                setQuery(null)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({type:'error',value:err}))
    }

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>جدید</button>
            <Modal title={'کاربر جدید'} ModalWidth={'max-w-3xl'} setOpen={setModal}
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
                        <button className="button bg-red-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}>لغو
                        </button>
                        <button type={"submit"} className="button bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}