import DatePicker, { DayValue, utils } from "@amir04lm26/react-modern-calendar-date-picker";
import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";
import { NETFLOW } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";
import { Button } from "components/common/components/button/button";

export default function Box({ api, title }: { api: string, title: string }) {
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const { mutate } = useMutation({ url: `${NETFLOW}${api}` })

    const renderCustomInput = ({ ref }: { ref: any }) => (
        <input readOnly ref={ref}
            value={selectedDay ? `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.day}` : ''}
            aria-describedby="username1-help" className="block my-4 w-full text-center"
            placeholder={"تاریخ روز را انتخاب کنید"} />
    )

    const submitHandler = async () => {
        await mutate({ date: `${selectedDay?.year}${selectedDay && selectedDay?.month < 10 ? `0${selectedDay?.month}` : selectedDay?.month}${selectedDay && selectedDay?.day < 10 ? `0${selectedDay?.day}` : selectedDay?.day}` })
            .then(() => {
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
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
                calendarPopperPosition={'bottom'}
                shouldHighlightWeekends
            />
            <Button onClick={submitHandler} className="bg-primary mt-10 mx-auto" label="بروزرسانی" />
        </div>
    )
}