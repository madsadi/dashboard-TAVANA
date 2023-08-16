import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import React, { Dispatch } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

interface BaseInputPropsType {
    item: any,
    query: any,
    setQuery: any,
    onChange: any,
    selectedDay: DayValue,
    setSelectedDay: Dispatch<DayValue>
}
export const SingleDateInput = (props: BaseInputPropsType) => {
    const { item, query, onChange, setQuery, setSelectedDay, selectedDay } = props;
    const { title,minimumDate } = item

    const singleDateHandler = (selectedDay: DayValue) => {
        if (selectedDay) {
            return Object.values(selectedDay).map((item: any) => item).reverse().join('-')
        } else {
            return ''
        }
    }
    const renderSingleDateCustomInput = ({ ref }: { ref: any }) => (
        <div>
            <label className={'flex items-center text-sm'} >
                تاریخ
                {query?.[title] || query?.[title] === false ?
                    <XCircleIcon className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => {
                        if (setQuery) {
                            setSelectedDay(null)
                            let _query = { ...query }
                            _query[`${title}`] = null

                            setQuery(_query)
                        }
                    }} /> : null}
            </label>
            <input className={'w-full'} readOnly ref={ref} value={singleDateHandler(selectedDay)} />
        </div>
    )

    console.log(minimumDate);
    
    return (
        <div>
            <DatePicker
                value={selectedDay}
                locale={'fa'}
                minimumDate={minimumDate}
                calendarPopperPosition={'auto'}
                onChange={(e) => {
                    setSelectedDay(e);
                    onChange(
                        `${title}`, `${moment.from(`${e?.year}/${e?.month}/${e?.day}`, "fa", 'YYYY/MM/DD').format('YYYY-MM-DDTHH:MM:SS')}`
                    )
                }}
                renderInput={renderSingleDateCustomInput}
                shouldHighlightWeekends
            />
        </div>
    )
}