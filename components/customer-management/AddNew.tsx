import Modal from "../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import usePageStructure from "../../hooks/usePageStructure";
import { addNew } from "../../api/holdings";
import InputComponent from "../common/components/InputComponent";
import { toast } from "react-toastify";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";
import ExtraDateAndTimeInput from "./ExtraDateAndTimeInput";

export default function AddNew() {
    const [modal, setModal] = useState(false)
    const { page } = usePageStructure()
    const { onSubmit,query:searchQuery } = useContext<any>(CustomerManagement)
    const [query, setQuery] = useState<any>({})
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    let initialValue: any = {};

    useEffect(() => {
        if (page?.form) {
            (page?.form)?.map((item: any) => {
                initialValue[item.title] = item.initialValue;
            })
            setQuery(initialValue)
        }
    }, [page?.form])

    const addNewHandler = async (e:any,query:any) => {
        e.preventDefault()
        let _body :any={}
        Object.keys(query).map((item:any)=>{
            if (typeof query[`${item}`] === 'object' && query[`${item}`]){
                let value = '';
                Object.keys(query[`${item}`]).sort().map((child:any)=>{
                    if (query[`${item}`][`${child}`]!==undefined && query[`${item}`][`${child}`]!==null && query[`${item}`][`${child}`]!==''){
                        value = value + query[`${item}`][`${child}`]
                    }
                })
                _body[`${item}`]= value
            }else{
                if (query[`${item}`]!==undefined && query[`${item}`]!==null && query[`${item}`]!==''){
                    _body[`${item}`]=query[`${item}`]
                }
            }
        })
        if (Object.values(query)?.every((item: any) => item!==undefined && item!==null && item!=='' )) {
            await addNew(page.api, _body)
                .then((res) => {
                    onSubmit(e,searchQuery)
                    setQuery(initialValue)
                    setModal(false);
                })
                .catch((err) => {
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        } else {
            toast.warning('تمام ورودی ها اجباری می باشد.')
        }
    }


    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>
                جدید
            </button>
            <Modal title={` ایجاد${page?.searchFilter} جدید `} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            (page?.form)?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       setQuery={setQuery}
                                                       selectedDayRange={selectedDayRange}
                                                       setSelectedDayRange={setSelectedDayRange}
                                                       />
                            })
                        }
                    </form>
                    {page?.api === 'customerAgreement' && <ExtraDateAndTimeInput setQuery={setQuery} query={query}/>}
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                                onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="button bg-lime-600" type={'submit'} onClick={(e)=>addNewHandler(e,query)}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}