import React, {Fragment, useRef, useState} from 'react';
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {useDispatch} from "react-redux";
import {instrumentSearchResult} from "../../../store/commissionConfig";
import {toast} from "react-toastify";
import {Accordion} from "flowbite-react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import useFormCommission from "../../../hooks/useFormCommission";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchSection() {
    const {inputs, handleChange, reset} = useFormCommission()

    const dispatch = useDispatch()

    const options = [
        {name: 'حذف شده', code: 'true'},
        {name: 'حذف نشده', code: 'false'},
        {name: 'همه', code: null},
    ];

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await commissionSearch('/CommissionInstrumentType/Search?', [
            {CommissionInstrumentTypeId: inputs.CommissionInstrumentTypeId},
            {BourseTitle: inputs.BourseTitle},
            {InstrumentTypeTitle: inputs.InstrumentTypeTitle},
            {InstrumentTypeDescription: inputs.InstrumentTypeDescription},
            {SectorTitle: inputs.SectorTitle},
            {SubSectorTitle: inputs.SubSectorTitle},
            // CommissionInstrumentTypeDescription:val7,
            {Deleted: inputs.Deleted}
        ]).then(res => {
            dispatch(instrumentSearchResult(res?.result));
            toast.success('با موفقیت انجام شد')
        })
            .catch(err => toast.success('ناموفق'))
    }

    return (
        <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
            <Accordion.Panel>
                <Accordion.Title style={{padding: '0.5rem'}}>
                    جستجو
                </Accordion.Title>
                <Accordion.Content style={{transition: 'all'}}>
                    <form onSubmit={onSubmit}>
                        <div className={'grid grid-cols-3 gap-4'}>
                            {/*<div className="p-float-label col-12 md:col-4 mt-4 md:mt-0">*/}
                            {/*    <InputText id="basic" value={val1} onChange={(e) => setVal1(e.target.value)}/>*/}
                            {/*    <label htmlFor="basic">آیدی ابزار مالی</label>*/}
                            {/*</div>*/}
                            <div>
                                <label htmlFor="BourseTitle" className={'block'}>عنوان بورس</label>
                                <input className={'w-full'} id="BourseTitle" value={inputs.BourseTitle}
                                       onChange={(e) => handleChange('BourseTitle', e.target.value)}/>
                            </div>

                            <div>
                                <label htmlFor="InstrumentTypeTitle" className={'block'}>عنوان نوع ابزار مالی</label>
                                <input className={'w-full'} id="InstrumentTypeTitle" value={inputs.InstrumentTypeTitle}
                                       onChange={(e) => handleChange('InstrumentTypeTitle', e.target.value)}/>
                            </div>

                            <div>
                                <label htmlFor="InstrumentTypeDescription" className={'block'}>توضیحات نوع ابزار
                                    مالی</label>
                                <input className={'w-full'} id="InstrumentTypeDescription" value={inputs.InstrumentTypeDescription}
                                       onChange={(e) => handleChange('InstrumentTypeDescription', e.target.value)}/>
                            </div>

                            <div>
                                <label className={'block'} htmlFor="SectorTitle">گروه صنعت</label>
                                <input className={'w-full'} id="SectorTitle" value={inputs.SectorTitle}
                                       onChange={(e) => handleChange('SectorTitle', e.target.value)}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="SubSectorTitle">زیرگروه صنعت</label>
                                <input className={'w-full'} id="serial" value={inputs.SubSectorTitle}
                                       onChange={(e) => handleChange('SubSectorTitle', e.target.value)}/>
                            </div>
                            {/*<div className="p-float-label col-12 md:col-4 mt-4">*/}
                            {/*    <input id="serial" value={val7} onChange={(e) => setVal7(e.target.value)} disabled/>*/}
                            {/*    <label htmlFor="serial">CommissionInstrumentTypeDescription</label>*/}
                            {/*</div>*/}
                            <div>
                                <label className={'block'}>دسته بندی</label>
                                <div className="relative rounded">
                                    <Listbox name={'Deleted'} value={inputs.Deleted}
                                             onChange={(e) => handleChange('Deleted', e)}>
                                        {({open}) => (
                                            <div className="relative">
                                                <Listbox.Button
                                                    className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{options.find((item: any) => item.code === inputs.Deleted)?.name}</span>
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
                        <button className={'float-left my-4 rounded-full p-1 px-2 bg-lime-600'} type={'submit'}>
                            جستجو
                        </button>
                    </form>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}
