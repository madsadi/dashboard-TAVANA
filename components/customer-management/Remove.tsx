import React, {useContext, useEffect, useState} from "react";
import Modal from "../common/layout/Modal";
import usePageStructure from "../../hooks/usePageStructure";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";
import {throwToast} from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";

export default function Remove() {
    const [modal, setModal] = useState(false)
    const [targetToEdit, setTargetToEdit] = useState<any>(null)
    const { page } = usePageStructure()
    const {mutate} = useMutation({url:`${MARKET_RULES_MANAGEMENT}/request/${page.api}/Delete`,method:"DELETE"})
    const { fetchData,query,selectedRows,setSelectedRows } = useContext<any>(CustomerManagement)

    useEffect(()=>{
        if (!modal){
            setSelectedRows([])
        }
    },[modal])

    const removeHandler = async () => {
        await mutate({},{Id:targetToEdit.id})
            .then(() => {
                setModal(false);
                fetchData(query)
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
            throwToast({type:'warning',value:'لطفا یک گزینه برای حذف انتخاب کنید'})
        }
    }


    return (
        <>
            <Modal title={` حذف ${page?.searchFilter} `} setOpen={setModal} open={modal}>
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