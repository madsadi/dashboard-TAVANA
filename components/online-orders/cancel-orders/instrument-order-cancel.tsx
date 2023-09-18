import React, { useState } from "react";
import { errors } from "../../../constants/Enums";
import Modal from "../../common/layout/modal";
import InputComponent from "../../common/components/input-generator";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import { Button } from "../../common/components/button/button";

export default function InsOrderCancel() {
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { toolbar, modules, service, restriction } = useSearchFilters(ModuleIdentifier.ONLINE_CANCEL, 'instrumentOrder')
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/GlobalCancel/CancelAllOrderForInstrument` })
    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    const confirmInsRemoving = async () => {
        setLoading(true)
        await mutate({
            isin: query.InstrumentId,
            orderSide: query.orderSide,
            orderOrigin: query.orderOrigin,
            orderTechnicalOrigin: query.orderTechnicalOrigin,
        })
            .then(() => {
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
                setModal(false)
            })
            .catch((err) => {
                throwToast({ type: 'customError', value: `${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code)?.errorText}` })
            })
            .finally(() => setLoading(false))
    }
    return (
        <>
            <Button label={'حذف سفارش نماد'}
                className="bg-red-600"
                onClick={() => setModal(true)}
                allowed={restriction ? [[service[1], modules[1][0], 'GlobalCancelOrderRequest'].join('.')] : []}
            />
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
                    <Button label={'لغو'}
                        className="bg-red-500"
                        onClick={() => setModal(false)}
                    />
                    <Button label={'تایید'}
                        className="bg-green-600"
                        onClick={confirmInsRemoving}
                        loading={loading}
                    />
                </div>
            </Modal>
        </>
    )
}