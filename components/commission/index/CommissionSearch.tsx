import React, {Fragment, useEffect, useState} from 'react';
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {useDispatch} from "react-redux";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {commission} from "../../../store/commissionConfig";
import moment from "jalali-moment";
import {toast} from "react-toastify";
import {Accordion} from "flowbite-react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import useFormCommission from "../../../hooks/useFormCommission";

const commissionDic = require('../../../dictionary/commission.json')

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function CommissionSearch() {
    const {inputs, handleChange, reset} = useFormCommission()
    const [idObject, setIdObject] = useState<{ instrumentTypeId: number, categoryId: number }>({
        instrumentTypeId: -1,
        categoryId: -1
    })
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    const dispatch = useDispatch()

    const options = [
        {name: 'حذف شده', code: 'true'},
        {name: 'حذف نشده', code: 'false'},
        {name: 'همه', code: null},
    ];

    const instrumentSearch = async () => {
        await commissionSearch('/CommissionInstrumentType/Search?', {
            BourseTitle: inputs.BourseTitle,
            InstrumentTypeTitle: inputs.InstrumentTypeTitle,
            SectorTitle: inputs.SectorTitle,
            SubSectorTitle: inputs.SubSectorTitle})
            .then(res => {
                if (res?.result?.length > 1 || res?.result?.length === 0) {
                    toast.error('کارمزد ابزار مالی')
                } else {
                    toast.success('با موفقیت انجام شد')
                    setIdObject({instrumentTypeId: res?.result?.[0]?.id, categoryId: idObject.categoryId})
                }
            })
            .catch(err => toast.error('نا موفق'))
    }
    const categorySearch = async () => {
        await commissionSearch('/CommissionCategory/Search?', {
            MarketTitle: inputs.MarketTitle,
            OfferTypeTitle: inputs.OfferTypeTitle,
            SettlementDelayTitle: inputs.SettlementDelayTitle,
            SideTitle: inputs.SideTitle,
            CustomerTypeTitle: inputs.CustomerTypeTitle,
            CustomerCounterSideTitle: inputs.CustomerCounterSideTitle})
            .then(res => {
                if (res?.result?.pagedData?.length > 1 || res?.result?.pagedData?.length === 0) {
                    toast.error('کارمزد گروه بندی ضرایب')
                } else {
                    toast.success('با موفقیت انجام شد')
                    setIdObject({instrumentTypeId: idObject.instrumentTypeId, categoryId: res?.result.pageData?.[0].id})
                }
            })
            .catch(err => toast.error('نا موفق'))
    }

    useEffect(() => {
        if (idObject.categoryId > 0 && idObject.instrumentTypeId > 0) {
            const detailSearch = async () => {
                await commissionSearch('/CommissionDetail/Search?', {
                    CommissionDetailId: inputs.CommissionDetailId,
                    CommissionInstrumentTypeId: idObject.instrumentTypeId > 0 ? idObject.instrumentTypeId : '',
                    CommissionCategoryId: idObject.categoryId > 0 ? idObject.categoryId : '',
                    BeginningEffectingDate: moment.from(`${selectedDayRange.from?.year}/${selectedDayRange.from?.month}/${selectedDayRange.from?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-M-D'),
                    EndEffectingDate: moment.from(`${selectedDayRange.to?.year}/${selectedDayRange.to?.month}/${selectedDayRange.to?.day}`, 'fa', 'YYYY/MM/DD').format('YYYY-M-D'),
                    Deleted: inputs.Deleted})
                    .then(res => {
                        if (res?.result?.pagedData?.length > 1 || res?.result?.pagedData?.length === 0) {
                            dispatch(commission(res?.result?.pageData))
                            toast.error(`${res?.result?.pagedData?.length} نتیجه یافت شد`)
                        } else {
                            toast.success('با موفقیت انجام شد')
                            setIdObject({instrumentTypeId: idObject.instrumentTypeId, categoryId: res?.result.pageData?.[0].id})
                        }
                    })
                    .catch(err => toast.error('نا موفق'))
            }

            detailSearch()
        }
    }, [idObject.categoryId, idObject.instrumentTypeId])

    const onSubmit = (event: any) => {
        event.preventDefault()
        instrumentSearch()
        categorySearch()
    }

    const dateRangeHandler = (selectedDayRange: any) => {
        if (selectedDayRange.from && selectedDayRange.to) {
            return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`
        } else if (!selectedDayRange.from && !selectedDayRange.to) {
            return ''
        } else if (!selectedDayRange.from) {
            return ''
        } else if (!selectedDayRange.to) {
            return `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا اطلاع ثانویه`
        }
    }

    const renderCustomInput = ({ref}: { ref: any }) => (
        <div>
            <label className={'block'} htmlFor="rangeDate">تاریخ شروع و پایان</label>
            <input readOnly className={'w-full'} ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
        </div>
    )

    return (
        <Accordion alwaysOpen={true} style={{borderBottomRightRadius:0,borderBottomLeftRadius:0}}>
            <Accordion.Panel>
                <Accordion.Title style={{padding: '0.5rem'}}>
                    جستجو
                </Accordion.Title>
                <Accordion.Content style={{transition: 'all'}}>
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className={'border border-dashed border-border p-2 rounded'}>
                                <div>
                                    ابزار مالی گروه بندی ضرایب
                                </div>
                                <div className={'grid grid-cols-2 gap-4'}>
                                    <div>
                                        <label className={'block'} htmlFor="BourseTitle">عنوان بورس</label>
                                        <div className="relative rounded">
                                            <Listbox name={'status'} value={inputs.BourseTitle}
                                                     onChange={(e) => handleChange('BourseTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.bourse.find((item:any)=>item.BourseId===inputs.BourseTitle)?.BourseTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.bourse.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.BourseId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.BourseId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.BourseTitle}
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
                                        <label htmlFor="InstrumentTypeTitle">عنوان ابزار مالی</label>
                                        <div className="relative rounded">
                                            <Listbox name={'status'} value={inputs.InstrumentTypeTitle}
                                                     onChange={(e) => handleChange('InstrumentTypeTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.instrumentType.find((item:any)=>item.InstrumentTypeId===inputs.InstrumentTypeTitle)?.InstrumentTypeTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.instrumentType.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.InstrumentTypeId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.InstrumentTypeId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                                    <span>
                                                                                        {item.InstrumentTypeTitle}
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
                                        <label className={'block'} htmlFor="SectorTitle">عنوان گروه صنعت </label>
                                        <div className="relative rounded">
                                            <Listbox name={'SectorTitle'} value={inputs.SectorTitle}
                                                     onChange={(e) => handleChange('SectorTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.sector.find((item:any)=>item.SectorId===inputs.SectorTitle)?.SectorTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.sector.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.SectorId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.SectorId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.SectorTitle}
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
                                        <label className={'block'} htmlFor="SubSectorTitle">عنوان زیر گروه صنعت</label>
                                        <div className="relative rounded">
                                            <Listbox name={'SubSectorTitle'} value={inputs.SubSectorTitle}
                                                     onChange={(e) => handleChange('SubSectorTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.subSector.find((item:any)=>item.SubSectorId===inputs.SubSectorTitle)?.SubSectorTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.subSector.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.SubSectorId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.SubSectorId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.SubSectorTitle}
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
                            <div className={'border border-dashed border-border p-2 rounded'}>
                                <div>
                                    گروه بندی ضرایب
                                </div>
                                <div className={'grid grid-cols-2 gap-4'}>
                                    <div>
                                        <label htmlFor="MarketTitle">عنوان بازار</label>
                                        <div className="relative rounded">
                                            <Listbox name={'status'} value={inputs.MarketTitle}
                                                     onChange={(e) => handleChange('MarketTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.market.find((item:any)=>item.MarketId===inputs.MarketTitle)?.MarketTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.market.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.MarketId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.MarketId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.MarketTitle}
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
                                        <label htmlFor="OfferTypeTitle">نوع عرضه</label>
                                        <div className="relative rounded">
                                            <Listbox name={'OfferTypeTitle'} value={inputs.OfferTypeTitle}
                                                     onChange={(e) => handleChange('OfferTypeTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.offerType.find((item:any)=>item.OfferTypeId===inputs.OfferTypeTitle)?.OfferTypeTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.offerType.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.OfferTypeId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.OfferTypeId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.OfferTypeTitle}
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
                                        <label htmlFor="SettlementDelayTitle ">تاخیر در تسویه</label>
                                        <div className="relative rounded">
                                            <Listbox name={'SettlementDelayTitle'} value={inputs.SettlementDelayTitle}
                                                     onChange={(e) => handleChange('SettlementDelayTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.SettlementDelay.find((item:any)=>item.SettlementDelayId===inputs.SettlementDelayTitle)?.SettlementDelayTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.SettlementDelay.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.SettlementDelayId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.SettlementDelayId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.SettlementDelayTitle}
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
                                        <label htmlFor="SideTitle">سمت سفارش</label>
                                        <div className="relative rounded">
                                            <Listbox name={'SideTitle'} value={inputs.SideTitle}
                                                     onChange={(e) => handleChange('SideTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.side.find((item:any)=>item.SideId===inputs.SideTitle)?.SideTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.side.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.SideId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.SideId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.SideTitle}
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
                                        <label htmlFor="CustomerTypeTitle">نوع مشتری</label>
                                        <div className="relative rounded">
                                            <Listbox name={'CustomerTypeTitle'} value={inputs.CustomerTypeTitle}
                                                     onChange={(e) => handleChange('CustomerTypeTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.customerType.find((item:any)=>item.CustomerTypeId===inputs.CustomerTypeTitle)?.CustomerTypeTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.customerType.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.CustomerTypeId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.CustomerTypeId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.CustomerTypeTitle}
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
                                        <label htmlFor="CustomerCounterSideTitle">نوع مشتری طرف مقابل</label>
                                        <div className="relative rounded">
                                            <Listbox name={'CustomerCounterSideTitle'}
                                                     value={inputs.CustomerCounterSideTitle}
                                                     onChange={(e) => handleChange('CustomerCounterSideTitle', e)}>
                                                {({open}) => (
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{commissionDic.customerCounterSideType.find((item:any)=>item.CustomerCounterSideTypeId===inputs.CustomerCounterSideTitle)?.CustomerCounterSideTypeTitle}</span>
                                                        </span>
                                                            <span
                                                                className="pointer-events-none flex items-center mr-auto">
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
                                                                {commissionDic.customerCounterSideType.map((item: any) => (
                                                                    <Listbox.Option
                                                                        key={item.CustomerCounterSideTypeId}
                                                                        className={({active}) =>
                                                                            classNames(
                                                                                active ? 'bg-border' : '',
                                                                                'relative cursor-pointer select-none py-1 pl-3 pr-3'
                                                                            )
                                                                        }
                                                                        value={item.CustomerCounterSideTypeId}
                                                                    >
                                                                        {({selected, active}) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                    <span>
                                                                        {item.CustomerCounterSideTypeTitle}
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
                        <div className={'border border-dashed border-border p-2 rounded'}>
                            <div className={'col-12'}>
                                گروه بندی ضرایب
                            </div>
                            <div className={'grid grid-cols-3 gap-4'}>
                                <div>
                                    <div>
                                        <label className={'block'} htmlFor="CommissionDetailId">شناسه جزییات
                                            کارمزد</label>
                                        <input className={'w-full'} id="CommissionDetailId" value={inputs.CommissionDetailId}
                                               name={'CommissionDetailId'}
                                               onChange={(e) => handleChange('CommissionDetailId', e.target.value)}/>
                                    </div>
                                </div>
                                <div>
                                    <DatePicker
                                        value={selectedDayRange}
                                        onChange={setSelectedDayRange}
                                        shouldHighlightWeekends
                                        renderInput={renderCustomInput}
                                        locale={'fa'}
                                        calendarPopperPosition={'auto'}
                                    />
                                </div>
                                <div>
                                    <label className={'block'} htmlFor="Deleted">دسته بندی</label>
                                    <div className="relative rounded">
                                        <Listbox name={'Deleted'} value={inputs.Deleted}
                                                 onChange={(e) => handleChange('Deleted', e)}>
                                            {({open}) => (
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className="relative flex min-w-full cursor-pointer rounded-md border border-border bg-white py-1.5 px-2 shadow-sm focus:border-border focus:outline-none">
                                                        <span className="flex items-center">
                                                            <span
                                                                className="ml-2 block truncate text-sm">{options.find((item:any)=>item.code===inputs.Deleted)?.name}</span>
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
                        </div>
                        <button className={'justify-center mt-4 px-5 float-left mb-4 bg-lime-600 rounded-full p-1 px-2'} type={'submit'}>
                            جستجو
                        </button>
                    </form>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}
