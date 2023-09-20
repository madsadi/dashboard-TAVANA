import React from "react";
import useMutation from "../../../hooks/useMutation";
import { NETFLOW } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";

export default function NoDateBox({ api, title }: { api: string, title: string }) {
    const { mutate } = useMutation({ url: `${NETFLOW}${api}` })

    const submitHandler = async () => {
        await mutate()
            .then(() => {
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <div className={'bg-white p-2 rounded shadow-sm border border-border h-full'}>
            <label htmlFor="username1" className="block mb-3">{title}</label>
            <button onClick={submitHandler} className="button bg-primary mt-10">بروزرسانی</button>
        </div>
    )
}