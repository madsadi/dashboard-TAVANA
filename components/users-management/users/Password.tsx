import React, {useContext, useState} from "react";
import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import {UsersContext} from "../../../pages/users-management/users";
import useMutation from "../../../hooks/useMutation";
import {USERS} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";

const userInputs = [
    {title: 'newPassword', name: 'رمز عبور جدید', type: 'input'},
]

export default function Password(){
    const {selectedRows} = useContext<any>(UsersContext)
    const {mutate} = useMutation({url:`${USERS}/users/change-user-password`})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const changePassHandler = async (e: any) => {
        e.preventDefault()
        await mutate({userId:selectedRows[0].id,...query})
            .then(() => {
                throwToast({type:'success',value:'با موفقیت انجام شد'})
                setModal(false)
                setQuery(null)
            })
            .catch((err) => throwToast({type:'error',value:err}))
    }

    const openHandler = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            throwToast({type:'warning',value:'لطفا یک گزینه برای تغییر انتخاب کنید'})
        }
    }
    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    return(
        <>
            <button className="button bg-yellow-500" onClick={openHandler}>رمز عبور جدید</button>
            <Modal title={'رمز عبور جدید'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            userInputs.map((item: any) => {
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
                        <button type={"submit"} className="button bg-lime-600" onClick={changePassHandler}>تایید</button>
                    </div>
                </div>
            </Modal>

        </>
    )
}