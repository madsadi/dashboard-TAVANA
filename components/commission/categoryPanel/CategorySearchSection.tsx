import React, {useRef, useState} from 'react';
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useDispatch} from "react-redux";
import {categorySearchResult} from "../../../store/commissionConfig";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Toast} from "primereact/toast";

export default function CategorySearchSection() {
    const [CategoryId, setCategoryId] = useState<string>('');
    const [MarketTitle, setMarketTitle] = useState<string>('');
    const [OfferTypeTitle, setOfferTypeTitle] = useState<string>('');
    const [SideTitle, setSideTitle] = useState<string>('');
    const [SettlementDelayTitle, setSettlementDelayTitle] = useState<string>('');
    const [CustomerTypeTitle, setCustomerTypeTitle] = useState<string>('');
    const [CustomerCounterSideTitle, setCustomerCounterSideTitle] = useState<string>();

    const dispatch = useDispatch()

    const onSubmit = async (event: any) => {
        event.preventDefault()
        let body:any=[
            {CommissionCategoryId: CategoryId},
            {MarketTitle: MarketTitle},
            {OfferTypeTitle: OfferTypeTitle},
            {SideTitle: SideTitle},
            {SettlementDelayTitle: SettlementDelayTitle},
            {CustomerTypeTitle: CustomerTypeTitle},
            {CustomerCounterSideTitle: CustomerCounterSideTitle}]
        dispatch(categorySearchResult(body));
    }

    return (
        <>
            <Accordion className="accordion-custom" activeIndex={0}>
                <AccordionTab
                    header={<React.Fragment><i className="pi pi-search mx-1"/><span>جستجو</span></React.Fragment>}>
                    <form className="p-fluid grid" onSubmit={onSubmit}>
                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="CategoryId" value={CategoryId} onChange={(e) => setCategoryId(e.target.value)}/>
                            <label htmlFor="CategoryId">شناسه</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4  mt-4">
                            <InputText id="MarketTitle" value={MarketTitle} onChange={(e) => setMarketTitle(e.target.value)}/>
                            <label htmlFor="MarketTitle">بازار</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4  mt-4">
                            <InputText id="OfferTypeTitle" value={OfferTypeTitle} onChange={(e) => setOfferTypeTitle(e.target.value)}/>
                            <label htmlFor="OfferTypeTitle">نوع عرضه</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="SideTitle" value={SideTitle} onChange={(e) => setSideTitle(e.target.value)}/>
                            <label htmlFor="SideTitle">سمت سفارش</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="SettlementDelayTitle" value={SettlementDelayTitle} onChange={(e) => setSettlementDelayTitle(e.target.value)}/>
                            <label htmlFor="SettlementDelayTitle">تاخیر در تسویه</label>
                        </div>
                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="CustomerTypeTitle" value={CustomerTypeTitle} onChange={(e) => setCustomerTypeTitle(e.target.value)}/>
                            <label htmlFor="CustomerTypeTitle">نوع مشتری</label>
                        </div>
                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="CustomerCounterSideTitle" value={CustomerCounterSideTitle} onChange={(e) => setCustomerCounterSideTitle(e.target.value)}/>
                            <label htmlFor="CustomerCounterSideTitle">نوع طرف مقابل</label>
                        </div>
                        <div className={'flex flex-grow-1 mt-3'}>
                            <Button className={'mt-auto w-fit mr-auto'} type={'submit'}>
                                جستجو
                            </Button>
                        </div>
                    </form>
                </AccordionTab>
            </Accordion>
        </>
    );
}
