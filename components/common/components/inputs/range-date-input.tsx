import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import React, { Dispatch } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { dateRangeHandler } from "../../functions/common-funcions";
import { DayRange } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Button } from "../button/button";

interface BaseInputPropsType {
    item: any,
    query: any,
    setQuery: any,
    selectedDayRange: DayRange,
    setSelectedDayRange: Dispatch<DayRange>
}
export const RangeDateInput = (props: BaseInputPropsType) => {
    const { item, query, setQuery, setSelectedDayRange, selectedDayRange } = props;
    const { name } = item

    const renderCustomInput = ({ ref }: { ref: any }) => (
        <div>
            <label className={'flex items-center text-sm'} htmlFor="rangeDate">
                {name}
                {query?.['StartDate'] || query?.['EndDate'] ?
                    <XCircleIcon className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => {
                        if (setQuery) {
                            setSelectedDayRange({ from: null, to: null })
                            setQuery({ ...query, StartDate: null, EndDate: null })
                        }
                    }} /> : null}
            </label>
            <input className={'w-full h-[36px]'} readOnly ref={ref} id="rangeDate"
                value={dateRangeHandler(selectedDayRange)} />
        </div>
    )

    const selectTodayHandler = () => {
        let enToday = moment().locale('en').format('YYYY-MM-DD');
        let faToday = moment().locale('fa').format('YYYY-MM-DD');
        if (query?.StartDate) {
            setSelectedDayRange({
                from: selectedDayRange.from,
                to: { year: Number(faToday.split('-')[0]), month: Number(faToday.split('-')[1]), day: Number(faToday.split('-')[2]) }
            })
            setQuery({
                ...query,
                StartDate: query?.StartDate,
                EndDate: enToday || null
            })
        } else {
            setSelectedDayRange({
                from: { year: Number(faToday.split('-')[0]), month: Number(faToday.split('-')[1]), day: Number(faToday.split('-')[2]) },
                to: selectedDayRange.to
            })
            setQuery({
                ...query,
                StartDate: enToday || null,
                EndDate: query?.EndDate
            })
        }
    }

    return (
        <div>
            <DatePicker
                value={selectedDayRange}
                onChange={(e) => {
                    setSelectedDayRange(e)
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
                            <Button label="انتخاب تاریخ امروز" className="!mx-auto !px-2 !py-1 bg-gray-500" onClick={selectTodayHandler} />
                        </div>
                    )
                }}
                shouldHighlightWeekends
                renderInput={renderCustomInput}
                locale={'fa'}
                calendarPopperPosition={'auto'}
            />
        </div>
    )
}