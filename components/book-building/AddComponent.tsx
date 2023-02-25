import React, {useContext, useEffect, useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import Modal from "../common/layout/Modal";
import {addBookBuilding} from "../../api/book-building.api";
import moment from "jalali-moment";
import {toast} from "react-toastify";
import InputComponent from "../common/components/InputComponent";
import {BookBuildingContext} from "./tableSection";

const bookBuildingInputs = [
    {title: 'instrumentId', name: 'شناسه نماد', type: 'input'},
    {title: 'maxQuantity', name: 'بیشینه حجم سفارش', type: 'input', valueType: 'number'},
    {title: 'minPrice', name: 'حداقل قیمت سفارش', type: 'input', valueType: 'number'},
    {title: 'maxPrice', name: 'حداکثر قیمت سفارش', type: 'input', valueType: 'number'},
    { title: 'startHour', name: 'زمان شروع', type: 'selectInputTime'},
    { title: 'startMinute', name: 'زمان شروع'},
    { title: 'endHour', name: 'زمان پایان', type: 'selectInputTime'},
    { title: 'endMinute', name: 'زمان پایان'},
    {title: 'date', name: 'تاریخ شروع و پایان', type: 'date'},
]

const bookBuildingInitialValue = {instrumentId:'',maxQuantity:null,minPrice:null,maxPrice:null,StartDate:'',EndDate:'',startHour:null,startMinute:null,endHour:null,endMinute:null}
export default function AddModal() {
    const {onSubmit, query: bookBuildingQuery} = useContext<any>(BookBuildingContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(bookBuildingInitialValue)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const addNewHandler = async (e:any) => {
        if (query?.instrumentId && query?.maxQuantity) {
            await addBookBuilding({
                instrumentId: query.instrumentId,
                maxQuantity: query.maxQuantity,
                minPrice: query.minPrice,
                maxPrice: query.maxPrice,
                fromActiveDateTime: moment(query.StartDate).locale('en').format('YYYY-MM-DD')+`${query?.startHour ? 'T'+query?.startHour+':':''}`+`${query?.startMinute ? query?.startMinute+':00':''}`,
                toActiveDateTime: moment(query.EndDate).locale('en').format('YYYY-MM-DD')+`${query?.endHour ? 'T'+query?.endHour+':':''}`+`${query?.endMinute ? query?.endMinute+':00':''}`,
            }).then(() => {
                setModal(false)
                toast.success('با موفقیت انجام شد')
                setQuery(null)
                setSelectedDayRange({from: null, to: null})
                onSubmit(e,bookBuildingQuery)
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.error?.message)
                })
        } else {
            if (!query.maxQuantity) {
                toast.warning('بیشینه حجم سفارش را لطفا وارد کنید')
            } else if (!query.instrumentId) {
                toast.warning('کد نماد را لطفا وارد کنید')
            }
        }
    }

    useEffect(()=>{
        if (!modal){
            setQuery(bookBuildingInitialValue)
            setSelectedDayRange({from:null,to:null})
        }
    },[modal])

    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>جدید</button>
            <Modal title={'جزییات کارمزد جدید'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            bookBuildingInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       setQuery={setQuery}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
                                                       selectedDayRange={selectedDayRange}
                                                       setSelectedDayRange={setSelectedDayRange}/>

                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}>لغو
                        </button>
                        <button type={"submit"} className="button bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}