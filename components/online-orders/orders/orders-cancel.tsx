import React, { useContext, useState } from "react";
import Modal from "../../common/layout/modal";
import { errors } from "../../../constants/Enums";
import { OrdersContext } from "../../../pages/online-trades-orders/orders";
import { throwToast } from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { Button } from "../../common/components/button/button";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";

export default function OrdersCancel() {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { restriction, service, modules } = useSearchFilters(ModuleIdentifier.ONLINE_ORDERS)
    const { query, fetchData, selectedRows, setSelectedRows } = useContext<any>(OrdersContext)
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/Cancel` })
    const cancelMultipleOrders = (e: any) => {
        const cancel = async (order: any) => {
            setLoading(true)
            await mutate({
                orderId: order.orderId,
                customerId: order.customerId,
                sourceOfRequests: 3
            })
                .then(() => {
                    fetchData(query)
                })
                .catch((err: any) => {
                    throwToast({
                        type: 'customError',
                        value: `${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code)?.errorText}`
                    })
                })
                .finally(() => setLoading(false))
        }
        selectedRows.map((order: any) => {
            cancel(order)
        })
        setSelectedRows([])
    }

    const openModalHandler = () => {
        if (selectedRows.length === 0) {
            throwToast({ type: 'warning', value: 'انتخابی برای حذف گروهی نشده است' })
        } else {
            setModal(true)
        }
    }

    return (
        <>
            <Button label={'لغو سفارش'}
                className="bg-red-600"
                onClick={openModalHandler}
                allowed={restriction ? [[service[1], modules?.[1]?.[0], 'CancelUserOrder'].join('.')] : []}
            />
            <Modal title={'لغو سفارش'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <div className={'flex text-center justify-center'}>
                        آیا از حذف
                        <span className={'mx-1 font-extrabold'}>{selectedRows.length}</span>
                        سفارش انتخابی اطمینان دارید؟
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <Button label={'لغو '}
                            className="bg-red-500"
                            onClick={() => setModal(false)}
                        />
                        <Button label={'تایید '}
                            className="bg-fuchsia-600"
                            onClick={cancelMultipleOrders}
                            loading={loading}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}