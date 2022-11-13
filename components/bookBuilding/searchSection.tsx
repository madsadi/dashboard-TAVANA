import React, {Fragment, useState} from 'react';
import {getBookBuilding} from "../../api/bookBuilding";
import {useDispatch} from "react-redux";
import {bookBuildingResult} from "../../store/bookBuildingConfig";
import {toast} from "react-toastify";
import {Accordion} from "flowbite-react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchSection() {
    const [val1, setVal1] = useState<{ name: string, code: any }>({name: 'همه', code: 'GetAll'});

    const dispatch = useDispatch()

    const options = [
        {name: 'فعال', code: 'GetAllActive'},
        {name: 'همه', code: 'GetAll'},
    ];

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await getBookBuilding(`${val1}`).then(res => {
            dispatch(bookBuildingResult(res?.result));
            toast.success('با موفقیت انجام شد')
        })
            .catch(err => toast.success('نا موفق'))
    }

    return (
        <form className="flex items-center" onSubmit={onSubmit}>
            <div className={'flex items-center'}>
                <span>دسته بندی:</span>
                <div className="relative rounded mr-3">
                    <Listbox name={'status'} value={val1}
                             onChange={(e) => setVal1(e)}>
                        {({open}) => (
                            <div className="relative">
                                <Listbox.Button
                                    className="relative flex min-w-[100px] cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{options.find((item: any) => item.code === val1)?.name}</span>
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
                                        {options.map((origin: any) => (
                                            <Listbox.Option
                                                key={origin.name}
                                                className={({active}) =>
                                                    classNames(
                                                        active ? 'bg-border' : '',
                                                        'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                    )
                                                }
                                                value={origin.code}
                                            >
                                                {({selected, active}) => (
                                                    <>
                                                        <div className="flex items-center">
                                                                    <span>
                                                                        {origin.name}
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
            <button className={'p-1 px-3 bg-lime-600 rounded-full mr-3'} type={'submit'}>
                جستجو
            </button>
        </form>
    );
}
