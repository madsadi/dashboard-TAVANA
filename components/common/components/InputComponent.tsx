import React, {Dispatch, Fragment} from "react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import {dateRangeHandler} from "../functions/common-funcions";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {
    activeStatus, category, Hours, isRequired, Minutes, operators,
    Options,
    orderOrigin, orderStatus,
    orderTechnicalOrigin,
    OrderType, originEnum,
    sides,
    TypeOfBranches,
    validityType
} from "../../../dictionary/Enums";
import SymbolSearchSection from "./SymbolSearchSecion";
import {DayValue} from "react-modern-calendar-datepicker";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

type PropsType = {
    query: any,
    setQuery: Dispatch<any>,
    title: string,
    name: string,
    type: string,
    selectedDayRange: DayRange,
    setSelectedDayRange: Dispatch<DayRange>,
    valueType: string,
    dynamicsOption: any,
    selectedDay:DayValue,
    setSelectedDay:Dispatch<DayValue>,
}
export default function InputComponent({
                                           query,
                                           setQuery,
                                           title,
                                           name,
                                           type,
                                           selectedDayRange,
                                           setSelectedDayRange,
                                           selectedDay,
                                           setSelectedDay,
                                           valueType,
                                           dynamicsOption
                                       }: PropsType) {

    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    const singleDateHandler = (selectedDay:DayValue)=>{
        if (selectedDay){
            return Object.values(selectedDay).map((item:any)=>item).reverse().join('-')
        }
    }
    const renderSingleDateCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ </label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={singleDateHandler(selectedDay)}/>
        </div>
    )

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const clear = ()=>{
        let _query: any = {...query};
        _query['StartDate'] = ''
        _query['EndDate'] = ''
        setQuery(_query)

    }
    const FindEnum = () => {
        switch (title) {
            case 'variable':
                return dynamicsOption
            case 'api':
                return category
            case 'startHour':
            case 'endHour':
                return {hours: Hours, minutes: Minutes}
            case 'isActive':
            case 'IsActive':
                return activeStatus
            case 'operator':
                return operators
            case 'OrderType':
                return OrderType
            case 'OrderStatus':
                return orderStatus
            case 'ApplicationSource':
                return originEnum
            case 'ValidityType':
                return validityType
            case 'Side':
            case 'orderSide':
            case 'OrderSide':
                return sides
            case 'Deleted':
            case 'IsDeleted':
                return Options
            case 'orderTechnicalOrigin':
                return orderTechnicalOrigin
            case 'orderOrigin':
                return orderOrigin
            case 'type':
                return TypeOfBranches
            case 'isBourseCodeRequired':
            case 'isRequired':
                return isRequired
            default:
                return []
        }
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
                            onChange={(e)=> {
                                setSelectedDay(e);
                                queryUpdate(
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
                                    queryUpdate(
                                        'StartDate', `${moment.from(`${e.from?.year}/${e.from?.month}/${e.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                                    )
                                }
                                if (e.to) {
                                    queryUpdate(
                                        'EndDate', `${moment.from(`${e.to?.year}/${e.to?.month}/${e.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')}`
                                    )
                                }
                            }}
                            shouldHighlightWeekends
                            renderInput={renderCustomInput}
                            locale={'fa'}
                            calendarPopperPosition={'auto'}
                            renderFooter={() => (
                                <div className={'flex justify-center'} style={{padding:'5px 3px'}}>
                                    <button
                                        type="button"
                                        style={{padding:'1px 3px'}}
                                        className={'button bg-orange-300 p-2'}
                                        onClick={() => {
                                            setSelectedDayRange({from:null,to:null})
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
                        <input className={'w-full'} type={valueType || 'text'} id={title} value={query?.[title]}
                               onChange={(e) => {
                                   if (valueType === 'number') {
                                       queryUpdate(title, Number(e.target.value))
                                   } else {
                                       queryUpdate(title, e.target.value)
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
                                             queryUpdate(title, Number(e))
                                         } else {
                                             queryUpdate(title, e)
                                         }
                                     }}>
                                {({open}) => (
                                    <div className="relative">
                                        <Listbox.Button
                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{FindEnum().find((item: any) => item.id === query?.[title])?.title}</span>
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
                                                {FindEnum().map((item: any) => (
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
                                <Listbox name={title === 'startHour' ? 'startMinute':'endMinute'} value={query?.[title === 'startHour' ? 'startMinute':'endMinute']}
                                         onChange={(e) => queryUpdate(title === 'startHour' ? 'startMinute':'endMinute', e)}>
                                    {({open}) => (
                                        <div className="relative">
                                            <Listbox.Button
                                                className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{FindEnum().minutes.find((item: any) => item === query?.[title === 'startHour' ? 'startMinute':'endMinute'])}</span>
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
                                                    {FindEnum().minutes.map((item: any) => (
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
                                         onChange={(e) => queryUpdate(title, e)}>
                                    {({open}) => (
                                        <div className="relative">
                                            <Listbox.Button
                                                className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                            <span className="flex items-center">
                                                <span
                                                    className="ml-2 block truncate text-sm">{FindEnum().hours.find((item: any) => item === query?.[title])}</span>
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
                                                    {FindEnum().hours.map((item: any) => (
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
                                         queryUpdate(title, e);
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
                        <SymbolSearchSection query={query} queryUpdate={queryUpdate}/>
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

InputComponent.defaultProps = {
    setSelectedDayRange: null,
    selectedDayRange: '',
    dynamicsOption:[],
    setSelectedDay:null,
    selectedDay: null
}
