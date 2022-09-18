import React, {useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useDispatch} from "react-redux";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Toast} from "primereact/toast";
import DatePicker, {DayRange, DayValue, utils} from "@amir04lm26/react-modern-calendar-date-picker";
import {Dropdown} from "primereact/dropdown";
import {clearedTradesReportSearch} from "../../../api/clearedTradesReport";
import {clearedTradesResult} from "../../../store/netFlowConfig";
import moment from "jalali-moment";

export default function ClearedTradesSearchSection() {
    const [Ticket, setTicket] = useState<string>('');
    const [Symbol, setSymbol] = useState<string>('');
    const [InstrumentId, setInstrumentId] = useState<string>('');
    const [Side, setSide] = useState<{ name: string, code: any }>({name: 'خرید', code: '1'});
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });


    const toast:any = useRef(null);
    const dispatch = useDispatch()

    const options = [
        {name: 'خرید', code: '1'},
        {name: 'فروش', code: '2'},
        {name: 'هردو'},
    ];

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


    const onSubmit = async (event: any) => {
        console.log(selectedDayRange)
        event.preventDefault()
        await clearedTradesReportSearch('/Report/cleared-trade', [
            {StartDate: moment.from(`${selectedDayRange.from?selectedDayRange.from.year: ''}/${selectedDayRange.from?selectedDayRange.from.month: ''}/${selectedDayRange.from?selectedDayRange.from.day: ''}`, 'fa', 'YYYY/MM/DD').format('YYYY.MM.DD')},
            {EndDate: moment.from(`${selectedDayRange.to?selectedDayRange.to.year: ''}/${selectedDayRange.to?selectedDayRange.to.month: ''}/${selectedDayRange.to?selectedDayRange.to.day: ''}`, 'fa', 'YYYY/MM/DD').format('YYYY.MM.DD')},
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
                        <div className="col-12 md:col-4 px-2 mt-3">
                            <DatePicker
                                value={selectedDayRange}
                                onChange={setSelectedDayRange}
                                shouldHighlightWeekends
                                renderInput={renderCustomInput}
                                locale={'fa'}
                                calendarPopperPosition={'bottom'}
                            />
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
