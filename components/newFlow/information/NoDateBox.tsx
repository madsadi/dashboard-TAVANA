import React from "react";
import {activationWithOUtBody} from "../../../api/getInformation";
import {toast} from "react-toastify";

export default function NoDateBox({api, title}: { api: string, title: string }) {

    const submitHandler = async () => {
        await activationWithOUtBody(api)
            .then(() => {
                toast.success('با موفقیت انجام شد')
            })
            .catch(err => toast.error(err?.response?.data?.title))
    }

    return (
        <div className={'bg-white p-2 rounded shadow-sm border border-border h-full'}>
            <label htmlFor="username1" className="block mb-3">{title}</label>
            <button onClick={submitHandler} className="rounded-full border border-lime-600 p-1 px-2">بروزرسانی</button>
        </div>
    )
}