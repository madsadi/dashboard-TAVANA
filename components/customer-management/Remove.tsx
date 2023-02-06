import Modal from "../common/layout/Modal";
import React, {useContext, useState} from "react";
import { toast } from "react-toastify";
import { remove } from "../../api/holdings";
import usePageStructure from "../../hooks/usePageStructure";
import moment from "jalali-moment";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";

export default function Remove() {
    const [editModal, setEditModal] = useState(false)
    const [targetToEdit, setTargetToEdit] = useState<any>(null)
    const { page } = usePageStructure()
    const { onSubmit,query,selectedProducts } = useContext<any>(CustomerManagement)

    const removeHandler = async (e:any) => {
        await remove(page.api, targetToEdit.id)
            .then(() => {
                setEditModal(false);
                onSubmit(e,query)
            })
            .catch(() => {
                setEditModal(false);
            })
    }

    const openModalHandler = () => {
        if (selectedProducts.length === 1) {
            setTargetToEdit(selectedProducts[0])
            setEditModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }
    }


    return (
        <>
            <Modal title={'حذف شرکت'} setOpen={setEditModal} open={editModal}>
                <div className="field mt-4">
                    <div>{
                        "آیا از حذف"
                        + " " +
                        page?.searchFilter + " " +
                        targetToEdit?.title + " " +
                        "اطمینان دارید؟"
                    }
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2'}>
                        <button className="p-1 px-3 rounded-full bg-red-500"
                            onClick={() => setEditModal(false)}>لغو
                        </button>
                        <button className="p-1 px-3 rounded-full bg-lime-600" onClick={removeHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="button bg-red-600" onClick={() => openModalHandler()}>
                حذف
            </button>
        </>
    )
}