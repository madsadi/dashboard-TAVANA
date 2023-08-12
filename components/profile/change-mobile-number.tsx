import { PencilIcon } from "@heroicons/react/24/outline";
import InputComponent from "../common/components/input-generator";
import Modal from "../common/layout/modal";
import React, { useState } from "react";
import useMutation from "../../hooks/useMutation";
import { IDP } from "../../api/constants";
import useQuery from "../../hooks/useQuery";
import { throwToast } from "../common/functions/notification";
import { useSWRConfig } from "swr";

const form = [
    { "title": "newPhoneNumber", "name": "شماره همراه جدید", "type": "input" },
    { "title": "token", "name": "کد ارسال شده", "type": "input" }
]
export const ChangeMobileNumber = () => {
    const { mutate: swrMutate } = useSWRConfig()
    const { mutate } = useMutation({ url: `${IDP}/api/account/change-phone-number` })
    const { fetchAsyncData } = useQuery({ url: `${IDP}/api/account/notifications/change-phone-number/sms` })
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState<{ token: string, newPhoneNumber: string }>({ token: "", newPhoneNumber: "" })

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    const changeMobile = () => {
        fetchAsyncData()
            .then(() => setOpen(true))
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <>
            <div className={'ml-2 cursor-pointer'} onClick={changeMobile}>
                <PencilIcon className={'h-5 w-5'} />
            </div>
            <Modal title={'ویرایش تلفن همراه'} setOpen={setOpen}
                open={open}>
                <div className="field mt-4">
                    <form onSubmit={(e) => {
                        e?.preventDefault()
                        if (query?.newPhoneNumber && query?.token) {
                            mutate(query)
                                .then((res) => {
                                    swrMutate(`${IDP}/api/users/GetCurrentUserInfo`)
                                    setOpen(false)
                                    throwToast({ type: 'success', value: 'با موفقیت شماره تلفن همراه شما عوض شد.' })
                                })
                                .catch((err) => throwToast({ type: 'error', value: err }))
                        }
                    }}>
                        <div className={'grid grid-cols-2 gap-4'}>
                            {
                                form.map((item: any) => {
                                    return <InputComponent key={item.title}
                                        query={query}
                                        item={item}
                                        onChange={onChange}
                                    />
                                })
                            }
                        </div>
                        <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                            <button className="button bg-red-500"
                                type={'button'}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setOpen(false)
                                }}>لغو
                            </button>
                            <button type={"submit"} className="button bg-lime-600">تایید</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}