import React, {Fragment, useEffect, useState} from "react";
import DatePicker, {Day, DayRange, DayValue} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import {dateRangeHandler, jalali} from "../commonFn/commonFn";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {Options, orderOrigin, orderTechnicalOrigin, sides, TypeOfBranches} from "../commonFn/Enums";
import SymbolSearchSection from "./SymbolSearchSecion";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function InputComponent({
                                           query,
                                           queryUpdate,
                                           title,
                                           name,
                                           type,
                                           selectedDayRange,
                                           setSelectedDayRange
                                       }: {
    query: any, queryUpdate: any, title: string, name: string, type: string, selectedDayRange: DayRange,
    setSelectedDayRange: any
}) {

    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    const FindEnum = () => {
        switch (title) {
            case 'Side':
            case 'orderSide':
                return sides
            case 'Deleted':
            case 'IsDeleted':
                return Options
            case 'orderTechnicalOrigin':
                return orderTechnicalOrigin
            case 'orderOrigin':
                return orderOrigin
            case 'Type':
                return TypeOfBranches
            default:
                return []
        }
    }
    const componentRender = () => {
        switch (type) {
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
                            calendarPopperPosition={'bottom'}
                        />
                    </div>
                )
            case "input":
                return (
                    <div>
                        <label className={'block'} htmlFor={title}>{name}</label>
                        <input className={'w-full'} id={title} value={query?.[title]}
                               onChange={(e) => queryUpdate(title, e.target.value)}/>
                    </div>
                )
            case "selectInput":
                return (
                    <div>
                        <label className={'mt-auto'} htmlFor={title}>{name}</label>
                        <div className="relative rounded">
                            <Listbox name={title} value={query?.[title]}
                                     onChange={(e) => queryUpdate(title, e)}>
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
