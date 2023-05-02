import React, {useEffect, useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import Modal from "../common/layout/Modal";
import moment from "jalali-moment";
import InputComponent from "../common/components/InputComponent";
import useMutation from "../../hooks/useMutation";
import {ADMIN_GATEWAY} from "../../api/constants";
import {throwToast} from "../common/functions/notification";

const bookBuildingInputs = [
    {title: 'instrumentId', name: 'شناسه نماد', type: 'search'},
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
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/request/addBookBuilding`})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(bookBuildingInitialValue)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const addNewHandler = async (e:any) => {
        if (query?.instrumentId && query?.maxQuantity) {
            await mutate({
                instrumentId: query.instrumentId,
                maxQuantity: query.maxQuantity,
                minPrice: query.minPrice,
                maxPrice: query.maxPrice,
                fromActiveDateTime: moment(query.StartDate).locale('en').format('YYYY-MM-DD')+`${query?.startHour ? 'T'+query?.startHour+':':''}`+`${query?.startMinute ? query?.startMinute+':00':''}`,
                toActiveDateTime: moment(query.EndDate).locale('en').format('YYYY-MM-DD')+`${query?.endHour ? 'T'+query?.endHour+':':''}`+`${query?.endMinute ? query?.endMinute+':00':''}`,
            }).then(() => {
                setModal(false)
                throwToast({type:'success',value:'با موفقیت انجام شد'})
                setQuery(null)
                setSelectedDayRange({from: null, to: null})
            })
                .catch((err) => throwToast({type:'error',value:err}))

        } else {
            if (!query.maxQuantity) {
                throwToast({type:'warning',value:'بیشینه حجم سفارش را لطفا وارد کنید'})
            } else if (!query.instrumentId) {
                throwToast({type:'warning',value:'کد نماد را لطفا وارد کنید'})
            }
        }
    }

    useEffect(()=>{
        if (!modal){
            setQuery(bookBuildingInitialValue)
            setSelectedDayRange({from:null,to:null})
        }
    },[modal])

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>جدید</button>
            <Modal title={'عرضه اولیه جدید'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            bookBuildingInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       onChange={onChange}
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