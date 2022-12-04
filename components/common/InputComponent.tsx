import React, {useEffect, useState} from "react";
import DatePicker, {Day, DayRange, DayValue} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";

export default function InputComponent({
                                           query,
                                           queryUpdate,
                                           title,
                                           name,
                                           type
                                       }: { query: any, queryUpdate: any, title: string, name: string, type: string }) {

    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    useEffect(()=>{
        if (selectedDayRange.from){
            queryUpdate(
                'StartDate',`${moment.from(`${selectedDayRange.from?.year}/${selectedDayRange.from?.month}/${selectedDayRange.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
            )
        }
        if (selectedDayRange.to){
            queryUpdate(
                'EndTime', `${moment.from(`${selectedDayRange.to?.year}/${selectedDayRange.to?.month}/${selectedDayRange.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
            )
        }
    },[selectedDayRange.from,selectedDayRange.to])

    useEffect(()=>{
        if (!query.StartDate && !query.EndTime){
            setSelectedDayRange({from:null,to:null})
        }else if (!query.EndTime){
            setSelectedDayRange({...selectedDayRange,to:null})
        }else if (!query.StartDate){
            setSelectedDayRange({...selectedDayRange,from:null})
        }
    },[query.StartDate,query.EndTime])

    const dateRangeHandler = (selectedDayRange: any) => {
        if (selectedDayRange.from && selectedDayRange.to) {
            return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`
        } else if (!selectedDayRange.from && !selectedDayRange.to) {
            return ''
        } else if (!selectedDayRange.from) {
            return ''
        } else if (!selectedDayRange.to) {
            return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا اطلاع ثانویه`
        }
    }

    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    const componentRender=()=>{
        switch (type) {
            case "date":
                return (
                    <div>
                        <DatePicker
                            value={selectedDayRange}
                            onChange={setSelectedDayRange}
                            shouldHighlightWeekends
                            renderInput={renderCustomInput}
                            locale={'fa'}
                            calendarPopperPosition={'bottom'}
                        />
                    </div>
                )
            case "input":
                return (
                    <div>
                        <label className={'block'} htmlFor={title}>{name}</label>
                        <input className={'w-full'} id={title} value={query[title]}
                               onChange={(e) => queryUpdate(title, e.target.value)}/>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        componentRender()
    )
}
