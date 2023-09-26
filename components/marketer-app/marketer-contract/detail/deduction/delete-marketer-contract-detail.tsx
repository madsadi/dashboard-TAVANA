import React, { useContext, useState } from "react";
import Modal from "../../../../common/layout/modal";
import { throwToast } from "../../../../common/functions/notification";
import useMutation from "../../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../../api/constants";
import { MarketerContractDetailContext } from "pages/marketer-app/marketer-contract/[...contractId]";
import { Button } from "components/common/components/button/button";

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
            <Button label=" حذف کسورات قرارداد بازاریاب" className={'bg-error'} onClick={openHandler} />
            <Modal title={'حذف کسورات قرارداد بازاریاب'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <p className={'text-center'}>آیا از حذف کردن کسورات این قرارداد اطمینان دارید؟</p>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <Button className="bg-error"
                            label="لغو"
                            onClick={(e) => {
                                e.preventDefault()
                                setModal(false)
                            }} />
                        <Button type={"submit"} onClick={submitHandler} className="bg-primary" label="تایید" />
                    </div>
                </div>
            </Modal>
        </>
    )
}