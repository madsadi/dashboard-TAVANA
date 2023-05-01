import React, {Dispatch, Fragment, memo} from "react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import {dateRangeHandler, FindEnum} from "../functions/common-funcions";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import SymbolSearchSection from "./SymbolSearchSecion";
import {DayValue} from "react-modern-calendar-datepicker";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type PropsType = {
    query: any,
    onChange: any,
    item: any,
    selectedDayRange: DayRange,
    setSelectedDayRange: Dispatch<DayRange>,
    dynamicsOption: any,
    selectedDay: DayValue,
    setSelectedDay: Dispatch<DayValue>,
}
const InputComponent = ({
                            onChange,
                            query,
                            item,
                            selectedDayRange,
                            setSelectedDayRange,
                            selectedDay,
                            setSelectedDay,
                            dynamicsOption
                        }: PropsType) => {

    const {title, name, type, valueType} = item
    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">{name}</label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    const singleDateHandler = (selectedDay: DayValue) => {
        if (selectedDay) {
            return Object.values(selectedDay).map((item: any) => item).reverse().join('-')
        }
    }
    const renderSingleDateCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ </label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={singleDateHandler(selectedDay)}/>
        </div>
    )

    const clear = () => {
        ['StartDate', 'EndDate'].map((item: string) => onChange(item, ''))
    }

    const componentRender = () => {
        switch (type) {
            case "singleDate":
                return (
                    <div>
                        <DatePicker
                            value={selectedDay}
                            locale={'fa'}
                            calendarPopperPosition={'auto'}
                            onChange={(e) => {
                                setSelectedDay(e);
                                onChange(
                                    'date', `${moment.from(`${e?.year}/${e?.month}/${e?.day}`, 'en', 'YYYY/MM/DD').format('YYYY-MM-DDTHH:MM:SS')}`
                                )
                            }}
                            renderInput={renderSingleDateCustomInput}
                            shouldHighlightWeekends
                        />
                    </div>
                )
            case "date":
                return (
                    <div>
                        <DatePicker
                            value={selectedDayRange}
                            onChange={(e) => {
                                setSelectedDayRange(e)
                                if (e.from) {
                                    onChange(
                                        'StartDate', `${moment.from(`${e.from?.year}/${e.from?.month}/${e.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                                    )
                                }
                                if (e.to) {
                                    onChange(
                                        'EndDate', `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                                    )
                                }
                            }}
                            shouldHighlightWeekends
                            renderInput={renderCustomInput}
                            locale={'fa'}
                            calendarPopperPosition={'auto'}
                            renderFooter={() => (
                                <div className={'flex justify-center'} style={{padding: '5px 3px'}}>
                                    <button
                                        type="button"
                                        style={{padding: '1px 3px'}}
                                        className={'button bg-orange-300 p-2'}
                                        onClick={() => {
                                            setSelectedDayRange({from: null, to: null})
                                            clear()
                                        }}
                                    >
                                        پاک کن
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                )
            case "input":
                return (
                    <div>
                        <label className={'block'} htmlFor={title}>{name}</label>
                        <input className={'w-full'} type={valueType || 'text'}
                               dir={valueType === 'number' ? 'ltr' : 'rtl'} id={title} value={query?.[title]}
                               onChange={(e) => {
                                   if (valueType === 'number') {
                                       onChange(title, Number(e.target.value))
                                   } else {
                                       onChange(title, e.target.value)
                                   }
                               }}/>
                    </div>
                )
            case "selectInput":
                return (
                    <div>
                        <label className={'mt-auto'} htmlFor={title}>{name}</label>
                        <div className="relative rounded">
                            <Listbox name={title} value={query?.[title]}
                                     onChange={(e) => {
                                         if (valueType === 'number') {
                                             onChange(title, Number(e))
                                         } else {
                                             onChange(title, e)
                                         }
                                     }}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{FindEnum(title, dynamicsOption, name).find((item: any) => item.id === query?.[title])?.title}</span>
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
                                                {FindEnum(title, dynamicsOption, name).map((item: any) => (
                                                    <Listbox.Option
                                                        key={item.id}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'bg-border' : '',
                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                            )
                                                        }
                                                        value={item.id}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.title}
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

                )
            case "selectInputTime":
                return (
                    <div className={'flex items-center space-x-reverse space-x-2'}>
                        <label className={'mt-auto'} htmlFor={title}>{name}</label>
                        <div className={'grow'}>
                            <div className="relative rounded">
                                <Listbox name={title === 'startHour' ? 'startMinute' : 'endMinute'}
                                         value={query?.[title === 'startHour' ? 'startMinute' : 'endMinute']}
                                         onChange={(e) => onChange(title === 'startHour' ? 'startMinute' : 'endMinute', e)}>
                                    {({open}) => (
                                        <div className="relative">
                                            <Listbox.Button
                                                className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{FindEnum(title, dynamicsOption).minutes.find((item: any) => item === query?.[title === 'startHour' ? 'startMinute' : 'endMinute'])}</span>
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
                                                    {FindEnum(title, dynamicsOption).minutes.map((item: any) => (
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
                        <div>
                            :
                        </div>
                        <div className={'grow'}>
                            <div className="relative rounded">
                                <Listbox name={title} value={query?.[title]}
                                         onChange={(e) => onChange(title, e)}>
                                    {({open}) => (
                                        <div className="relative">
                                            <Listbox.Button
                                                className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{FindEnum(title, dynamicsOption).hours.find((item: any) => item === query?.[title])}</span>
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
                                                    {FindEnum(title, dynamicsOption).hours.map((item: any) => (
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

                )
            case "dynamicSelectInput":
                return (
                    <div>
                        <label className={'mt-auto'} htmlFor={title}>{name}</label>
                        <div className="relative rounded">
                            <Listbox name={title} value={query?.[title]}
                                     onChange={(e) => {
                                         onChange(title, e);
                                     }}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{query?.[title]?.displayName}</span>
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
                                                {dynamicsOption?.map((item: any) => (
                                                    <Listbox.Option
                                                        key={item.name}
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
                                                                        {item.displayName}
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

                )
            case "search":
                return (
                    <div>
                        <SymbolSearchSection query={query} queryUpdate={onChange}/>
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

export default InputComponent;

InputComponent.defaultProps = {
    setSelectedDayRange: null,
    selectedDayRange: '',
    dynamicsOption: [],
    setSelectedDay: null,
    selectedDay: null,
    queryUpdateAlternative: null
}
