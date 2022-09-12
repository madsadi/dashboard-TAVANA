import React, {useEffect, useRef, useState} from 'react';
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useDispatch} from "react-redux";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Toast} from "primereact/toast";
import useForm from "../../../hooks/useForm";
import {Dropdown} from "primereact/dropdown";
import {commission} from "../../../store/commissionConfig";

const commissionDic=require('../../../dictionary/commission.json')

export default function CommissionSearch() {
    const {inputs, handleChange, reset} = useForm()
    const [idObject, setIdObject] = useState<{ instrumentTypeId: number, categoryId: number }>({
        instrumentTypeId: -1,
        categoryId: -1
    })
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    const [val8, setVal8] = useState<{ name: string, code: any }>({name: 'همه', code: null});
    const toast: any = useRef(null);
    const dispatch = useDispatch()

    const options = [
        {name: 'حذف شده', code: 'true'},
        {name: 'حذف نشده', code: 'false'},
        {name: 'همه', code: null},
    ];

    const instrumentSearch = async () => {
        await commissionSearch('/CommissionInstrumentType/Search?', [
            {BourseTitle: inputs.BourseTitle},
            {InstrumentTypeTitle: inputs.InstrumentTypeTitle},
            {SectorTitle: inputs.SectorTitle},
            {SubSectorTitle: inputs.SubSectorTitle}])
            .then(res => {
                if (res?.result?.length > 1 || res?.result?.length === 0) {
                    toast.current?.show({
                        severity: 'error',
                        summary: `${res?.result?.length} نتیجه یافت شد`,
                        detail: `${res?.result?.length} نتیجه یافت شد`,
                        life: 6000
                    })
                } else {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'با موفقیت انجام شد',
                        detail: 'نتایج جستجو لیست شد',
                        life: 6000
                    });
                    setIdObject({instrumentTypeId: res?.result?.[0]?.id, categoryId: idObject.categoryId})
                }
            })
            .catch(err => toast.current?.show({
                severity: 'error',
                summary: 'مشکلی رخ داده',
                detail: `${err?.response?.data?.title}`,
                life: 6000
            }))
    }
    const categorySearch = async () => {
        await commissionSearch('/CommissionCategory/Search?', [
            {MarketTitle: inputs.MarketTitle},
            {OfferTypeTitle: inputs.OfferTypeTitle},
            {SettlementDelayTitle: inputs.SettlementDelayTitle},
            {SideTitle: inputs.SideTitle},
            {CustomerTypeTitle: inputs.CustomerTypeTitle},
            {CustomerCounterSideTitle: inputs.CustomerCounterSideTitle}])
            .then(res => {
                if (res?.result?.pagedData?.length > 1 || res?.result?.pagedData?.length === 0) {
                    toast.current?.show({
                        severity: 'error',
                        summary: `${res?.result?.pagedData?.length} نتیجه یافت شد`,
                        detail: `${res?.result?.pagedData?.length} نتیجه یافت شد`,
                        life: 6000
                    })
                } else {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'با موفقیت انجام شد',
                        detail: 'نتایج جستجو لیست شد',
                        life: 6000
                    });
                    setIdObject({instrumentTypeId: idObject.instrumentTypeId, categoryId: res?.result.pageData?.[0].id})
                }
            })
            .catch(err => toast.current?.show({
                severity: 'error',
                summary: 'مشکلی رخ داده',
                detail: `${err?.response?.data?.title}`,
                life: 6000
            }))
    }

    const onSubmit = (event: any) => {
        event.preventDefault()
        instrumentSearch()
        categorySearch()
    }

    const dateEntityHandler = (dayRangePoint: any) => {
        if (dayRangePoint?.day < 10 && dayRangePoint?.month < 10) {
            return `${dayRangePoint?.year}0${dayRangePoint?.month}0${dayRangePoint?.day}`
        } else if (dayRangePoint?.day < 10) {
            return `${dayRangePoint?.year}${dayRangePoint?.month}0${dayRangePoint?.day}`
        } else if (dayRangePoint?.month < 10) {
            return `${dayRangePoint?.year}0${dayRangePoint?.month}${dayRangePoint?.day}`
        }
    }

    const detailSearch = async () => {
        await commissionSearch('/CommissionDetail/Search?', [
            {CommissionDetailId: inputs.CommissionDetailId},
            {CommissionInstrumentTypeId: idObject.instrumentTypeId > 0 ? idObject.instrumentTypeId : ''},
            {CommissionCategoryId: idObject.categoryId > 0 ? idObject.categoryId : ''},
            {BeginningEffectingDate: dateEntityHandler(selectedDayRange.from)},
            {EndEffectingDate: dateEntityHandler(selectedDayRange.to)},
            {Deleted: val8.code}])
            .then(res => {
                if (res?.result?.pagedData?.length > 1 || res?.result?.pagedData?.length === 0) {
                    dispatch(commission(res?.result?.pageData))
                    toast.current?.show({
                        severity: 'error',
                        summary: `${res?.result?.pagedData?.length} نتیجه یافت شد`,
                        detail: `${res?.result?.pagedData?.length} نتیجه یافت شد`,
                        life: 6000
                    })
                } else {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'با موفقیت انجام شد',
                        detail: 'نتایج جستجو لیست شد',
                        life: 6000
                    });
                    setIdObject({instrumentTypeId: idObject.instrumentTypeId, categoryId: res?.result.pageData?.[0].id})
                }
            })
            .catch(err => toast.current?.show({
                severity: 'error',
                summary: 'مشکلی رخ داده',
                detail: `${err?.response?.data?.title}`,
                life: 6000
            }))
    }

    useEffect(()=>{
        if (idObject.categoryId>0 && idObject.instrumentTypeId>0){
            detailSearch()
        }
    },[idObject.categoryId,idObject.instrumentTypeId])

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
        <div className={'col-12 p-float-label '}>
            <InputText readOnly ref={ref} id="rangeDate" value={dateRangeHandler(selectedDayRange)}/>
            <label htmlFor="rangeDate">تاریخ شروع و پایان</label>
        </div>
    )

    return (
        <>
            <Toast ref={toast} position="top-center"/>
            <Accordion className="accordion-custom" activeIndex={0}>
                <AccordionTab
                    header={<React.Fragment><i className="pi pi-search mx-1"/><span>جستجو</span></React.Fragment>}>
                    <form className="p-fluid grid p-3 gap-3 align-items-stretch" onSubmit={onSubmit}>
                        <div className={'col border-dashed border-round-md border-200'}>
                            <div className={'grid'}>
                                <div className={'col-12'}>
                                    ابزار مالی گروه بندی ضرایب
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4">
                                    <Dropdown value={inputs.BourseTitle} options={commissionDic.bourse} onChange={handleChange} name={'BourseTitle'} optionLabel={'BourseTitle'}/>
                                    <label htmlFor="BourseTitle">عنوان بورس</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4">
                                    <Dropdown value={inputs.InstrumentTypeTitle} options={commissionDic.instrumentType} onChange={handleChange} name={'InstrumentTypeTitle'} optionLabel={'InstrumentTypeTitle'}/>
                                    <label htmlFor="InstrumentTypeTitle">عنوان ابزار مالی</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4">
                                    <Dropdown value={inputs.SectorTitle} options={commissionDic.sector} onChange={handleChange} name={'SectorTitle'} optionLabel={'SectorTitle'}/>
                                    <label htmlFor="SectorTitle">عنوان گروه صنعت </label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4">
                                    <Dropdown value={inputs.SubSectorTitle} options={commissionDic.subSector} onChange={handleChange} name={'SubSectorTitle'} optionLabel={'SubSectorTitle'}/>
                                    <label htmlFor="SubSectorTitle">عنوان زیر گروه صنعت</label>
                                </div>
                            </div>
                        </div>
                        <div className={'col border-dashed border-round-md border-200'}>
                            <div className={'grid'}>
                                <div className={'col-12'}>
                                    گروه بندی ضرایب
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <Dropdown value={inputs.MarketTitle} options={commissionDic.market} onChange={handleChange} name={'MarketTitle'} optionLabel={'MarketTitle'}/>
                                    <label htmlFor="MarketTitle">عنوان بازار</label>
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <Dropdown value={inputs.OfferTypeTitle} options={commissionDic.offerType} onChange={handleChange} name={'OfferTypeTitle'} optionLabel={'OfferTypeTitle'}/>
                                    <label htmlFor="OfferTypeTitle">نوع عرضه</label>
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <Dropdown value={inputs.SettlementDelayTitle} options={commissionDic.SettlementDelay} onChange={handleChange} name={'SettlementDelayTitle'} optionLabel={'SettlementDelayTitle'}/>
                                    <label htmlFor="SettlementDelayTitle ">تاخیر در تسویه</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <Dropdown value={inputs.SideTitle} options={commissionDic.side} onChange={handleChange} name={'SideTitle'} optionLabel={'SideTitle'}/>
                                    <label htmlFor="SideTitle">سمت سفارش</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <Dropdown value={inputs.CustomerTypeTitle} options={commissionDic.customerType} onChange={handleChange} name={'CustomerTypeTitle'} optionLabel={'CustomerTypeTitle'}/>
                                    <label htmlFor="CustomerTypeTitle">نوع مشتری</label>
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <Dropdown value={inputs.CustomerCounterSideTitle} options={commissionDic.customerCounterSideType} onChange={handleChange} name={'CustomerCounterSideTitle'} optionLabel={'CustomerCounterSideTypeTitle'}/>
                                    <label htmlFor="CustomerCounterSideTitle">نوع مشتری طرف مقابل</label>
                                </div>
                            </div>
                        </div>
                        <div className={'col-12 border-dashed border-round-md border-200'}>
                            <div className={'grid'}>
                                <div className={'col-12'}>
                                    گروه بندی ضرایب
                                </div>
                                <div className="col-12 md:col-4 px-0">
                                    <div className="col-12 p-float-label">
                                        <InputText id="CommissionDetailId" value={inputs.CommissionDetailId}
                                                   name={'CommissionDetailId'}
                                                   onChange={handleChange}/>
                                        <label htmlFor="CommissionDetailId">شناسه جزییات کارمزد</label>
                                    </div>
                                </div>
                                <div className="col-12 md:col-4 px-0">
                                    <DatePicker
                                        value={selectedDayRange}
                                        onChange={setSelectedDayRange}
                                        shouldHighlightWeekends
                                        renderInput={renderCustomInput}
                                        locale={'fa'}
                                        calendarPopperPosition={'top'}
                                    />
                                </div>
                                <div className="col-12 md:col-4">
                                    <div className="col-12 p-float-label">
                                        <Dropdown value={val8} options={options} className={'customHeight'}
                                                  onChange={(e) => setVal8(e.target.value)}
                                                  optionLabel="name"/>
                                        <label htmlFor="CommissionDetailId">دسته بندی</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className={'justify-content-center mt-4 px-5 w-fit'} type={'submit'}>
                            جستجو
                        </Button>
                    </form>
                </AccordionTab>
            </Accordion>
        </>
    );
}
