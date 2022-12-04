import {Accordion} from "flowbite-react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import React, {Dispatch, useState} from "react";
import {clearedTradesReportSearch} from "../../api/clearedTradesReport";
import {toast} from "react-toastify";

export default function AccordionComponent({initialValue,gridRef,api,setTotalCount,query,setQuery}:{initialValue:any,gridRef:any,api:string,setTotalCount:Dispatch<number>,query:any,setQuery:Dispatch<any>}){
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

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

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await clearedTradesReportSearch(api,
            {StartDate: selectedDayRange.from ? moment.from(`${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'):'',
                EndDate: selectedDayRange.to ? moment.from(`${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'):'',
                EnTierName: query.EnTierName,
                SettlementDelay: query.SettlementDelay,
                PageNumber: query.PageNumber,
                PageSize: query.PageSize},
        ).then(res => {
            gridRef?.current?.api?.setRowData(res?.result)
            setTotalCount(res?.totalRecord)
            toast.success('با موفقیت انجام شد')
        })
            .catch(() => toast.error('ناموفق'))
    }

    return(
        <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
            <Accordion.Panel>
                <Accordion.Title style={{padding: '0.5rem'}}>
                    جستجو
                </Accordion.Title>
                <Accordion.Content style={{transition: 'all'}}>
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-5 gap-4">
                            <div>
                                <DatePicker
                                    value={selectedDayRange}
                                    onChange={(e)=>{
                                        setSelectedDayRange(e)
                                        if (e.from) {
                                            setQuery({
                                                ...query,
                                                StartDate: `${moment.from(`${e.from?.year}/${e.from?.month}/${e.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                                            })
                                        }
                                        if (e.to) {
                                            setQuery({
                                                ...query,
                                                EndDate: `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                                            })
                                        }
                                    }}
                                    shouldHighlightWeekends
                                    renderInput={renderCustomInput}
                                    locale={'fa'}
                                    calendarPopperPosition={'bottom'}
                                />
                            </div>
                            <div>
                                <label className={'block'} htmlFor="SettlementDelay">تاخیر</label>
                                <input className={'w-full'} id="SettlementDelay" value={query.SettlementDelay}
                                       onChange={(e) => queryUpdate('SettlementDelay', e.target.value)}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="EnTierName">نام انگلیسی گروه</label>
                                <input className={'w-full'} id="EnTierName" value={query.EnTierName}
                                       onChange={(e) => queryUpdate('EnTierName', e.target.value)}/>
                            </div>
                        </div>
                        <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                            <button className={'p-1 px-2 rounded-full bg-red-600'} onClick={(e)=>{
                                e.preventDefault()
                                setSelectedDayRange({from:null,to:null})
                                setQuery(initialValue)
                            }}>
                                لغو
                            </button>
                            <button className={'p-1 px-2 rounded-full bg-lime-600 '} type={'submit'}>
                                جستجو
                            </button>
                        </div>
                    </form>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>

    )
}