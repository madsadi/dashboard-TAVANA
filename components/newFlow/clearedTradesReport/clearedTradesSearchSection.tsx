import React, {useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useDispatch} from "react-redux";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Toast} from "primereact/toast";
import DatePicker, {DayValue, utils} from "@amir04lm26/react-modern-calendar-date-picker";
import {Dropdown} from "primereact/dropdown";
import {clearedTradesReportSearch} from "../../../api/clearedTradesReport";
import {clearedTradesResult} from "../../../store/netFlowConfig";

export default function ClearedTradesSearchSection() {
    const [StartDate, setStartDate] = useState<DayValue>(null);
    const [EndDate, setEndDate] = useState<DayValue>(null);
    const [Ticket, setTicket] = useState<string>('');
    const [Symbol, setSymbol] = useState<string>('');
    const [InstrumentId, setInstrumentId] = useState<string>('');
    const [Side, setSide] = useState<{ name: string, code: any }>({name: 'خرید', code: '1'});


    const toast:any = useRef(null);
    const dispatch = useDispatch()

    const options = [
        {name: 'خرید', code: '1'},
        {name: 'فروش', code: '2'},
    ];

    const renderStartDateInput = ({ref}: { ref: any }) => (
        <InputText readOnly ref={ref}
                   value={StartDate ? `${StartDate?.year}-${StartDate?.month}-${StartDate?.day}` : ''}
                   aria-describedby="username1-help"  className="block"  placeholder={"تاریخ روز را انتخاب کنید"}/>
    )
    const renderEndDateInput = ({ref}: { ref: any }) => (
        <InputText readOnly ref={ref}
                   value={StartDate ? `${EndDate?.year}-${EndDate?.month}-${EndDate?.day}` : ''}
                   aria-describedby="username1-help"  className="block"  placeholder={"تاریخ روز را انتخاب کنید"}/>
    )

    const onSubmit = async (event: any) => {
        event.preventDefault()
        await clearedTradesReportSearch('/Report/cleared-trade', [
            {StartDate: StartDate},
            {EndDate: EndDate},
            {Ticket: Ticket},
            {Symbol: Symbol},
            {Side: Side.code}],
            // {InstrumentId: setInstrumentId}],
        ).then(res => {
            dispatch(clearedTradesResult(res?.result));
            toast.current?.show({
                severity: 'success',
                summary: 'با موفقیت انجام شد',
                detail: 'نتایج جستجو لیست شد',
                life: 6000
            })
        })
            .catch(err =>
                toast.current?.show({
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
                    <form className="p-fluid grid" onSubmit={onSubmit}>
                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <DatePicker
                                value={StartDate}
                                onChange={setStartDate}
                                maximumDate={utils('fa').getToday()}
                                renderInput={renderStartDateInput}
                                locale={'fa'}
                                shouldHighlightWeekends
                            />
                            <label htmlFor="StartDate" style={{top: '-18%'}}>تاریخ شروع</label>
                        </div>
                        <div className="p-float-label col-12 md:col-4  mt-4">
                            <DatePicker
                                value={EndDate}
                                onChange={setEndDate}
                                maximumDate={utils('fa').getToday()}
                                renderInput={renderEndDateInput}
                                locale={'fa'}
                                shouldHighlightWeekends
                            />
                            <label htmlFor="EndDate" style={{top: '-18%'}}>تاریخ پایان</label>
                        </div>
                        <div className="p-float-label col-12 md:col-4  mt-4">
                            <InputText id="ticket" value={Ticket} onChange={(e) => setTicket(e.target.value)}/>
                            <label htmlFor="ticket">شماره تیکت</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="symbol" value={Symbol} onChange={(e) => setSymbol(e.target.value)}/>
                            <label htmlFor="symbol">نماد</label>
                        </div>

                        <div className="p-float-label col-12 md:col-4 mt-4">
                            <InputText id="InstrumentId" value={InstrumentId} onChange={(e) => setInstrumentId(e.target.value)}/>
                            <label htmlFor="InstrumentId">شناسه نماد</label>
                        </div>

                        <div className="flex flex-column col-12 md:col-4">
                            <div className={'mt-auto'}>دسته بندی</div>
                            <Dropdown value={Side} options={options} onChange={(e) => setSide(e.target.value)}
                                      optionLabel="name"/>
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
