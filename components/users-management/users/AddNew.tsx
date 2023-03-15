import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, {useContext, useState} from "react";
import {toast} from "react-toastify";
import {UsersContext} from "../../../pages/users-management/users";
import {createUsers} from "../../../api/users-management.api";

const userInputs = [
    {title: 'phoneNumber', name: 'موبایل', type: 'input'},
    {title: 'firstName', name: 'نام', type: 'input'},
    {title: 'lastName', name: 'نام خانوادگی', type: 'input'},
    {title: 'email', name: 'ایمیل', type: 'input'},
    {title: 'nationalId', name: 'کدملی', type: 'input'},
    {title: 'password', name: 'رمز عبور', type: 'input'},
]
export default function AddNew() {
    const {onSubmit, query: searchQuery} = useContext<any>(UsersContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await createUsers(query)
            .then(() => {
                setModal(false)
                toast.success('با موفقیت انجام شد')
                setQuery(null)
                onSubmit(e, searchQuery)
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error?.message)
            })
    }

    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>جدید</button>
            <Modal title={'کاربر جدید'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            userInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       setQuery={setQuery}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
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