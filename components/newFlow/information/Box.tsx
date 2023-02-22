import DatePicker, {DayValue, utils} from "@amir04lm26/react-modern-calendar-date-picker";
import React, {useState} from "react";
import {activation} from "../../../api/get-information.api";
import {toast} from "react-toastify";


export default function Box({api, title}: { api: string, title: string }) {
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);

    const renderCustomInput = ({ref}: { ref: any }) => (
        <input readOnly ref={ref}
               value={selectedDay ? `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.day}` : ''}
               aria-describedby="username1-help" className="block my-4 w-full text-center"
               placeholder={"تاریخ روز را انتخاب کنید"}/>
    )

    const submitHandler = async () => {
        await activation(api, {date: `${selectedDay?.year}${selectedDay && selectedDay?.month < 10 ? `0${selectedDay?.month}` : selectedDay?.month}${selectedDay && selectedDay?.day < 10 ? `0${selectedDay?.day}` : selectedDay?.day}`})
            .then(() => {
                toast.success('با موفقیت انجام شد')
            })
            .catch(err =>toast.error(`${err?.response?.data?.message}`))
    }

    return (
        <div className={'bg-white p-2 rounded shadow-sm border border-border'}>
            <label htmlFor="username1" className="block">{title}</label>
            <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                maximumDate={utils('fa').getToday()}
                renderInput={renderCustomInput}
                locale={'fa'}
                shouldHighlightWeekends
            />
            <button onClick={submitHandler} className="button bg-lime-600 mt-10">بروزرسانی</button>
        </div>
    )
}