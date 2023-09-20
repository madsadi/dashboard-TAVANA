import DatePicker, {DayValue, utils} from "@amir04lm26/react-modern-calendar-date-picker";
import React, {useState} from "react";
import useMutation from "../../../hooks/useMutation";
import {NETFLOW} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";


export default function ClearingDateRange() {
    const {mutate} = useMutation({url:`${NETFLOW}/Trade/clearing-date-range`})
    const [toDate, setToDate] = useState<DayValue>(null);
    const [fromDate, setFromDate] = useState<DayValue>(null);
    const [settlementDelay, setSettlementDelay] = useState<string>('');

    const renderFromDateInput = ({ref}: { ref: any }) => (
        <input readOnly ref={ref}
                   value={fromDate ? `${fromDate?.year}-${fromDate?.month}-${fromDate?.day}` : ''}
                   aria-describedby="username1-help" className="block w-full text-center " placeholder={"تا تاریخ"}/>
    )
    const renderToDateInput = ({ref}: { ref: any }) => (
        <input readOnly ref={ref}
                   value={toDate ? `${toDate?.year}-${toDate?.month}-${toDate?.day}` : ''}
                   aria-describedby="username1-help" className="block w-full text-center my-4 " placeholder={"از تاریخ"}/>
    )

    const submitHandler = async () => {
        await mutate({fromDate:`${fromDate?.year}${fromDate && fromDate?.month<10 ? `0${fromDate?.month}`:fromDate?.month}${fromDate && fromDate?.day<10 ? `0${fromDate?.day}`:fromDate?.day}`,
            toDate:`${toDate?.year}${toDate && toDate?.month<10 ? `0${toDate?.month}`:toDate?.month}${toDate && toDate?.day<10 ? `0${toDate?.day}`:toDate?.day}`,
            settlementDelay: `${settlementDelay}`})
            .then(()=> throwToast({type:'success',value:'با موفقیت انجام شد'}))
            .catch((err)=> throwToast({type:'error',value:err}))
    }

    return (
        <div className={'bg-white p-2 rounded shadow-sm border border-border'}>
            <label htmlFor="username1" className="block mb-3">دریافت تسویه روزانه کارگزاری</label>
            <div className="dateRange">
                <div className='field z-[1]'>
                    <DatePicker
                        value={fromDate}
                        onChange={setFromDate}
                        maximumDate={utils('fa').getToday()}
                        renderInput={renderFromDateInput}
                        locale={'fa'}
                        shouldHighlightWeekends
                    />
                </div>
                <div className={'field z-0'}>
                    <DatePicker
                        value={fromDate}
                        onChange={setToDate}
                        maximumDate={utils('fa').getToday()}
                        renderInput={renderToDateInput}
                        locale={'fa'}
                        shouldHighlightWeekends
                    />
                </div>
                <div className={'field'}>
                    <input className="w-full text-center" placeholder='تاخیر در تسویه' value={settlementDelay} onChange={(e) => setSettlementDelay(e.target.value)}/>
                </div>
            </div>
            <button onClick={submitHandler} className="button bg-primary mt-5">بروزرسانی</button>
        </div>
    )
}