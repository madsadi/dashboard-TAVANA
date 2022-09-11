import React, {useEffect, useRef, useState} from 'react';
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useDispatch} from "react-redux";
import {categorySearchResult} from "../../../store/commissionConfig";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Toast} from "primereact/toast";
import useForm from "../../../hooks/useForm";
import {Dropdown} from "primereact/dropdown";

export default function CommissionSearch() {
    const {inputs, handleChange, reset} = useForm()
    const [idObject, setIdObject] = useState<{ instrumentTypeId: number, categoryId: number }>({
        instrumentTypeId: -1,
        categoryId: -1
    })
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

    const detailSearch=async (event:any)=>{
        event.preventDefault()
        await commissionSearch('/CommissionDetail/Search?', [
            {CommissionDetailId: inputs.CommissionDetailId},
            {CommissionInstrumentTypeId: idObject.instrumentTypeId},
            {CommissionCategoryId: idObject.categoryId},
            {BeginningEffectingDate: inputs.rangeDate},
            {EndEffectingDate: inputs.rangeDate},
            {Deleted: val8.code}])
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
                                    گروه بندی ضرایب
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <InputText id="MarketTitle" value={inputs.MarketTitle} name={'MarketTitle'}
                                               onChange={handleChange}/>
                                    <label htmlFor="MarketTitle">عنوان بازار</label>
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <InputText id="OfferTypeTitle" value={inputs.OfferTypeTitle} name={'OfferTypeTitle'}
                                               onChange={handleChange}/>
                                    <label htmlFor="OfferTypeTitle">نوع عرضه</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <InputText id="SettlementDelayTitle " value={inputs.SettlementDelayTitle}
                                               name={'SettlementDelayTitle'} onChange={handleChange}/>
                                    <label htmlFor="SettlementDelayTitle ">تاخیر در تسویه</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <InputText id="SideTitle" value={inputs.SideTitle} name={'SideTitle'}
                                               onChange={handleChange}/>
                                    <label htmlFor="SideTitle">سمت سفارش</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <InputText id="CustomerTypeTitle" value={inputs.CustomerTypeTitle}
                                               name={'CustomerTypeTitle'} onChange={handleChange}/>
                                    <label htmlFor="CustomerTypeTitle">نوع مشتری</label>
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4 h-fit">
                                    <InputText id="CustomerCounterSideTitle" value={inputs.CustomerCounterSideTitle}
                                               name={'CustomerCounterSideTitle'} onChange={handleChange}/>
                                    <label htmlFor="CustomerCounterSideTitle">نوع مشتری طرف مقابل</label>
                                </div>
                            </div>
                        </div>
                        <div className={'col border-dashed border-round-md border-200'}>
                            <div className={'grid'}>
                                <div className={'col-12'}>
                                    ابزار مالی گروه بندی ضرایب
                                </div>
                                <div className="p-float-label col-12 md:col-6 mt-4">
                                    <InputText id="BourseTitle" value={inputs.BourseTitle} name={'BourseTitle'}
                                               onChange={handleChange}/>
                                    <label htmlFor="BourseTitle">عنوان بورس</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4">
                                    <InputText id="InstrumentTypeTitle" value={inputs.InstrumentTypeTitle}
                                               name={'InstrumentTypeTitle'} onChange={handleChange}/>
                                    <label htmlFor="InstrumentTypeTitle">عنوان ابزار مالی</label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4">
                                    <InputText id="SectorTitle" value={inputs.SectorTitle} name={'SectorTitle'}
                                               onChange={handleChange}/>
                                    <label htmlFor="SectorTitle">عنوان گروه صنعت </label>
                                </div>

                                <div className="p-float-label col-12 md:col-6 mt-4">
                                    <InputText id="SubSectorTitle" value={inputs.SubSectorTitle} name={'SubSectorTitle'}
                                               onChange={handleChange}/>
                                    <label htmlFor="SubSectorTitle">عنوان زیر گروه صنعت</label>
                                </div>
                            </div>
                        </div>
                        <Button className={'w-fit'} type={'submit'}>جستجو</Button>
                        <div className={'col-2 border-dashed border-round-md border-200'}>
                            <div className={'flex flex-column h-full'}>
                                <div>
                                    گروه بندی ضرایب
                                </div>
                                <div className="p-float-label mt-4 col-12 px-0">
                                    <InputText id="CommissionDetailId" value={inputs.CommissionDetailId} name={'CommissionDetailId'}
                                               onChange={handleChange}/>
                                    <label htmlFor="CommissionDetailId">شناسه جزییات کارمزد</label>
                                </div>
                                <div className="p-float-label mt-4 col-12 px-0">
                                    <InputText value={idObject.instrumentTypeId>0 ? idObject.instrumentTypeId:''} readOnly/>
                                    <label>شناسه نوع ابزار</label>
                                </div>
                                <div className="p-float-label mt-4 col-12 px-0">
                                    <InputText value={idObject.categoryId>0 ? idObject.categoryId:''} readOnly/>
                                    <label>شناسه گروه بندی</label>
                                </div>
                                <div className="p-float-label mt-4 col-12 px-0">
                                    <InputText id="rangeDate" value={inputs.rangeDate} name={'rangeDate'}
                                               onChange={handleChange}/>
                                    <label htmlFor="rangeDate">تاریخ شروع و پایان</label>
                                </div>
                                <div className="flex flex-column col-12 md:col-4">
                                    <div className={'mt-auto'}>دسته بندی</div>
                                    <Dropdown value={val8} options={options} onChange={(e) => setVal8(e.target.value)}
                                              optionLabel="name"/>
                                </div>
                                <Button className={'justify-content-center mt-4'} onClick={detailSearch}>
                                    جزییات
                                </Button>
                            </div>
                        </div>
                    </form>
                </AccordionTab>
            </Accordion>
        </>
    );
}
