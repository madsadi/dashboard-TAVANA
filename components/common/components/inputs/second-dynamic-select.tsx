import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { FilterItemType } from "types/constant-filters.types";
import { EnumType } from "types/types";
import { classNames } from "../../functions/common-funcions";

interface BaseInputPropsType {
    item: FilterItemType,
    value: any,
    onChange: (key: string, value: any) => void,
    dynamicsOption?: EnumType[]
}
export const SecondDynamicSelect = (props: BaseInputPropsType) => {
    const { item, value, onChange, dynamicsOption } = props;
    const { name, title } = item

    return (
        <div>
            <label className={'flex items-center mt-auto text-sm'} htmlFor={title}>{name}</label>
            <div className="relative rounded">
                <Listbox name={title} value={value}
                    onChange={(e) => {
                        onChange(title, e);
                    }}>
                    {({ open }) => (
                        <div className="relative">
                            <Listbox.Button
                                className="relative flex min-w-full h-[36px] cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                <span className="flex items-center">
                                    <span
                                        className="ml-2 block truncate text-sm">{value?.displayName}</span>
                                </span>
                                <span className="pointer-events-none flex items-center mr-auto">
                                    <ChevronDownIcon className="h-5 w-5 text-gray-400"
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
                                    className="absolute z-10 mt-1 min-w-full max-h-56 divide-y divide-border bg-white border border-border overflow-auto custom-scrollbar rounded-md focus:outline-none">
                                    {dynamicsOption?.map((item: any) => (
                                        <Listbox.Option
                                            key={item.name}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-border' : '',
                                                    'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                )
                                            }
                                            value={item}
                                        >
                                            {({ selected, active }) => (
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
        </div>
    )
}