import React, { useContext, useState } from "react";
import Modal from "../../../common/layout/modal";
import { throwToast } from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { ReciteContext } from "../../../../pages/marketer-app/recite";

export default function DeleteMarketerRecite() {
    const { selectedRows, fetchData, searchQuery } = useContext<any>(ReciteContext)
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/factor/delete-factor`, method: "DELETE" })
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
        await mutate({}, { MarketerID: selectedRows[0].MarketerID, Period: selectedRows[0].Period })
            .then((res) => {
                throwToast({ type: 'success', value: `${res?.data?.result?.message}` })
                setModal(false)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <>
            <button className={'button bg-error'} onClick={openHandler}>
                حذف کردن صورت حساب
            </button>
            <Modal title={'حذف کردن صورت حساب'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <p className={'text-center'}>آیا از حذف کردن این صورتحساب اطمینان دارید؟</p>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-error"
                            onClick={(e) => {
                                e.preventDefault()
                                setModal(false)
                            }}>لغو
                        </button>
                        <button type={"submit"} onClick={submitHandler} className="button bg-primary" >تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}