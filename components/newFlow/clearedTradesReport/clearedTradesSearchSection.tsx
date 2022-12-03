import React, {Fragment, useState} from 'react';
import {useDispatch} from "react-redux";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {clearedTradesReportSearch} from "../../../api/clearedTradesReport";
import {clearedTradesResult} from "../../../store/netFlowConfig";
import moment from "jalali-moment";
import {toast} from "react-toastify";
import {Accordion} from "flowbite-react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function ClearedTradesSearchSection() {
    const [Ticket, setTicket] = useState<string>('');
    const [Symbol, setSymbol] = useState<string>('');
    const [InstrumentId, setInstrumentId] = useState<string>('');
    const [Side, setSide] = useState<{ name: string, code: any }>({name: 'خرید', code: '1'});
    const [totalCount, setTotalCount] = useState<number>(0);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const dispatch = useDispatch()

    const options = [
        {name: 'خرید', code: '1'},
        {name: 'فروش', code: '2'},
        {name: 'هردو'},
    ];

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


    const onSubmit = async (event: any) => {
        event.preventDefault()
        await clearedTradesReportSearch('/Report/cleared-trade', [
                {StartDate: moment.from(`${selectedDayRange.from ? selectedDayRange.from.year : ''}/${selectedDayRange.from ? selectedDayRange.from.month : ''}/${selectedDayRange.from ? selectedDayRange.from.day : ''}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')},
                {EndDate: moment.from(`${selectedDayRange.to ? selectedDayRange.to.year : ''}/${selectedDayRange.to ? selectedDayRange.to.month : ''}/${selectedDayRange.to ? selectedDayRange.to.day : ''}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')},
                {Ticket: Ticket},
                {Symbol: Symbol},
                {Side: Side.code}],
            // {InstrumentId: setInstrumentId}],
        ).then(res => {
            dispatch(clearedTradesResult(res?.result));
            setTotalCount(res?.result?.length)
            toast.success('با موفقیت انجام شد')
        })
            .catch(() => toast.error('ناموفق'))
    }

    return (
        <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
            <Accordion.Panel>
                <Accordion.Title style={{padding: '0.5rem'}}>
                    جستجو
                    <span className={'mx-3'}>
                    {totalCount}
                        </span>
                </Accordion.Title>
                <Accordion.Content style={{transition: 'all'}}>
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-3 gap-4">
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
                            <div>
                                <label className={'block'} htmlFor="ticket">شماره تیکت</label>
                                <input className={'w-full'} id="ticket" value={Ticket}
                                       onChange={(e) => setTicket(e.target.value)}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="symbol">نماد</label>
                                <input className={'w-full'} id="symbol" value={Symbol}
                                       onChange={(e) => setSymbol(e.target.value)}/>
                            </div>

                            <div>
                                <label className={'block'} htmlFor="InstrumentId">شناسه نماد</label>
                                <input className={'w-full'} id="InstrumentId" value={InstrumentId}
                                       onChange={(e) => setInstrumentId(e.target.value)}/>
                            </div>

                            <div>
                                <div className={'mt-auto'}>دسته بندی</div>
                                <div className="relative rounded">
                                    <Listbox name={'Deleted'} value={Side}
                                             onChange={(e) => setSide(e)}>
                                        {({open}) => (
                                            <div className="relative">
                                                <Listbox.Button
                                                    className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{options.find((item: any) => item.code === Side)?.name}</span>
                                                        </span>
                                                    <span className="pointer-events-none flex items-center mr-auto">
                                                            <ChevronDownIcon className="h-5 w-5 text-gray-400"
                                                                             aria-hidden="false"/>
                                                        </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options
                                                        className="absolute z-10 mt-1 min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                        {options.map((item: any) => (
                                                            <Listbox.Option
                                                                key={item.name}
                                                                className={({active}) =>
                                                                    classNames(
                                                                        active ? 'bg-border' : '',
                                                                        'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                    )
                                                                }
                                                                value={item.code}
                                                            >
                                                                {({selected, active}) => (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                    <span>
                                                                        {item.name}
                                                                    </span>
                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? '' : '',
                                                                                        'flex items-center mr-auto'
                                                                                    )}
                                                                                >
                                                                        <CheckIcon className="h-5 w-5"
                                                                                   aria-hidden="true"/>
                                                                    </span>
                                                                            ) : null}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        )}
                                    </Listbox>
                                </div>

                            </div>
                        </div>
                        <button className={'p-1 px-2 rounded-full bg-lime-600 float-left my-4'} type={'submit'}>
                            جستجو
                        </button>
                    </form>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}
