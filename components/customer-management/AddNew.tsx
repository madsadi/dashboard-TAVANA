import Modal from "../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import usePageStructure from "../../hooks/usePageStructure";
import { addNew } from "../../api/holdings";
import InputComponent from "../common/components/InputComponent";
import { toast } from "react-toastify";
import moment from "jalali-moment";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";

export default function AddNew() {
    const [modal, setModal] = useState(false)
    const { page } = usePageStructure()
    const { onSubmit } = useContext<any>(CustomerManagement)
    const [query, setQuery] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    let initialValue: any = {};

    useEffect(()=>{
        setQuery(null)
    },[modal])

    useEffect(() => {
        if (page?.form) {
            (page?.form)?.map((item: any) => {
                initialValue[item.title] = null;
            })
            setQuery(initialValue)
        }
    }, [page?.form])

    const queryUpdate = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    const addNewHandler = async (e:any) => {
        if (Object.values(query)?.every((item: any) => item)) {
            await addNew(page.api, query)
                .then((res) => {
                    onSubmit(e,query)
                    setModal(false);
                    setQuery(page?.form)
                })
                .catch((err) => {
                    toast.error(`${err?.response?.data?.error?.message}`)
                    setModal(false);
                    setQuery(page?.form)
                })
            setQuery(initialValue)
        } else {
            toast.warning('تمام ورودی ها اجباری می باشد.')
        }
    }

    return (
        <>
            <Modal title={` ایجاد${page?.searchFilter} جدید `} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            (page?.form)?.map((item: any) => {
                                return <InputComponent key={item.title} query={query} title={item?.title}
                                    name={item?.name} queryUpdate={queryUpdate} valueType={item?.valueType}
                                    type={item?.type} selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange} />
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-4'}>
                        <button className="button bg-red-500"
                            onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="button bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>
                جدید
            </button>
        </>
    )
}