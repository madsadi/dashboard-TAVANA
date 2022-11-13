import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {categorySearchResult} from "../../../store/commissionConfig";
import {toast} from "react-toastify";
import {Accordion} from "flowbite-react";

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
        let body: any = [
            {CommissionCategoryId: CategoryId},
            {MarketTitle: MarketTitle},
            {OfferTypeTitle: OfferTypeTitle},
            {SideTitle: SideTitle},
            {SettlementDelayTitle: SettlementDelayTitle},
            {CustomerTypeTitle: CustomerTypeTitle},
            {CustomerCounterSideTitle: CustomerCounterSideTitle}]
        dispatch(categorySearchResult(body));
        toast.success('با موفقیت انجام شد')
    }

    return (
        <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
            <Accordion.Panel>
                <Accordion.Title style={{padding: '0.5rem'}}>
                    جستجو
                </Accordion.Title>
                <Accordion.Content style={{transition: 'all'}}>
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <label className={'block'} htmlFor="CategoryId">شناسه</label>
                                <input className={'w-full'} id="CategoryId" value={CategoryId}
                                       onChange={(e) => setCategoryId(e.target.value)}/>
                            </div>

                            <div>
                                <label className={'block'} htmlFor="MarketTitle">بازار</label>
                                <input className={'w-full'} id="MarketTitle" value={MarketTitle}
                                       onChange={(e) => setMarketTitle(e.target.value)}/>
                            </div>

                            <div>
                                <label className={'block'} htmlFor="OfferTypeTitle">نوع عرضه</label>
                                <input className={'w-full'} id="OfferTypeTitle" value={OfferTypeTitle}
                                       onChange={(e) => setOfferTypeTitle(e.target.value)}/>
                            </div>

                            <div>
                                <label className={'block'} htmlFor="SideTitle">سمت سفارش</label>
                                <input className={'w-full'} id="SideTitle" value={SideTitle}
                                       onChange={(e) => setSideTitle(e.target.value)}/>
                            </div>

                            <div>
                                <label className={'block'} htmlFor="SettlementDelayTitle">تاخیر در تسویه</label>
                                <input className={'w-full'} id="SettlementDelayTitle" value={SettlementDelayTitle}
                                       onChange={(e) => setSettlementDelayTitle(e.target.value)}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="CustomerTypeTitle">نوع مشتری</label>
                                <input className={'w-full'} id="CustomerTypeTitle" value={CustomerTypeTitle}
                                       onChange={(e) => setCustomerTypeTitle(e.target.value)}/>
                            </div>
                            <div>
                                <label className={'block'} htmlFor="CustomerCounterSideTitle">نوع طرف مقابل</label>
                                <input className={'w-full'} id="CustomerCounterSideTitle"
                                       value={CustomerCounterSideTitle}
                                       onChange={(e) => setCustomerCounterSideTitle(e.target.value)}/>
                            </div>
                        </div>
                        <button className={'float-left h-fit my-4 p-1 px-2 rounded-full bg-lime-600'} type={'submit'}>
                            جستجو
                        </button>
                    </form>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}
