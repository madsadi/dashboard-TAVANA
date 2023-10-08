import React, { useContext, useState } from "react";
import Modal from "../../../../common/layout/modal";
import { throwToast } from "../../../../common/functions/notification";
import useMutation from "../../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../../api/constants";
import { MarketerContractDetailContext } from "pages/marketer-app/marketer-contract/[...contractId]";
import { Button } from "components/common/components/button/button";

export default function DeleteMarketerContractCoefDetail() {
    const { coefficientFetch, coefficientSearchQuery, contractId } = useContext<any>(MarketerContractDetailContext)
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/marketer-contract-coefficient/delete`, method: "DELETE" })
    const [modal, setModal] = useState(false)

    const openHandler = () => {
        setModal(true)
    }

    const submitHandler = async (e: any) => {
        e.preventDefault()
        await mutate({}, { ContractID: contractId })
            .then((res) => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                setModal(false)
                coefficientFetch(coefficientSearchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <>
            <Button className={'bg-error'} label="حذف ضریب قرارداد بازاریاب" onClick={openHandler} />
            <Modal title={'حذف ضریب قرارداد بازاریاب'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <p className={'text-center'}>آیا از حذف کردن ضریب این قرارداد اطمینان دارید؟</p>
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