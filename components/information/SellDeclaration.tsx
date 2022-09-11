import DatePicker, {DayValue, utils} from "@amir04lm26/react-modern-calendar-date-picker";
import {Card} from "primereact/card";
import React, {useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {activation} from "../../api/getInformation";
import { Toast } from 'primereact/toast';


export default function SellDeclaration() {
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const toast:any = useRef(null);


    const renderCustomInput = ({ref}: { ref: any }) => (
        <InputText readOnly ref={ref}
                   style={{
                       textAlign: 'center',
                       border: '1px solid #9c88ff',
                       borderRadius: '5px',
                       color: '#6366F1',
                       outline: 'none',
                   }}
                   value={selectedDay ? `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.day}` : ''}
                   aria-describedby="username1-help"  className="my-custom-input-class"  placeholder={"تاریخ روز را انتخاب کنید"}/>
    )

    const submitHandler = async () => {
        await activation('/Trade/sell-declaration', {date:`${selectedDay?.year}${selectedDay && selectedDay?.month<10 ? `0${selectedDay?.month}`:selectedDay?.month}${selectedDay && selectedDay?.day<10 ? `0${selectedDay?.day}`:selectedDay?.day}`})
            .then(res=> {
                toast.current?.show({
                    severity: 'success',
                    summary: 'با موفقیت انجام شد',
                    detail: `${res} معامله فروش ذخیره شد `,
                    life: 6000
                });
            })
            .catch(err=> {
                toast.current?.show({
                    severity: 'error',
                    summary: 'لطفا تاریخ را انتخاب کنید',
                    detail: err?.response?.data?.title,
                    life: 6000
                });
            })
    }

    return (
        <Card>
            <Toast ref={toast} position="top-center" />
            <label htmlFor="username1" className="block mb-3">دریافت معاملات فروش</label>
            <div className="cardBox">
                <DatePicker
                    value={selectedDay}
                    onChange={setSelectedDay}
                    maximumDate={utils('fa').getToday()}
                    renderInput={renderCustomInput}
                    locale={'fa'}
                    shouldHighlightWeekends
                />
                <Button onClick={submitHandler} className="col-3 p-button-outlined" label="بروزرسانی" />
            </div>
        </Card>
    )
}