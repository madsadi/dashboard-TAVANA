import DatePicker, {DayValue, utils} from "@amir04lm26/react-modern-calendar-date-picker";
import {Card} from "primereact/card";
import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {activation} from "../../api/getInformation";

export default function SellDeclaration() {
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);

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
            .then(res => console.log(res?.result))
    }

    return (
        <Card>
            <label htmlFor="username1" className="block mb-3">دریافت تسویه های تهاتری</label>
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