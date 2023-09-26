import InputComponent from "../common/components/input-generator";
import Modal from "../common/layout/modal";
import React, { useEffect, useState } from "react";
import useMutation from "../../hooks/useMutation";
import { IDP } from "../../api/constants";
import { throwToast } from "../common/functions/notification";
import useSWR, { useSWRConfig } from "swr";
import { Button } from "components/common/components/button/button";

const userInputs = [
    { title: 'userName', name: 'نام کاربری', type: 'input' },
    { title: 'firstName', name: 'نام', type: 'input' },
    { title: 'lastName', name: 'نام خانوادگی', type: 'input' },
    { title: 'email', name: 'ایمیل', type: 'input' },
    { title: 'nationalId', name: 'کدملی', type: 'input', valueType: 'number' },
]

export const EditInfoModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
    const { data, mutate: userInfo } = useSWR({ url: `${IDP}/api/users/GetCurrentUserInfo` }, { revalidateOnMount: true })

    const { mutate } = useMutation({ url: `${IDP}/api/account`, method: 'PUT' })
    const [query, setQuery] = useState<any>({})

    const editHandler = async (e: any) => {
        e.preventDefault()
        await mutate({ ...query, nationalId: `${query?.nationalId}` }, {}, { 'withCredentials': true })
            .then(() => {
                userInfo()
                throwToast({ type: 'success', value: 'با موفقیت ویرایش شد' })
                setOpen(false)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    useEffect(() => {
        if (data) {
            let _query: any = {}
            Object.keys(data.result)?.map((item: any) => {
                if (!['ip', 'isSimoultaneousLogin', 'message', 'twoFactorEnabled'].includes(item)) {
                    _query[item] = data.result[item]
                }
            })
            setQuery(_query)
        }
    }, [data])

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }
    return (
        <Modal title={'ویرایش حساب کاربری'} setOpen={setOpen}
            open={open}>
            <div className="field mt-4">
                <form onSubmit={editHandler}>
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
                        <Button className="bg-error"
                            label="لغو"
                            type={'button'}
                            onClick={(e) => {
                                e.preventDefault()
                                setOpen(false)
                            }} />
                        <Button type={"submit"} className=" bg-primary" label="تایید" />
                    </div>
                </form>
            </div >
        </Modal >
    )
}