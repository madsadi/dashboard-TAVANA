import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, {useContext, useState} from "react";
import {toast} from "react-toastify";
import {RolesContext} from "../../../pages/users-management/roles";
import {createNewRole} from "../../../api/users-management.api";

const rolesInput = [
    {title: 'name', name: 'عنوان', type: 'input'},
]
export default function AddNew() {
    const {onSubmit, query: searchQuery} = useContext<any>(RolesContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await createNewRole(query)
            .then(() => {
                setModal(false)
                toast.success('با موفقیت انجام شد')
                setQuery({name:''})
                onSubmit(e, searchQuery)
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error?.message)
            })
    }

    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>نقش جدید</button>
            <Modal title={'نقش جدید'}
                   ModalWidth={'max-w-3xl'}
                   setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            rolesInput.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       setQuery={setQuery}
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