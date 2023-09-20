import Modal from "../common/layout/modal";
import InputComponent from "../common/components/input-generator";
import React, { useState } from "react";
import useMutation from "../../hooks/useMutation";
import { IDP } from "../../api/constants";
import { throwToast } from "../common/functions/notification";

const userInputs = [
    { title: 'currentPassword', name: 'رمز عبور', type: 'password' },
    { title: 'newPassword', name: 'رمز عبور جدید', type: 'password' },
]

export const PasswordModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
    const [query, setQuery] = useState({})
    const { mutate } = useMutation({ url: `${IDP}/api/account/change-password` })

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    const changeHandler = async (e: any) => {
        e.preventDefault()
        await mutate(query)
            .then(() => {
                throwToast({ type: 'success', value: 'رمز عبور با موفقیت عوض شد' });
                setOpen(false)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }
    return (
        <Modal title={'تغییر رمز عبور'} setOpen={setOpen}
            open={open}>
            <div className="field mt-4">
                <form onSubmit={changeHandler}>
                    <div className={'grid grid-cols-2 gap-4'}>
                        {
                            userInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                    query={query}
                                    item={item}
                                    onChange={onChange}
                                />
                            })
                        }
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-error"
                            type={'button'}
                            onClick={(e) => {
                                e.preventDefault()
                                setOpen(false)
                            }}>لغو
                        </button>
                        <button type={"submit"} className="button bg-primary">تایید</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}