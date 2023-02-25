import React, {useState} from "react";
import {insCancel} from "../../../api/online-trades-orders.api";
import {toast} from "react-toastify";
import {errors} from "../../../dictionary/Enums";
import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";

const InstrumentFilters = [
    {title: 'InstrumentId', name: 'نماد', type: 'search'},
    {title: 'orderSide', name: 'سمت سفارش', type: 'selectInput',valueType:"number"},
    {title: 'orderOrigin', name: 'نوع کاربر', type: 'selectInput',valueType:"number"},
    {title: 'orderTechnicalOrigin', name: 'مرجع تکنیکال سفارش', type: 'selectInput',valueType:"number"},
]

type InitialType = {
    InstrumentId:string,
    orderSide:number,
    orderOrigin:number,
    orderTechnicalOrigin:number,
}
const InitialValue = {
    InstrumentId:'',
    orderSide:0,
    orderOrigin:0,
    orderTechnicalOrigin:0,
}

export default function InsOrderCancel(){
    const [modal,setModal] = useState(false)
    const [query,setQuery] = useState<InitialType>(InitialValue)

    const confirmInsRemoving = async () => {
        await insCancel({
            isin: query.InstrumentId,
            orderSide: query.orderSide,
            orderOrigin: query.orderOrigin,
            orderTechnicalOrigin: query.orderTechnicalOrigin,
        }).then(() => {
            toast.success('با موفقیت انجام شد')
            setModal(false)
        })
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code)?.errorText}`)
            })
    }
    return(
        <>
            <button className="button bg-red-600 "
                    onClick={() => setModal(true)}>حذف سفارش نماد
            </button>
            <Modal title={"حذف سفارش نماد"} open={modal} setOpen={setModal}>
                <div className="grid grid-cols-2 gap-4 pt-5">
                    {InstrumentFilters.map((filter: any) => {
                        return <InputComponent key={filter.title}
                                               type={filter.type}
                                               name={filter.name}
                                               setQuery={setQuery}
                                               valueType={filter?.valueType}
                                               query={query}
                                               title={filter.title}
                        />

                    })}
                </div>
                <div className={'text-left space-x-2 space-x-reverse mt-4'}>
                    <button className="button bg-red-500" onClick={() => setModal(false)}>لغو
                    </button>
                    <button className="button bg-lime-600" onClick={confirmInsRemoving}>تایید</button>
                </div>
            </Modal>
        </>
    )
}