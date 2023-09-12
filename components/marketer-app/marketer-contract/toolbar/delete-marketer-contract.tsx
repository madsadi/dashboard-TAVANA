import React, { useContext, useState } from "react";
import Modal from "../../../common/layout/modal";
import { throwToast } from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { MarketerContractContext } from "pages/marketer-app/marketer-contract";

export default function DeleteMarketerContract() {
    const { selectedRows, setSelectedRows, fetchData, searchQuery } = useContext<any>(MarketerContractContext)
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/marketer-contract/delete`, method: "DELETE" })
    const [modal, setModal] = useState(false)

    const openHandler = () => {
        if (selectedRows?.length === 1) {
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای حذف انتخاب کنید' })
        }
    }
    const submitHandler = async (e: any) => {
        e.preventDefault()
        await mutate({}, { MarketerID: selectedRows[0].MarketerID })
            .then((res) => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                setModal(false)
                setSelectedRows([])
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <>
            <button className={'button bg-red-600'} onClick={openHandler}>
                حذف قرارداد بازاریاب
            </button>
            <Modal title={'حذف قرارداد بازاریاب'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <p className={'text-center'}>آیا از حذف کردن این قرارداد اطمینان دارید؟</p>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                            onClick={(e) => {
                                e.preventDefault()
                                setModal(false)
                            }}>لغو
                        </button>
                        <button type={"submit"} onClick={submitHandler} className="button bg-lime-600" >تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}