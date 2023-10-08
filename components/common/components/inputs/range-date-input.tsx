import DatePicker, { DayValue } from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import React, { Dispatch } from "react";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { dateRangeHandler, jalali } from "../../functions/common-funcions";
import { DayRange } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Button } from "../button/button";

interface BaseInputPropsType {
    item: any,
    query: any,
    setQuery: any,
}
export const RangeDateInput = (props: BaseInputPropsType) => {
    const { item, query, setQuery } = props;
    const { name, isRequired } = item

    const renderCustomInput = ({ ref }: { ref: any }) => (
        <div>
            <label className={'flex items-center text-sm'} htmlFor="rangeDate">
                {name}
                {isRequired ? <span className={'min-w-5 mr-2'}>
                    <ExclamationCircleIcon
                        className={'h-4 w-4 text-red-500'} />
                </span> : null}
                {query?.['StartDate'] || query?.['EndDate'] ?
                    <XCircleIcon className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => {
                        if (setQuery) {
                            setQuery({ ...query, StartDate: null, EndDate: null })
                        }
                    }} /> : null}
            </label>
            <input className={'w-full h-[36px]'} readOnly ref={ref} id="rangeDate"
                value={dateRangeHandler(convertor({ StartDate: query?.StartDate, EndDate: query?.EndDate }))} />
        </div>
    )

    const selectTodayHandler = () => {
        let enToday = moment().locale('en').format('YYYY-MM-DD');
        if (query?.StartDate) {
            setQuery({
                ...query,
                StartDate: query?.StartDate,
                EndDate: enToday || null
            })
        } else {
            setQuery({
                ...query,
                StartDate: enToday || null,
                EndDate: query?.EndDate
            })
        }
    }

    function convertor({ StartDate, EndDate }: { StartDate: string, EndDate: string }): DayRange {
        const jalaliStartDate = StartDate ? jalali(StartDate || '')?.date : null
        const from = jalaliStartDate?.split('/') || null

        const jalaliEndDate = EndDate ? jalali(EndDate || '')?.date : null
        const to = jalaliEndDate?.split('/') || null

        return { from: from ? ({ year: Number(from[0]), month: Number(from[1]), day: Number(from[2]) }) : null, to: to ? { year: Number(to[0]), month: Number(to[1]), day: Number(to[2]) } : null }
    }

    return (
        <div>
            <DatePicker
                value={convertor({ StartDate: query?.StartDate || null, EndDate: query?.EndDate || null })}
                onChange={(e) => {
                    if (setQuery) {
                        setQuery({
                            ...query,
                            StartDate: e.from ? `${moment.from(`${e.from?.year}/${e.from?.month}/${e.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}` : null,
                            EndDate: e.to ? `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}` : null
                        })
                    }
                }}
                renderFooter={() => {
                    return (
                        <div className="w-full flex !pb-5">
                            <Button label="انتخاب تاریخ امروز" className="!mx-auto !px-2 !py-1 !text-current " onClick={selectTodayHandler} />
                        </div>
                    )
                }}
                shouldHighlightWeekends
                renderInput={renderCustomInput}
                locale={'fa'}
                calendarPopperPosition={'bottom'}
            />
        </div>
    )
}