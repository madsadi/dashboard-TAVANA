import Modal from "../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
import { remove } from "../../api/holdings";
import usePageStructure from "../../hooks/usePageStructure";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";

export default function Remove() {
    const [modal, setModal] = useState(false)
    const [targetToEdit, setTargetToEdit] = useState<any>(null)
    const { page } = usePageStructure()
    const { onSubmit,query,selectedRows,setSelectedRows } = useContext<any>(CustomerManagement)

    useEffect(()=>{
        if (!modal){
            setSelectedRows([])
        }
    },[modal])

    const removeHandler = async (e:any) => {
        await remove(page.api, targetToEdit.id)
            .then(() => {
                setModal(false);
                onSubmit(e,query)
            })
            .catch(() => {
                setModal(false);
            })
    }

    const openModalHandler = () => {
        if (selectedRows.length === 1) {
            setTargetToEdit(selectedRows[0])
            setModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای حذف انتخاب کنید')
        }
    }


    return (
        <>
            <Modal title={'حذف شرکت'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <div>{
                        "آیا از حذف"
                        + " " +
                        page?.searchFilter + " " +
                        targetToEdit?.title + " " +
                        "اطمینان دارید؟"
                    }
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                            onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="button bg-lime-600" onClick={removeHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="button bg-red-600" onClick={() => openModalHandler()}>
                حذف
            </button>
        </>
    )
}