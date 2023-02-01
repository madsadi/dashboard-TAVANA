import React, { useState } from "react";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import Modal from "../common/Modal";
import { deleteBookBuilding, updateBookBuilding } from "../../api/bookBuilding";
import moment from "jalali-moment";
import { toast } from "react-toastify";
import InputComponent from "../common/InputComponent";
import { jalali } from "../commonFn/commonFn";

export default function RemoveModal({ gridRef }: { gridRef: any }) {
    const [open, setOpen] = useState(false);

    const confirmDeleteSelected = () => {
        if (gridRef.current?.api?.getSelectedRows().length === 1) {
            setOpen(true);
        } else {
            toast.error('لطفا یک گزینه را انتخاب کنید')
        }
    }

    const deleteHandler = async () => {
        await deleteBookBuilding(gridRef.current?.api?.getSelectedRows()?.[0]?.instrumentId)
            .then(res => {
                gridRef.current.api.applyTransaction({
                    remove: [gridRef.current?.api?.getSelectedRows()?.[0]]
                })
                setOpen(false);
                toast.success('با موفقیت انجام شد')
            })
            .catch(err => {
                toast.error('ناموفق')
            })
    }


    return (
        <>
            <button className="bg-red-500 p-1 px-2 rounded-full h-fit" onClick={confirmDeleteSelected}>حذف</button>
            <Modal title={'تایید حذف'} open={open} setOpen={setOpen}>
                <div className="flex flex-col">
                    <div className={'mx-auto'}>آیا از حذف ردیف مورد نظر اطمینان دارید؟</div>
                    <div className={'mr-auto space-x-reverse space-x-2 mt-3'}>
                        <button className="p-1 px-4 rounded-full bg-red-500"
                            onClick={() => setOpen(false)}>خیر
                        </button>
                        <button className="p-1 px-4 rounded-full bg-lime-600" onClick={deleteHandler}>بله</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}