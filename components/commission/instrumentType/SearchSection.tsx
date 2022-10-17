import React, {useRef, useState} from 'react';
import {Card} from "primereact/card";
import {commissionSearch} from "../../../api/commissionInstrumentType";
import {Button} from "primereact/button";
import {InputSwitch} from "primereact/inputswitch";
import {InputText} from "primereact/inputtext";
import {useDispatch} from "react-redux";
import {instrumentSearchResult} from "../../../store/commissionConfig";
import {Dropdown} from "primereact/dropdown";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Toast} from "primereact/toast";

export default function SearchSection() {
    const [val1, setVal1] = useState<string>('');
    const [val2, setVal2] = useState<string>('');
    const [val3, setVal3] = useState<string>('');
    const [val4, setVal4] = useState<string>('');
    const [val5, setVal5] = useState<string>('');
    const [val6, setVal6] = useState<string>('');
    const [val7, setVal7] = useState<string>();
    const [val8, setVal8] = useState<{ name: string, code: any }>({name: 'همه', code: null});

    const toast: any = useRef(null);

    const dispatch = useDispatch()

    const options = [
        {name: 'حذف شده', code: 'true'},
        {name: 'حذف نشده', code: 'false'},
        {name: 'همه', code: null},
    ];

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await commissionSearch('/CommissionInstrumentType/Search?', [
            {CommissionInstrumentTypeId: val1},
            {BourseTitle: val2},
            {InstrumentTypeTitle: val3},
            {InstrumentTypeDescription: val4},
            {SectorTitle: val5},
            {SubSectorTitle: val6},
            // CommissionInstrumentTypeDescription:val7,
            {Deleted: val8.code}
        ]).then(res => {
            dispatch(instrumentSearchResult(res?.result));
            toast.current?.show({
                severity: 'success',
                summary: 'با موفقیت انجام شد',
                detail: 'نتایج جستجو لیست شد',
                life: 6000
            });
        })
            .catch(err => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'مشکلی رخ داده',
                    detail: `${err?.response?.data?.title}`,
                    life: 6000
                });
            })
    }

    return (
        <>
            <Toast ref={toast} position="top-center"/>
            <Accordion className="accordion-custom " activeIndex={0}>
                <AccordionTab
                    header={<React.Fragment><i className="pi pi-search mx-1"/><span>جستجو</span></React.Fragment>}>
                    <form className="p-fluid grid" onSubmit={onSubmit}>
                        {/*<div className="p-float-label col-12 md:col-4 mt-4 md:mt-0">*/}
                        {/*    <InputText id="basic" value={val1} onChange={(e) => setVal1(e.target.value)}/>*/}
                        {/*    <label htmlFor="basic">آیدی ابزار مالی</label>*/}
                        {/*</div>*/}

                        <div className="p-float-label col-12 md:col-4  mt-4">
                            <InputText id="ssn" value={val2} onChange={(e) => setVal2(e.target.value)}/>
                            <label htmlFor="ssn">عنوان بورس</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4  mt-4">
                            <InputText id="date" value={val3} onChange={(e) => setVal3(e.target.value)}/>
                            <label htmlFor="date">عنوان نوع ابزار مالی</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="phone" value={val4} onChange={(e) => setVal4(e.target.value)}/>
                            <label htmlFor="phone">توضیحات نوع ابزار مالی</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="phoneext" value={val5} onChange={(e) => setVal5(e.target.value)}/>
                            <label htmlFor="phoneext">گروه صنعت</label>
                        </div>
                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="serial" value={val6} onChange={(e) => setVal6(e.target.value)}/>
                            <label htmlFor="serial">زیرگروه صنعت</label>
                        </div>
                        {/*<div className="p-float-label col-12 md:col-4 mt-4">*/}
                        {/*    <InputText id="serial" value={val7} onChange={(e) => setVal7(e.target.value)} disabled/>*/}
                        {/*    <label htmlFor="serial">CommissionInstrumentTypeDescription</label>*/}
                        {/*</div>*/}
                        <div className="flex flex-column col-12 md:col-4">
                            <div className={'mt-auto'}>دسته بندی</div>
                            <Dropdown value={val8} options={options} onChange={(e) => setVal8(e.target.value)}
                                      optionLabel="name"/>
                        </div>
                        <div className={'flex flex-grow-1 mt-3 col-12 md:col-4'}>
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
