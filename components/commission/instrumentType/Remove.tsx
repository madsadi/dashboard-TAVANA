import React, {useContext, useState} from "react";
import Modal from "../../common/layout/Modal";
import {InstrumentTypeContext} from "./ResultTable";
import {throwToast} from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import { COMMISSION_BASE_URL } from "../../../api/constants";

export default function Remove(){
    const  [modal,setModal] = useState(false)
    const {onSubmit, query: insQuery,selectedRows} = useContext<any>(InstrumentTypeContext)
    const {mutate} = useMutation({url:`${COMMISSION_BASE_URL}/api/CommissionInstrumentType/Delete`,method:"PUT"})
    const confirmDeleteSelected = () => {
        if (selectedRows.length ===1) {
            setModal(true);
        } else {
            throwToast({type:'warning',value:'لطفا یک گزینه را انتخاب کنید'})
        }
    }
    const deleteHandler = async () => {
        await mutate({id: selectedRows?.[0]?.id})
            .then(() => {
                throwToast({type:'success',value:'با موفقیت انجام شد'})
                setModal(false)
                onSubmit(insQuery)
            })
            .catch((err) => {
                throwToast({type:'error',value:err})
            })    }
    return(
        <>
            <button className="button bg-red-600" onClick={confirmDeleteSelected}>حذف</button>
            <Modal title={'تایید حذف'} open={modal} setOpen={setModal}>
                <div className="flex flex-col">
                    <div className={'mx-auto'}>آیا از حذف ردیف مورد نظر اطمینان دارید؟</div>
                    <div className={'mr-auto space-x-reverse space-x-2 mt-3'}>
                        <button className="button bg-red-500"
                                onClick={() => setModal(false)}>خیر
                        </button>
                        <button className="button bg-lime-600" onClick={deleteHandler}>بله</button>
                    </div>
                </div>
            </Modal>

        </>
    )
}