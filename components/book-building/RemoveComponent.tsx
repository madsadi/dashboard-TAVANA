import React, {useContext, useState} from "react";
import Modal from "../common/layout/Modal";
import {BookBuildingContext} from "./BookBuilding";
import {throwToast} from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import {ADMIN_GATEWAY} from "../../api/constants";

export default function RemoveModal() {
    const {onSubmit, query: bookBuildingQuery,selectedRows} = useContext<any>(BookBuildingContext)
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/api/request/DeleteBookBuilding`,method:"DELETE"})
    const [modal, setModal] = useState(false);

    const confirmDeleteSelected = () => {
        if (selectedRows.length === 1) {
            setModal(true);
        } else {
            throwToast({type:'warning',value:'لطفا یک گزینه را انتخاب کنید'})
        }
    }

    const deleteHandler = async () => {
        await mutate({},{InstrumentId:selectedRows[0]?.instrumentId})
            .then(() => {
                setModal(false);
                throwToast({type:'success',value:'با موفقیت انجام شد'})
            })
            .catch(err => {
                throwToast({type:'error',value:err})
            })
    }


    return (
        <>
            <button className="bg-red-500 button" onClick={confirmDeleteSelected}>حذف</button>
            <Modal title={'تایید حذف'} open={modal} setOpen={setModal}>
                <div className="flex flex-col">
                    <div className={'mx-auto'}>آیا از حذف ردیف مورد نظر اطمینان دارید؟</div>
                    <div className={'mr-auto space-x-reverse space-x-2 mt-10'}>
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