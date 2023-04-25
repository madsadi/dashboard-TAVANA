import React, {useContext, useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import Modal from "../common/layout/Modal";
import {updateBookBuilding} from "../../api/book-building.api";
import moment from "jalali-moment";
import {toast} from "react-toastify";
import InputComponent from "../common/components/InputComponent";
import {jalali} from "../common/functions/common-funcions";
import {BookBuildingContext} from "./tableSection";

const bookBuildingInputs = [
    {title: 'instrumentId', name: 'شناسه نماد', type: 'input'},
    // { title: 'faInsCode', name: 'نماد', type: 'input' },
    {title: 'maxQuantity', name: 'بیشینه حجم سفارش', type: 'input', valueType: 'number'},
    {title: 'minPrice', name: 'حداقل قیمت سفارش', type: 'input', valueType: 'number'},
    {title: 'maxPrice', name: 'حداکثر قیمت سفارش', type: 'input', valueType: 'number'},
    { title: 'startHour', name: 'زمان شروع', type: 'selectInputTime'},
    { title: 'startMinute', name: 'زمان شروع'},
    { title: 'endHour', name: 'زمان پایان', type: 'selectInputTime'},
    { title: 'endMinute', name: 'زمان پایان'},
    {title: 'date', name: 'تاریخ شروع و پایان', type: 'date'},
]

const bookBuildingInputsInitialValue = {
    instrumentId: '',
    // faInsCode: '',
    maxQuantity: null,
    minPrice: null,
    maxPrice: null,
    StartDate: null,
    EndDate: null,
    startHour:null,
    startMinute:null,
    endHour:null,
    endMinute:null
}

export default function EditModal() {
    const {onSubmit, query: bookBuildingQuery, selectedRows} = useContext<any>(BookBuildingContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const openUpdate = () => {
        if (selectedRows.length) {
            let _date: any = {}
            _date['from'] = {
                year: Number(jalali(selectedRows[0]?.fromActiveDateTime).date.split('/')[0]),
                month: Number(jalali(selectedRows[0]?.fromActiveDateTime).date.split('/')[1]),
                day: Number(jalali(selectedRows[0]?.fromActiveDateTime).date.split('/')[2])
            }
            _date['to'] = {
                year: Number(jalali(selectedRows[0]?.toActiveDateTime).date.split('/')[0]),
                month: Number(jalali(selectedRows[0]?.toActiveDateTime).date.split('/')[1]),
                day: Number(jalali(selectedRows[0]?.toActiveDateTime).date.split('/')[2])
            }
            setSelectedDayRange(_date)
            setQuery({
                ...selectedRows[0],
                StartDate: moment(selectedRows[0].fromActiveDateTime).locale('en').format('YYYY-MM-DD'),
                EndDate: moment(selectedRows[0].toActiveDateTime).locale('en').format('YYYY-MM-DD'),
                startHour: (selectedRows[0].fromActiveDateTime).split('T')[1].split(':')[0],
                startMinute: (selectedRows[0].fromActiveDateTime).split('T')[1].split(':')[1],
                endHour: (selectedRows[0].toActiveDateTime).split('T')[1].split(':')[0],
                endMinute: (selectedRows[0].toActiveDateTime).split('T')[1].split(':')[0]
            })
            setModal(true);
        } else {
            toast.warning('لطفا یک گزینه را انتخاب کنید')
        }
    }

    const updateHandler = async (e: any) => {
        await updateBookBuilding({
            instrumentId: query?.instrumentId,
            maxQuantity: query?.maxQuantity,
            minPrice: query?.minPrice,
            maxPrice: query?.maxPrice,
            fromActiveDateTime: moment(query.StartDate).locale('en').format('YYYY-MM-DD')+`${query?.startHour ? 'T'+query?.startHour+':':''}`+`${query?.startMinute ? query?.startMinute+':00':''}`,
            toActiveDateTime: moment(query.EndDate).locale('en').format('YYYY-MM-DD')+`${query?.endHour ? 'T'+query?.endHour+':':''}`+`${query?.endMinute ? query?.endMinute+':00':''}`,
        })
            .then(() => {
                toast.success('با موفقیت انجام شد')
                setModal(false)
                onSubmit(e, bookBuildingQuery)
            })
            .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
    }

    return (
        <>
            <button className="button bg-orange-400" onClick={openUpdate}>ویرایش</button>
            <Modal title={'ایجاد تغییرات'} ModalWidth={'max-w-3xl'} open={modal} setOpen={setModal}>
                <form className={'grid grid-cols-2 gap-4'}>
                    {
                        bookBuildingInputs.map((item: any) => {
                            return <InputComponent key={item.title}
                                                   query={query}
                                                   item={item}
                                                   setQuery={setQuery}
                                                   selectedDayRange={selectedDayRange}
                                                   setSelectedDayRange={setSelectedDayRange}/>

                        })
                    }
                </form>
                <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                    <button className="button bg-red-500" onClick={() => setModal(false)}>لغو</button>
                    <button className="button bg-lime-500" onClick={updateHandler}>تایید</button>
                </div>
            </Modal>

        </>
    )
}