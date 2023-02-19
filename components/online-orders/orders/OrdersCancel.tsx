import Modal from "../../common/layout/Modal";
import React, {useContext, useState} from "react";
import {cancelOrder} from "../../../api/online-trades-orders.api";
import {toast} from "react-toastify";
import {errors} from "../../../dictionary/Enums";
import {OrdersContext} from "../../../pages/online-trades-orders/orders";

export default function OrdersCancel(){
    const [modal,setModal]=useState(false)
    const {query,onSubmit,selectedRows,setSelectedRows} = useContext<any>(OrdersContext)

    const cancelMultipleOrders = (e:any) => {
        const cancel = async (order: any) => {
            await cancelOrder({
                orderId: order.orderId,
                customerId: order.customerId,
                sourceOfRequests: 3
            }).then(() =>{
                onSubmit(e,query)
            })
                .catch((err: any) => {
                    toast.error(`${err?.response?.data?.error?.message || errors.find((item: any) => item.errorCode === err?.response?.data?.error?.code)?.errorText}`)
                })
        }
        selectedRows.map((order: any) => {
            cancel(order)
        })
        setSelectedRows([])
    }

    const openModalHandler = ()=>{
        if (selectedRows.length === 0){
            toast.warning('انتخابی برای حذف گروهی نشده است')
        }else{
            setModal(true)
        }
    }

    console.log(selectedRows)
    return(
        <>
            <Modal title={'حذف شرکت'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    {/*<div>{*/}
                    {/*    "آیا از حذف"*/}
                    {/*    + " " +*/}
                    {/*    page?.searchFilter + " " +*/}
                    {/*    targetToEdit?.title + " " +*/}
                    {/*    "اطمینان دارید؟"*/}
                    {/*}*/}
                    {/*</div>*/}
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                                onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="button bg-lime-600" onClick={cancelMultipleOrders}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="button bg-red-600" onClick={() => openModalHandler()}>
                حذف گروهی
            </button>
        </>
    )
}