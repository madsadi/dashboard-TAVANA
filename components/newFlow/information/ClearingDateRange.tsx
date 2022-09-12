import DatePicker, {DayValue, utils} from "@amir04lm26/react-modern-calendar-date-picker";
import {Card} from "primereact/card";
import React, {useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {activation} from "../../../api/getInformation";
import { Toast } from 'primereact/toast';


export default function ClearingDateRange() {
    const [toDate, setToDate] = useState<DayValue>(null);
    const [fromDate, setFromDate] = useState<DayValue>(null);
    const [settlementDelay, setSettlementDelay] = useState<string>('');
    const toast:any = useRef(null);



    const renderFromDateInput = ({ref}: { ref: any }) => (
        <InputText readOnly ref={ref}
                   style={{
                       textAlign: 'center',
                       padding: '1rem 1.5rem',
                       border: '1px solid #9c88ff',
                       borderRadius: '5px',
                       color: '#6366F1',
                       outline: 'none',
                   }}
                   value={fromDate ? `${fromDate?.year}-${fromDate?.month}-${fromDate?.day}` : ''}
                   aria-describedby="username1-help" className="block" placeholder={"تا تاریخ"}/>
    )
    const renderToDateInput = ({ref}: { ref: any }) => (
        <InputText readOnly ref={ref}
                   style={{
                       textAlign: 'center',
                       padding: '1rem 1.5rem',
                       border: '1px solid #9c88ff',
                       borderRadius: '5px',
                       color: '#6366F1',
                       outline: 'none',
                   }}
                   value={toDate ? `${toDate?.year}-${toDate?.month}-${toDate?.day}` : ''}
                   aria-describedby="username1-help" className="block" placeholder={"از تاریخ"}/>
    )

    const submitHandler = async () => {
        await activation('/Trade/buy-declaration', {fromDate:`${fromDate?.year}${fromDate && fromDate?.month<10 ? `0${fromDate?.month}`:fromDate?.month}${fromDate && fromDate?.day<10 ? `0${fromDate?.day}`:fromDate?.day}`,
            toDate:`${toDate?.year}${toDate && toDate?.month<10 ? `0${toDate?.month}`:toDate?.month}${toDate && toDate?.day<10 ? `0${toDate?.day}`:toDate?.day}`,
            settlementDelay: `${settlementDelay}`})
            .then(res=> {
                toast.current?.show({
                    severity: 'success',
                    summary: 'با موفقیت انجام شد',
                    detail: `${res} معامله خرید ذخیره شد `,
                    life: 6000
                });
            })
            .catch(err=> {
                toast.current?.show({
                    severity: 'error',
                    summary: 'لطفا سه فیلد را پر کنید',
                    detail: err?.response?.data?.title,
                    life: 6000
                });
            })
    }

    return (
        <Card>
            <Toast ref={toast} position="top-center" />
            <label htmlFor="username1" className="block mb-3">دریافت تسویه روزانه کارگزاری</label>
            <div className="dateRange">
                <div className='field'>
                    <DatePicker
                        value={fromDate}
                        onChange={setFromDate}
                        maximumDate={utils('fa').getToday()}
                        renderInput={renderFromDateInput}
                        locale={'fa'}
                        shouldHighlightWeekends
                    />
                </div>
                <div className={'field'}>
                    <DatePicker
                        value={fromDate}
                        onChange={setToDate}
                        maximumDate={utils('fa').getToday()}
                        renderInput={renderToDateInput}
                        locale={'fa'}
                        shouldHighlightWeekends
                    />
                </div>
                <div className={'field'}>
                    <InputText placeholder='تاخیر در تسویه' value={settlementDelay} onChange={(e) => setSettlementDelay(e.target.value)}/>
                </div>
            </div>
            <Button onClick={submitHandler} className="col-3 p-button-outlined" label="بروزرسانی"/>
        </Card>
    )
}