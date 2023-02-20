import React, {Fragment, useEffect, useState} from "react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import moment from "jalali-moment";
import {dateRangeHandler} from "../functions/common-funcions";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import {
    activeStatus, operators,
    Options,
    orderOrigin, orderStatus,
    orderTechnicalOrigin,
    OrderType, originEnum,
    sides,
    TypeOfBranches,
    validityType
} from "../../../dictionary/Enums";
import SymbolSearchSection from "./SymbolSearchSecion";
import {filedList, remoteUrl} from "../../../api/market-rules-management.api";
import {toast} from "react-toastify";

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
                                           setSelectedDayRange,
                                           valueType,
                                           dynamicsOption
                                       }: {
    query: any, queryUpdate: any, title: string, name: string, type: string, selectedDayRange: DayRange,
    setSelectedDayRange: any, valueType: string, dynamicsOption: any
}) {

    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input className={'w-full'} readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    const FindEnum = () => {
        switch (title) {
            case 'variable':
                return dynamicsOption
            case 'isActive':
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
            case 'IsActive':
                return Options
            case 'orderTechnicalOrigin':
                return orderTechnicalOrigin
            case 'orderOrigin':
                return orderOrigin
            case 'type':
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
                            calendarPopperPosition={'auto'}
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
    dynamicsOption:[]
}
