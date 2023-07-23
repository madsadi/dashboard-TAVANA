import React, { Fragment, useEffect, useState } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    ChevronUpIcon, CheckIcon
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import { formatDecimals } from "../functions/common-funcions";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { isAllowed } from "../functions/permission-utils";
import { useSelector } from "react-redux";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function TablePagination({
    query,
    onSubmit,
    totalCount = 0,
    module
}: { query: any, onSubmit: Function, totalCount: number, module: string }) {

    const { user_permissions: userPermissions } = useSelector((state: any) => state.appConfig)
    const [pageQuery, setPageQuery] = useState({ PageSize: 20, PageNumber: 1 })
    const { service, module: scrope } = useSearchFilters(module)

    const sizes = [10, 20, 50, 100, 200, 300, 400, 500, 1000]
    const queryUpdate = (key: string, value: any) => {
        let _query: any = { ...pageQuery };
        _query[key] = value;
        setPageQuery(_query)
    }

    useEffect(() => {
        queryUpdate('PageNumber', 1)
    }, [pageQuery?.PageSize])

    useEffect(() => {
        if (query?.PageNumber && query?.PageSize) setPageQuery(query)
    }, [query])

    return (
        <div className={'flex items-center mx-auto py-3 space-x-2 space-x-reverse'}>
            <div className="relative rounded">
                <Listbox disabled={!isAllowed({ userPermissions, whoIsAllowed: [[service, scrope, 'Read'].join('.')] })} name={'PageSize'} value={pageQuery?.PageSize}
                    onChange={(e: any) => {
                        queryUpdate('PageSize', e);
                        onSubmit({ ...pageQuery, PageNumber: 1, PageSize: e })
                    }}>
                    {({ open }) => (
                        <div className="relative">
                            <Listbox.Button
                                className="relative flex min-w-full cursor-pointer rounded-md border border-border disabled:cursor-not-allowed bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                <span className="flex items-center">
                                    <span
                                        className="ml-2 block truncate text-sm">{pageQuery?.PageSize}</span>
                                </span>
                                <span className="pointer-events-none flex items-center mr-auto">
                                    <ChevronUpIcon className="h-5 w-5 text-gray-400"
                                        aria-hidden="false" />
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
                                    className="absolute z-10 mb-1 bottom-full min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                    {sizes.map((size: any) => (
                                        <Listbox.Option
                                            key={size}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-border' : '',
                                                    'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                )
                                            }
                                            value={size}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <span>
                                                            {size}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? '' : '',
                                                                    'flex items-center mr-auto'
                                                                )}
                                                            >
                                                                <CheckIcon className="h-5 w-5"
                                                                    aria-hidden="true" />
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
            <button onClick={(e) => {
                queryUpdate('PageNumber', 1)
                onSubmit({ ...pageQuery, PageNumber: 1 })
            }}
                className={`${pageQuery?.PageNumber <= 1 ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                disabled={pageQuery?.PageNumber <= 1}>
                <ChevronDoubleRightIcon className={'h-4 w-4'} />
            </button>
            <button onClick={(e) => {
                queryUpdate('PageNumber', pageQuery?.PageNumber - 1)
                onSubmit({ ...pageQuery, PageNumber: pageQuery?.PageNumber - 1 })
            }}
                className={`${pageQuery?.PageNumber <= 1 ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                disabled={pageQuery?.PageNumber <= 1}>
                <ChevronRightIcon className={'h-4 w-4'} />
            </button>
            <div className={'text-center'}>
                <div
                    className={'h-fit'}>صفحه {pageQuery?.PageNumber > Math.ceil(totalCount / pageQuery?.PageSize) ? 0 : pageQuery?.PageNumber}<span
                        className={'mx-4'}>از</span>{Math.ceil(totalCount / pageQuery?.PageSize)} </div>
                <div className={'text-xs text-mute'}>
                    {formatDecimals(totalCount)} نتیجه یافت شد
                </div>
            </div>
            <button onClick={(e) => {
                queryUpdate('PageNumber', pageQuery?.PageNumber + 1)
                onSubmit({ ...pageQuery, PageNumber: pageQuery?.PageNumber + 1 })
            }}
                className={`${pageQuery?.PageNumber >= Math.ceil(totalCount / pageQuery?.PageSize) ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                disabled={pageQuery?.PageNumber >= Math.ceil(totalCount / pageQuery?.PageSize)}>
                <ChevronLeftIcon className={'h-4 w-4'} />
            </button>
            <button onClick={(e) => {
                queryUpdate('PageNumber', Math.ceil(totalCount / pageQuery?.PageSize))
                onSubmit({ ...pageQuery, PageNumber: Math.ceil(totalCount / pageQuery?.PageSize) })
            }}
                className={`${pageQuery?.PageNumber >= Math.ceil(totalCount / pageQuery?.PageSize) ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                disabled={pageQuery?.PageNumber >= Math.ceil(totalCount / pageQuery?.PageSize)}>
                <ChevronDoubleLeftIcon className={'h-4 w-4'} />
            </button>
        </div>
    )
}