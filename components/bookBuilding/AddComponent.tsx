import React, {useEffect, useState} from "react";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import Modal from "../common/Modal";
import { addBookBuilding } from "../../api/bookBuilding";
import moment from "jalali-moment";
import { toast } from "react-toastify";
import InputComponent from "../common/InputComponent";
import { initial } from "lodash";

const bookBuildingInputs = [
    { title: 'instrumentId', name: 'شناسه نماد', type: 'input' },
    { title: 'maxQuantity', name: 'بیشینه حجم سفارش', type: 'input', valueType: 'number' },
    { title: 'minPrice', name: 'حداقل قیمت سفارش', type: 'input', valueType: 'number' },
    { title: 'maxPrice', name: 'حداکثر قیمت سفارش', type: 'input', valueType: 'number' },
    { title: 'startHour', name: 'زمان شروع', type: 'selectInputTime'},
    { title: 'startMinute', name: 'زمان شروع'},
    { title: 'endHour', name: 'زمان پایان', type: 'selectInputTime'},
    { title: 'endMinute', name: 'زمان پایان'},
    { title: 'date', name: 'تاریخ شروع و پایان', type: 'date' },
]
export default function AddModal({ gridRef }: { gridRef: any }) {
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

    const addNewHandler = async () => {
        if (query.instrumentId && query.maxQuantity) {
            await addBookBuilding({
                instrumentId: query.instrumentId,
                maxQuantity: query.maxQuantity,
                minPrice: query.minPrice,
                maxPrice: query.maxPrice,
                fromActiveDateTime: moment(query.StartDate).locale('en').format('YYYY-MM-DD')+'T'+query.startHour+':'+query.startMinute+':'+'00',
                toActiveDateTime: moment(query.EndDate).locale('en').format('YYYY-MM-DD')+'T'+query.endHour+':'+query.endMinute+':'+'00',
            }).then(res => {
                setOpen(false)
                toast.success('با موفقیت انجام شد')
                gridRef.current.api.applyTransaction({
                    add: [{
                        instrumentId: query.instrumentId,
                        maxQuantity: query.maxQuantity,
                        minPrice: query.minPrice,
                        maxPrice: query.maxPrice,
                        fromActiveDateTime: moment(query.StartDate).locale('en').format('YYYY/MM/DD'),
                        toActiveDateTime: moment(query.EndDate).locale('en').format('YYYY/MM/DD'),
                    }],
                    addIndex: 0
                })
                setQuery(null)
                setSelectedDayRange({ from: null, to: null })
            })
                .catch(err => {
                    toast.error('ناموفق')
                })
        } else {
            if (!query.maxQuantity) {
                toast.error('بیشینه حجم سفارش را لطفا وارد کنید')
            } else if (!query.instrumentId) {
                toast.error('کد نماد را لطفا وارد کنید')
            }
        }
    }

    useEffect(()=>{
        setQuery(null)
        setSelectedDayRange({from:null,to:null})
    },[open])
    return (
        <>
            <button className="bg-lime-600 p-1 px-2 rounded-full h-fit" onClick={() => setOpen(true)}>جدید</button>
            <Modal title={'جزییات کارمزد جدید'} ModalWidth={'max-w-3xl'} setOpen={setOpen}
                open={open}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            bookBuildingInputs.map((item: any) => {
                                return <InputComponent key={item.title} query={query} title={item?.title}
                                    name={item?.name} queryUpdate={queryUpdate} valueType={item?.valueType}
                                    type={item?.type} selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange} />
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2'}>
                        <button className="p-1 px-3 rounded-full bg-red-500"
                            onClick={() => setOpen(false)}>لغو
                        </button>
                        <button className="p-1 px-3 rounded-full bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}