import React, {useContext, useEffect, useState} from "react";
import Modal from "../common/layout/Modal";
import usePageStructure from "../../hooks/usePageStructure";
import InputComponent from "../common/components/InputComponent";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";
import ExtraDateAndTimeInput from "./ExtraDateAndTimeInput";
import {throwToast} from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import {ADMIN_GATEWAY} from "../../api/constants";
import {useSearchFilters} from "../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../common/functions/Module-Identifier";

export default function AddNew() {

    const [modal, setModal] = useState(false)
    const { page } = usePageStructure()
    const { fetchData,query:searchQuery } = useContext<any>(CustomerManagement)
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/request/${page?.api}/Add`})
    const {toolbar} = useSearchFilters(ModuleIdentifier[`CUSTOMER_MANAGEMENT_${page?.api}`],'modal')
    const [query, setQuery] = useState<any>({})
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    let initialValue: any = {};

    useEffect(() => {
        if (toolbar) {
            toolbar?.map((item: any) => {
                initialValue[item.title] = item.initialValue;
            })
            setQuery(initialValue)
        }
    }, [toolbar])

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
            await mutate(_body)
                .then((res) => {
                    fetchData(searchQuery)
                    setQuery(initialValue)
                    setModal(false);
                })
                .catch((err) => {
                    throwToast({type:'error',value:err})
                })
        } else {
            throwToast({type:'warning',value:'تمام ورودی ها اجباری می باشد.'})
        }
    }

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
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
                            toolbar?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       onChange={onChange}
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