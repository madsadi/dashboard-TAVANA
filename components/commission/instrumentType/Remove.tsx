import React, {useContext, useState} from "react";
import {toast} from "react-toastify";
import {deleteCommission} from "../../../api/commission.api";
import Modal from "../../common/layout/Modal";
import {InstrumentTypeContext} from "./ResultTable";

export default function Remove(){
    const  [modal,setModal] = useState(false)
    const {onSubmit, query: insQuery,selectedRows} = useContext<any>(InstrumentTypeContext)

    const confirmDeleteSelected = () => {
        if (selectedRows.length ===1) {
            setModal(true);
        } else {
            toast.error('لطفا یک گزینه را انتخاب کنید')
        }
    }
    const deleteHandler = async () => {
        await deleteCommission({id: selectedRows?.[0]?.id})
            .then(() => {
                toast.success('با موفقیت انجام شد');
                setModal(false)
            })
            .catch(() => toast.error('ناموفق'))
    }
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