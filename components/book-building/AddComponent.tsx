import React, {useContext, useState} from "react";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import Modal from "../common/layout/Modal";
import {addBookBuilding} from "../../api/book-building.api";
import moment from "jalali-moment";
import {toast} from "react-toastify";
import InputComponent from "../common/components/InputComponent";
import {initial} from "lodash";
import {BookBuildingContext} from "./tableSection";

const bookBuildingInputs = [
    {title: 'instrumentId', name: 'شناسه نماد', type: 'input'},
    {title: 'maxQuantity', name: 'بیشینه حجم سفارش', type: 'input', valueType: 'number'},
    {title: 'minPrice', name: 'حداقل قیمت سفارش', type: 'input', valueType: 'number'},
    {title: 'maxPrice', name: 'حداکثر قیمت سفارش', type: 'input', valueType: 'number'},
    {title: 'date', name: 'تاریخ شروع و پایان', type: 'date'},
]
export default function AddModal() {
    const {onSubmit, query: bookBuildingQuery} = useContext<any>(BookBuildingContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const addNewHandler = async (e:any) => {
        if (query.instrumentId && query.maxQuantity) {
            await addBookBuilding({
                instrumentId: query.instrumentId,
                maxQuantity: query.maxQuantity,
                minPrice: query.minPrice,
                maxPrice: query.maxPrice,
                fromActiveDateTime: moment(query.StartDate).locale('en').format('YYYY-MM-DD'),
                toActiveDateTime: moment(query.EndDate).locale('en').format('YYYY-MM-DD'),
            }).then(() => {
                setModal(false)
                toast.success('با موفقیت انجام شد')
                setQuery(null)
                setSelectedDayRange({from: null, to: null})
                onSubmit(e,bookBuildingQuery)
            })
                .catch(() => {
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
                                                       queryUpdate={queryUpdate}
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