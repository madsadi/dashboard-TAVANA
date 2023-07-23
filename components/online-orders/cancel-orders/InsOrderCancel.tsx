import React, { useState } from "react";
import { errors } from "../../../constants/Enums";
import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";

export default function InsOrderCancel() {
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const { toolbar } = useSearchFilters(ModuleIdentifier.ONLINE_CANCEL, 'instrumentOrder')
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/GlobalCancel/CancelAllOrderForInstrument` })
    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    const confirmInsRemoving = async () => {
        await mutate({
            isin: query.InstrumentId,
            orderSide: query.orderSide,
            orderOrigin: query.orderOrigin,
            orderTechnicalOrigin: query.orderTechnicalOrigin,
        }).then(() => {
            throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
            setModal(false)
        })
            .catch((err) => {
                throwToast({ type: 'customError', value: `${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code)?.errorText}` })
            })
    }
    return (
        <>
            <button className="button bg-red-600 "
                onClick={() => setModal(true)}>حذف سفارش نماد
            </button>
            <Modal title={"حذف سفارش نماد"} open={modal} setOpen={setModal}>
                <div className="grid grid-cols-2 gap-4 pt-5">
                    {toolbar.map((filter: any) => {
                        return <InputComponent key={filter.title}
                            item={filter}
                            onChange={onChange}
                            query={query}
                        />

                    })}
                </div>
                <div className={'text-left space-x-2 space-x-reverse mt-4'}>
                    <button className="button bg-red-500" onClick={() => setModal(false)}>لغو
                    </button>
                    <button className="button bg-lime-600" onClick={confirmInsRemoving}>تایید</button>
                </div>
            </Modal>
        </>
    )
}