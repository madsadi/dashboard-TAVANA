import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    ChevronUpIcon, CheckIcon
} from "@heroicons/react/20/solid";
import React, {Dispatch, Fragment} from "react";
import {apiCallToGetData} from "../../api/onlineTrade";
import {Listbox, Transition} from "@headlessui/react";
import Modal from "./Modal";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function TablePagination({
                                            query,
                                            gridRef,
                                            setQuery,
                                            api,
                                            totalCount,
                                            pagedData
                                        }: { query: any, gridRef: any, setQuery: Dispatch<any>, api: string, totalCount: number ,pagedData:boolean}) {

    const sizes=[10,20,50]
    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value;
        setQuery(_query)
    }

    const onGridReady = async (query: any) => {
        await apiCallToGetData(api, query)
            .then((res: any) => {
                if (pagedData){
                    gridRef.current?.api?.setRowData(res?.result?.pagedData);
                }else{
                    gridRef.current?.api?.setRowData(res?.result);
                }
            })
    };

    return (
        <div className={'flex items-center mx-auto py-3 space-x-2 space-x-reverse'}>
            <div className="relative rounded">
                <Listbox name={'PageSize'} value={query?.PageSize}
                         onChange={(e) => {
                             queryUpdate('PageSize', e);
                             onGridReady({...query, PageSize: e})
                         }}>
                    {({open}) => (
                        <div className="relative">
                            <Listbox.Button
                                className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{query?.PageSize}</span>
                                                        </span>
                                <span className="pointer-events-none flex items-center mr-auto">
                                                            <ChevronUpIcon className="h-5 w-5 text-gray-400"
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
                                    className="absolute z-10 mb-1 bottom-full min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                    {sizes.map((size: any) => (
                                        <Listbox.Option
                                            key={size}
                                            className={({active}) =>
                                                classNames(
                                                    active ? 'bg-border' : '',
                                                    'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                )
                                            }
                                            value={size}
                                        >
                                            {({selected, active}) => (
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

            <button onClick={() => {
                queryUpdate('PageNumber', 1)
                onGridReady({...query, PageNumber: 1})
            }}
                    className={`${query?.PageNumber <= 1 ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                    disabled={query?.PageNumber <= 1}>
                <ChevronDoubleRightIcon className={'h-4 w-4'}/>
            </button>
            <button onClick={() => {
                queryUpdate('PageNumber', query?.PageNumber - 1)
                onGridReady({...query, PageNumber: query?.PageNumber - 1})
            }}
                    className={`${query?.PageNumber <= 1 ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                    disabled={query?.PageNumber <= 1}>
                <ChevronRightIcon className={'h-4 w-4'}/>
            </button>
            <div className={'h-fit'}>صفحه {query?.PageNumber>Math.ceil(totalCount / query?.PageSize) ? 0:query?.PageNumber}<span
                className={'mx-4'}>از</span>{Math.ceil(totalCount / query?.PageSize)} </div>
            <button onClick={() => {
                queryUpdate('PageNumber', query?.PageNumber + 1)
                onGridReady({...query, PageNumber: query?.PageNumber + 1})
            }}
                    className={`${query?.PageNumber >= Math.ceil(totalCount / query?.PageSize) ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                    disabled={query?.PageNumber >= Math.ceil(totalCount / query?.PageSize)}>
                <ChevronLeftIcon className={'h-4 w-4'}/>
            </button>
            <button onClick={() => {
                queryUpdate('PageNumber', Math.ceil(totalCount / query?.PageSize))
                onGridReady({...query, PageNumber: Math.ceil(totalCount / query?.PageSize)})
            }}
                    className={`${query?.PageNumber >= Math.ceil(totalCount / query?.PageSize) ? 'text-gray-400' : 'hover:bg-gray-400'} rounded-full bg-border transition-all p-1`}
                    disabled={query?.PageNumber >= Math.ceil(totalCount / query?.PageSize)}>
                <ChevronDoubleLeftIcon className={'h-4 w-4'}/>
            </button>
        </div>
    )
}

TablePagination.defaultProps = {
    pagedData: true,
};