import React, {Dispatch, Fragment,useState} from "react";
import DatePicker ,{DayValue} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import { FindEnum} from "../common/functions/common-funcions";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function ExtraDateAndTimeInput({query,setQuery}:{query:any,setQuery:Dispatch<any>}){
    const [customerApprovalDate, setCustomerApprovalDate] = useState<DayValue>(null);
    const [adminApprovalDate, setAdminApprovalDate] = useState<DayValue>(null);
    const [endDate, setEndDate] = useState<DayValue>(null);
    const [startDate, setStartDate] = useState<DayValue>(null);

    const singleDateHandler = (selectedDay:DayValue)=>{
        if (selectedDay){
            return Object.values(selectedDay).map((item:any)=>item).reverse().join('-')
        }
    }
    const customerApprovalDateInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ </label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={singleDateHandler(customerApprovalDate)}/>
        </div>
    )
    const adminApprovalDateInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ </label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={singleDateHandler(adminApprovalDate)}/>
        </div>
    )
    const endDateInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ </label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={singleDateHandler(endDate)}/>
        </div>
    )
    const startDateInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ </label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={singleDateHandler(startDate)}/>
        </div>
    )

    const queryUpdateDateAndTime = (parent:string,child:string,value:any)=>{
        let _query: any = {...query};
        let childObject:any = _query[`${parent}`] || {}
        childObject[`${child}`] = value
        _query[`${parent}`] = childObject
        setQuery(_query)
    }

    return(
        <div className={'grid grid-cols-2 gap-4'}>
            <div className={'z-[2]'}>
                <label className={'mt-auto'}>زمان تائید مشتری</label>
                <DatePicker
                    value={customerApprovalDate}
                    onChange={(e) => {
                        setCustomerApprovalDate(e)
                        queryUpdateDateAndTime(
                        'customerApprovalDateTime', 'date',`${moment.from(`${e?.year}/${e?.month}/${e?.day}`, 'en', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                        )
                    }}
                    shouldHighlightWeekends
                    renderInput={customerApprovalDateInput}
                    locale={'fa'}
                    calendarPopperPosition={'top'}
                />
                <div className={'flex items-center space-x-reverse space-x-2'}>
                    <div className={'grow'}>
                        <label className={'text-sm'}>دقیقه</label>
                        <div className="relative rounded">
                            <Listbox name={'minute'} value={query?.customerApprovalDateTime?.minute}
                                     onChange={(e) => queryUpdateDateAndTime('customerApprovalDateTime','minute', `${e}:00`)}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.customerApprovalDateTime?.minute?.split(':')?.[0]}</span>
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
                                                className="absolute z-10 mt-1 min-w-full max-h-40 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                {FindEnum('customerApprovalDateTime',[]).minutes.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item}
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
                    <div className={'mt-auto'}>
                        :
                    </div>
                    <div className={'grow'}>
                        <label className={'text-sm'}>ساعت</label>
                        <div className="relative rounded">
                            <Listbox name={'hour'} value={query?.customerApprovalDateTime?.hour}
                                     onChange={(e) => queryUpdateDateAndTime('customerApprovalDateTime','hour', `T${e}:`)}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.customerApprovalDateTime?.hour?.split('T')?.[1].split(':')[0]}</span>
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
                                                className="absolute z-10 mt-1 min-w-full max-h-40 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                {FindEnum('customerApprovalDateTime',[]).hours.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item}
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
            </div>
            <div className={'z-[2]'}>
                <label className={'mt-auto'}>زمان تائید امین</label>
                <DatePicker
                    value={adminApprovalDate}
                    onChange={(e) => {
                        setAdminApprovalDate(e)
                        queryUpdateDateAndTime(
                            'adminApprovalDateTime','date', `${moment.from(`${e?.year}/${e?.month}/${e?.day}`, 'en', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                        )
                    }}
                    shouldHighlightWeekends
                    renderInput={adminApprovalDateInput}
                    locale={'fa'}
                    calendarPopperPosition={'top'}
                />
                <div className={'flex items-center space-x-reverse space-x-2'}>
                    <div className={'grow'}>
                        <label>دقیقه</label>
                        <div className="relative rounded">
                            <Listbox name={'minute'} value={query?.adminApprovalDateTime?.minute}
                                     onChange={(e) => queryUpdateDateAndTime('adminApprovalDateTime','minute', `${e}:00`)}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.adminApprovalDateTime?.minute?.split(':')?.[0]}</span>
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
                                                className="absolute z-10 mt-1 min-w-full max-h-40 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                {FindEnum('adminApprovalDateTime',[]).minutes.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item}
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
                    <div className={'mt-auto'}>
                        :
                    </div>
                    <div className={'grow'}>
                        <label>ساعت</label>
                        <div className="relative rounded">
                            <Listbox name={'hour'} value={query?.adminApprovalDateTime?.hour}
                                     onChange={(e) => queryUpdateDateAndTime('adminApprovalDateTime','hour', `T${e}:`)}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.adminApprovalDateTime?.hour?.split('T')?.[1].split(':')[0]}</span>
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
                                                className="absolute z-10 mt-1 min-w-full max-h-40 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                {FindEnum('adminApprovalDateTime',[]).hours.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item}
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
            </div>
            <div className={'z-[1]'}>
                <label className={'mt-auto'}>تاریخ شروع</label>
                <DatePicker
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e)
                        queryUpdateDateAndTime(
                            'startDateTime','date', `${moment.from(`${e?.year}/${e?.month}/${e?.day}`, 'en', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                        )
                    }}
                    shouldHighlightWeekends
                    renderInput={startDateInput}
                    locale={'fa'}
                    calendarPopperPosition={'top'}
                />
                <div className={'flex items-center space-x-reverse space-x-2'}>
                    <div className={'grow'}>
                        <label>دقیقه</label>
                        <div className="relative rounded">
                            <Listbox name={'minute'} value={query?.startDateTime?.minute}
                                     onChange={(e) => queryUpdateDateAndTime('startDateTime','minute', `${e}:00`)}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.startDateTime?.minute?.split(':')?.[0]}</span>
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
                                                className="absolute z-10 mt-1 min-w-full max-h-40 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                {FindEnum('startDateTime',[]).minutes.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item}
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
                    <div className={'mt-auto'}>
                        :
                    </div>
                    <div className={'grow'}>
                        <label>ساعت</label>
                        <div className="relative rounded">
                            <Listbox name={'hour'} value={query?.startDateTime?.hour}
                                     onChange={(e) => queryUpdateDateAndTime('startDateTime','hour', `T${e}:`)}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.startDateTime?.hour?.split('T')?.[1].split(':')[0]}</span>
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
                                                className="absolute z-10 mt-1 min-w-full max-h-40 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                {FindEnum('startDateTime',[]).hours.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item}
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
            </div>
            <div className={'z-[1]'}>
                <label className={'mt-auto'}>تاریخ پایان</label>
                <DatePicker
                    value={endDate}
                    onChange={(e) => {
                        setEndDate(e)
                        queryUpdateDateAndTime(
                            'endDateTime','date', `${moment.from(`${e?.year}/${e?.month}/${e?.day}`, 'en', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                        )
                    }}
                    shouldHighlightWeekends
                    renderInput={endDateInput}
                    locale={'fa'}
                    calendarPopperPosition={'top'}
                />
                <div className={'flex items-center space-x-reverse space-x-2'}>
                    <div className={'grow'}>
                        <label>دقیقه</label>
                        <div className="relative rounded">
                            <Listbox name={'minute'} value={query?.endDateTime?.minute}
                                     onChange={(e) => queryUpdateDateAndTime('endDateTime','minute', `${e}:00`)}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.endDateTime?.minute?.split(':')?.[0]}</span>
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
                                                className="absolute z-10 mt-1 min-w-full max-h-40 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                {FindEnum('endDateTime',[]).minutes.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item}
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
                    <div className={'mt-auto'}>
                        :
                    </div>
                    <div className={'grow'}>
                        <label>ساعت</label>
                        <div className="relative rounded">
                            <Listbox name={'hour'} value={query?.endDateTime?.hour}
                                     onChange={(e) => queryUpdateDateAndTime('endDateTime','hour', `T${e}:`)}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.endDateTime?.hour?.split('T')?.[1].split(':')[0]}</span>
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
                                                className="absolute z-10 mt-1 min-w-full max-h-40 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                                {FindEnum('endDateTime',[]).hours.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item}
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
            </div>
        </div>
    )
}