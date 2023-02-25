import Modal from "../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {edit} from "../../api/holdings";
import usePageStructure from "../../hooks/usePageStructure";
import InputComponent from "../common/components/InputComponent";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";

export default function Edit() {
    const [modal, setModal] = useState(false)
    const [queryEdit, setQueryEdit] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const {page} = usePageStructure()
    const {onSubmit, selectedRows,setSelectedRows,query} = useContext<any>(CustomerManagement)

    useEffect(()=>{
        if (!modal){
            setSelectedRows([])
        }
    },[modal])

    useEffect(() => {
        if (page?.form && selectedRows[0]) {
            let ToEdit = selectedRows[0]
            let initialValue: any = {};
            (page?.form)?.map((item: any) => {
                if (typeof ToEdit[item.title] == "string" || typeof ToEdit[item.title] == "number") {
                    initialValue[item.title] = ToEdit[item.title];
                }
                if (ToEdit.address?.[item.title] !== undefined ){
                    initialValue[item.title] = ToEdit.address[item.title];
                }
                if (ToEdit.region?.[item.title] !== undefined){
                    initialValue[item.title] = ToEdit.region[item.title];
                }
                if (item.title === "address"){ // due to database exception
                    initialValue[item.title] = ToEdit.address["remnantAddress"];
                }
            })
            setQueryEdit(initialValue)
        }
    }, [page?.form, selectedRows[0]])

    const editHandler = async (e: any) => {
        await edit(page.api, {...queryEdit, id: selectedRows[0]?.id, addressId: selectedRows[0]?.address?.id})
            .then((res) => {
                onSubmit(e, query)
                setModal(false);
                setQueryEdit(null)
            })
            .catch((err: any) => {
                toast.error(`${err?.response?.data?.error?.message}`)
                setModal(false);
            })
    }

    const openModalHandler = () => {
        if (selectedRows.length === 1) {
            setModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }
    }

    return (
        <>
            <Modal title={` ویرایش ${page?.searchFilter} `} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            (page?.form)?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={queryEdit}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       setQuery={setQueryEdit}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
                                                       selectedDayRange={selectedDayRange}
                                                       setSelectedDayRange={setSelectedDayRange}/>
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500" onClick={() => setModal(false)}>لغو</button>
                        <button className="button bg-lime-600" onClick={editHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="button bg-orange-400" onClick={openModalHandler}>ویرایش</button>
        </>
    )
}