import Modal from "../common/Modal";
import React, {useContext, useState} from "react";
import { toast } from "react-toastify";
import { remove } from "../../api/holdings";
import usePageStructure from "../../hooks/usePageStructure";
import moment from "jalali-moment";
import {CustomerManagement} from "../../pages/financialHoldings/[[...page]]";
import {fetchData} from "../../api/clearedTradesReport";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";

export default function Remove({ gridRef }: { gridRef: any }) {
    const {setTotal:setTotalCount,query:searchFilter} = useContext<any>(CustomerManagement)
    const [editModal, setEditModal] = useState(false)
    const [targetToEdit, setTargetToEdit] = useState<any>(null)
    const { page } = usePageStructure()

    const onSubmit = async (event: any,query:any) => {
        event.preventDefault()
        const bodyConstructor = (query: any) => {
            let body: any = {}
            Object.keys(query).map((item: any) => {
                body[item] = query[item]
            })
            return body
        }
        await fetchData(`${MARKET_RULES_MANAGEMENT}/request/${page?.api}/Search`, bodyConstructor(query))
            .then((res) => {
                if (res.result?.pagedData){
                    gridRef?.current?.api?.setRowData(res.result?.pagedData)
                    setTotalCount(res?.result?.totalCount)
                    toast.success('با موفقیت انجام شد')
                }else{
                    gridRef?.current?.api?.setRowData(res?.result)
                    setTotalCount(res?.totalRecord)
                    toast.success('با موفقیت انجام شد')
                }
            })
            .catch(() => toast.error('ناموفق'))
    }
    const removeHandler = async (e:any) => {
        await remove(page.api, targetToEdit.id)
            .then(() => {
                setEditModal(false);
                    // gridRef.current.api.applyTransaction({
                    //     remove: [targetToEdit]
                    // })
                onSubmit(e,searchFilter)
            })
            .catch(() => {
                setEditModal(false);
            })
    }

    const openModalHandler = () => {
        let selectedProducts = gridRef.current?.api?.getSelectedRows();
        if (selectedProducts.length === 1) {
            setTargetToEdit(selectedProducts[0])
            setEditModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }
    }


    return (
        <>
            <Modal title={'حذف شرکت'} setOpen={setEditModal} open={editModal}>
                <div className="field mt-4">
                    <div>{
                        "آیا از حذف"
                        + " " +
                        page?.searchFilter + " " +
                        targetToEdit?.title + " " +
                        "اطمینان دارید؟"
                    }
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2'}>
                        <button className="p-1 px-3 rounded-full bg-red-500"
                            onClick={() => setEditModal(false)}>لغو
                        </button>
                        <button className="p-1 px-3 rounded-full bg-lime-600" onClick={removeHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="p-1 px-2 rounded-full bg-red-600 mx-2" onClick={() => openModalHandler()}>
                حذف
            </button>
        </>
    )
}