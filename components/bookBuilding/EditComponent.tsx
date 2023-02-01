import React, { useState } from "react";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import Modal from "../common/Modal";
import { updateBookBuilding } from "../../api/bookBuilding";
import moment from "jalali-moment";
import { toast } from "react-toastify";
import InputComponent from "../common/InputComponent";
import { jalali } from "../commonFn/commonFn";

const bookBuildingInputs = [
    { title: 'instrumentId', name: 'شناسه نماد', type: 'input' },
    // { title: 'faInsCode', name: 'نماد', type: 'input' },
    { title: 'maxQuantity', name: 'بیشینه حجم سفارش', type: 'input', valueType: 'number' },
    { title: 'minPrice', name: 'حداقل قیمت سفارش', type: 'input', valueType: 'number' },
    { title: 'maxPrice', name: 'حداکثر قیمت سفارش', type: 'input', valueType: 'number' },
    { title: 'date', name: 'تاریخ شروع و پایان', type: 'date' },
]

const bookBuildingInputsInitialValue = {
    instrumentId: '',
    // faInsCode: '',
    maxQuantity: null,
    minPrice: null,
    maxPrice: null,
    StartDate: null,
    EndDate: null,
}

export default function EditModal({ gridRef }: { gridRef: any }) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const queryUpdate = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    const openUpdate = () => {
        if (gridRef.current?.api?.getSelectedRows().length === 1) {
            const selectedRow = gridRef.current?.api?.getSelectedRows()[0];
            let _date: any = {}
            _date['from'] = { year: Number(jalali(selectedRow?.fromActiveDateTime).date.split('/')[0]), month: Number(jalali(selectedRow?.fromActiveDateTime).date.split('/')[1]), day: Number(jalali(selectedRow?.fromActiveDateTime).date.split('/')[2]) }
            _date['to'] = { year: Number(jalali(selectedRow?.toActiveDateTime).date.split('/')[0]), month: Number(jalali(selectedRow?.toActiveDateTime).date.split('/')[1]), day: Number(jalali(selectedRow?.toActiveDateTime).date.split('/')[2]) }
            setSelectedDayRange(_date)
            setQuery({ ...selectedRow, StartDate: moment(selectedRow.fromActiveDateTime).locale('en').format('YYYY-MM-DDTHH:MM:SSZ'), EndDate: moment(selectedRow.toActiveDateTime).locale('en').format('YYYY-MM-DDTHH:MM:SSZ') })
            setOpen(true);
        } else {
            toast.error('لطفا یک گزینه را انتخاب کنید')
        }
    }

    const updateHandler = async () => {
        await updateBookBuilding({
            instrumentId: query?.instrumentId,
            maxQuantity: query?.maxQuantity,
            minPrice: query?.minPrice,
            maxPrice: query?.maxPrice,
            fromActiveDateTime: query.StartDate,
            toActiveDateTime: query.EndDate,
        })
            .then(res => {
                toast.success('با موفقیت انجام شد')
                setOpen(false)
                gridRef.current?.api?.applyTransaction({
                    update: [{
                        instrumentId: query?.instrumentId,
                        maxQuantity: query?.maxQuantity,
                        minPrice: query?.minPrice,
                        maxPrice: query?.maxPrice,
                        fromActiveDateTime: moment(query.StartDate).locale('en').format('YYYY/MM/DD'),
                        toActiveDateTime: moment(query.EndDate).locale('en').format('YYYY/MM/DD'),
                    }]
                })
            })
            .catch(err => toast.error(`${err?.response?.data?.title}`))
    }

    return (
        <>
            <button className="bg-lime-600 p-1 px-2 rounded-full h-fit" onClick={openUpdate}>تغییر</button>
            <Modal title={'ایجاد تغییرات'} ModalWidth={'max-w-3xl'} open={open} setOpen={setOpen}>
                <form className={'grid grid-cols-2 gap-4'}>
                    {
                        bookBuildingInputs.map((item: any) => {
                            return <InputComponent key={item.title} query={query} title={item?.title}
                                name={item?.name} queryUpdate={queryUpdate} valueType={item?.valueType}
                                type={item?.type} selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange} />

                        })
                    }
                </form>
                <div className={'flex justify-end space-x-reverse space-x-2 mt-5'}>
                    <button className="p-1 px-3 rounded-full bg-red-500" onClick={() => setOpen(false)}>لغو</button>
                    <button className="p-1 px-3 rounded-full bg-lime-500" onClick={updateHandler}>تایید</button>
                </div>
            </Modal>

        </>
    )
}