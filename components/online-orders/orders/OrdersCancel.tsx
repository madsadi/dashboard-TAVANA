import React, { useContext, useState } from "react";
import Modal from "../../common/layout/Modal";
import { errors } from "../../../constants/Enums";
import { OrdersContext } from "../../../pages/online-trades-orders/orders";
import { throwToast } from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";

export default function OrdersCancel() {
    const [modal, setModal] = useState(false)
    const { query, fetchData, selectedRows, setSelectedRows } = useContext<any>(OrdersContext)
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/Cancel` })
    const cancelMultipleOrders = (e: any) => {
        const cancel = async (order: any) => {
            await mutate({
                orderId: order.orderId,
                customerId: order.customerId,
                sourceOfRequests: 3
            }).then(() => {
                fetchData(query)
            })
                .catch((err: any) => {
                    throwToast({
                        type: 'customError',
                        value: `${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code)?.errorText}`
                    })
                })
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
            <Modal title={'لغو سفارش'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <div className={'flex text-center justify-center'}>
                        آیا از حذف
                        <span className={'mx-1 font-extrabold'}>{selectedRows.length}</span>
                        سفارش انتخابی اطمینان دارید؟
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                            onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="button bg-lime-600" onClick={cancelMultipleOrders}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="button bg-red-600" onClick={() => openModalHandler()}>
                لغو سفارش
            </button>
        </>
    )
}