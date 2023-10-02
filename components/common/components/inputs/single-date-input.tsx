import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import React, { Dispatch } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { jalali } from "components/common/functions/common-funcions";

interface BaseInputPropsType {
    item: any,
    query: any,
    setQuery: any,
    onChange: any,
}
export const SingleDateInput = (props: BaseInputPropsType) => {
    const { item, query, onChange, setQuery } = props;
    const { title, name, minimumDate, isRequired } = item

    const singleDateHandler = (selectedDay: DayValue) => {
        if (selectedDay) {
            return Object.values(selectedDay).map((item: any) => item).join('-')
        } else {
            return ''
        }
    }
    const renderSingleDateCustomInput = ({ ref }: { ref: any }) => (
        <div>
            <label className={'flex items-center text-sm'} >
                {name}
                {isRequired ? <span className={'min-w-5 mr-2'}>
                    <ExclamationCircleIcon
                        className={'h-4 w-4 text-red-500'} />
                </span> : null}
                {query?.[title] || query?.[title] === false ?
                    <XCircleIcon className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => {
                        if (setQuery) {
                            onChange(`${title}`, null)
                            let _query = { ...query }
                            _query[`${title}`] = null

                            setQuery(_query)
                        }
                    }} /> : null}
            </label>
            <input className={'w-full'} readOnly ref={ref} value={singleDateHandler(convertor(query?.[title]))} />
        </div>
    )

    function convertor(date: string): DayValue {
        const jalaliDate = jalali(date)?.date
        const split = jalaliDate.split('/')

        return date ? { year: Number(split[0]), month: Number(split[1]), day: Number(split[2]) } : null
    }


    return (
        <div>
            <DatePicker
                value={convertor(query?.[title])}
                locale={'fa'}
                minimumDate={minimumDate}
                calendarPopperPosition={'bottom'}
                onChange={(e: DayValue) => {
                    onChange(
                        `${title}`, `${moment.from(`${e?.year}/${e?.month}/${e?.day}`, "fa", 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                    )
                }}
                renderInput={renderSingleDateCustomInput}
                shouldHighlightWeekends
            />
        </div>
    )
}