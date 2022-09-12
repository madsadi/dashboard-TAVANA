import {Card} from "primereact/card";
import React, {useRef} from "react";
import {Button} from "primereact/button";
import {activationWithOUtBody} from "../../../api/getInformation";
import { Toast } from 'primereact/toast';


export default function Rules() {
    const toast:any = useRef(null);

    const submitHandler = async () => {
        await activationWithOUtBody('/Trade/rules')
            .then(res=> {
                toast.current?.show({
                    severity: 'success',
                    summary: 'با موفقیت انجام شد',
                    detail: `${res} ضرایب کامزد دریافت شد `,
                    life: 6000
                });
            })
            .catch(err=> {
                toast.current?.show({
                    severity: 'error',
                    summary: err?.response?.data?.title,
                    detail: err?.response?.data?.title,
                    life: 6000
                });
            })
    }

    return (
        <Card>
            <Toast ref={toast} position="top-center" />
            <div className={'field'}>
                <label htmlFor="username1" className="block mb-3">دریافت ضرایب کارمزد</label>
                <Button onClick={submitHandler} className="col-3 p-button-outlined" label="بروزرسانی"/>
            </div>
        </Card>
    )
}