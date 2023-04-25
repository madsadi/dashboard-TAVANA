import React, {useContext, useState} from "react";
import Modal from "../common/layout/Modal";
import { deleteBookBuilding } from "../../api/book-building.api";
import { toast } from "react-toastify";
import {BookBuildingContext} from "./tableSection";

export default function RemoveModal() {
    const {onSubmit, query: bookBuildingQuery,selectedRows} = useContext<any>(BookBuildingContext)
    const [modal, setModal] = useState(false);

    const confirmDeleteSelected = () => {
        if (selectedRows.length === 1) {
            setModal(true);
        } else {
            toast.warning('لطفا یک گزینه را انتخاب کنید')
        }
    }

    const deleteHandler = async (e:any) => {
        await deleteBookBuilding(selectedRows[0]?.instrumentId)
            .then(() => {
                onSubmit(e,bookBuildingQuery)
                setModal(false);
                toast.success('با موفقیت انجام شد')
            })
            .catch(err => {
                toast.error('ناموفق')
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