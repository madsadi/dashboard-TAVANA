import React, { useContext, useState } from "react";
import Modal from "../../../../common/layout/modal";
import { throwToast } from "../../../../common/functions/notification";
import useMutation from "../../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../../api/constants";
import { MarketerContractDetailContext } from "pages/marketer-app/marketer-contract/[...contractId]";

export default function DeleteMarketerContractDetail() {
    const { deductionData, deductionFetch, deductionSearchQuery } = useContext<any>(MarketerContractDetailContext)
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/marketer-contract-deduction/delete`, method: "DELETE" })
    const [modal, setModal] = useState(false)

    const openHandler = () => {
        setModal(true)
    }

    const submitHandler = async (e: any) => {
        e.preventDefault()
        await mutate({}, { ContractID: deductionData[0].ContractID })
            .then((res) => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                setModal(false)
                deductionFetch(deductionSearchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <>
            <button className={'button bg-red-600'} onClick={openHandler}>
                حذف کسورات قرارداد بازاریاب
            </button>
            <Modal title={'حذف کسورات قرارداد بازاریاب'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <p className={'text-center'}>آیا از حذف کردن کسورات این قرارداد اطمینان دارید؟</p>
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