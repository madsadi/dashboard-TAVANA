import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, {useContext, useState} from "react";
import {UsersContext} from "../../../pages/users-management/users";
import {toast} from "react-toastify";
import {changeUserPassword} from "../../../api/users-management.api";

const userInputs = [
    {title: 'newPassword', name: 'رمز عبور جدید', type: 'input'},
]

export default function Password(){
    const {selectedRows} = useContext<any>(UsersContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await changeUserPassword({userId:selectedRows[0].userId,...query})
            .then(() => {
                setModal(false)
                toast.success('با موفقیت انجام شد')
                setQuery(null)
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error?.message)
            })
    }

    const openHandler = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }
    }
    return(
        <>
            <button className="button bg-yellow-500" onClick={openHandler}>رمز عبور جدید</button>
            <Modal title={'رمز عبور جدید'} ModalWidth={'max-w-3xl'} setOpen={setModal}
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