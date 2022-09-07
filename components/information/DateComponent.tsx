import DatePicker, {DayValue, utils} from "@amir04lm26/react-modern-calendar-date-picker";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {activattion} from "../../api/getInformation";

export default function DateComponent({api}:{api:string}){
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);

    const renderCustomInput = ({ref}: { ref: any }) => (
        <InputText readOnly ref={ref}
                   value={selectedDay ? `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.day}` : ''}
                   aria-describedby="username1-help" className="block"/>
    )

    console.log(selectedDay)

    const activateJob=async ()=>{
        await activattion(api,{date:`${selectedDay?.year}${selectedDay && selectedDay?.month<10 ? `0${selectedDay?.month}`:selectedDay?.month}${selectedDay?.day}`})

    }

    return(
        <Card>
            <div>
                <div className="field">
                    <label htmlFor="username1" className="block">تاریخ</label>
                    <DatePicker
                        value={selectedDay}
                        onChange={setSelectedDay}
                        maximumDate={utils('fa').getToday()}
                        renderInput={renderCustomInput}
                        locale={'fa'}
                        shouldHighlightWeekends
                    />
                    <small id="username1-help" className="block">تاریخ روز را انتخاب کنید</small>
                </div>
                <Button className={'mr-auto h-fit'} onClick={activateJob}>دریافت اطلاعات</Button>
            </div>
        </Card>
    )
}