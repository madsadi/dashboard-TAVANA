import Modal from "../common/Modal";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {edit} from "../../api/holdings";
import usePageStructure from "../../hooks/usePageStructure";
import InputComponent from "../common/InputComponent";
import moment from "jalali-moment";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";

export default function Edit({gridRef}:{gridRef:any}){
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const [targetToEdit, setTargetToEdit] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const {page} = usePageStructure()

    useEffect(()=>{
        if (page?.form && targetToEdit){
            let initialValue:any = {};
            (page?.form)?.map((item:any)=>{
                initialValue[item.title] = targetToEdit[item.title];
            })
            setQuery(initialValue)
        }
    },[page?.form,targetToEdit])

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const addNewHandler = async ()=>{
        const generateGridObject = (query:any)=>{
            let _query:any = {};
            _query['subsidiaryId'] = query.subsidiaryId
            _query['code'] = query.code
            _query['type'] = query.Type
            _query['title'] = query.title
            _query['createDateTime'] = moment().locale('en').format('YYYY-MM-DDTHH:mm:ss')
            return _query
        }
        await edit(page.api, {...query,id:targetToEdit.id,addressId:targetToEdit.address.id})
            .then((res)=> {
                gridRef.current.api.applyTransactionAsync({
                    update:[{id:res?.result?.id,...generateGridObject(query)}],
                })
                setModal(false);
                setQuery(page?.form)
            })
            .catch(()=> {
                setModal(false);
                setQuery(page?.form)
            })
    }

    const openModalHandler = ()=>{
        let selectedProducts = gridRef.current?.api?.getSelectedRows();
        if (selectedProducts.length === 1) {
            setTargetToEdit(selectedProducts[0])
            setModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }
    }

    return(
        <>
            <Modal title={'ویرایش شعبه'} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            (page?.form)?.map((item: any) => {
                                return <InputComponent key={item.title} query={query} title={item?.title}
                                                       name={item?.name} queryUpdate={queryUpdate} valueType={item?.valueType}
                                                       type={item?.type} selectedDayRange={selectedDayRange} setSelectedDayRange={setSelectedDayRange}/>
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-4'}>
                        <button className="p-1 px-3 rounded-full bg-red-500"
                                onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="p-1 px-3 rounded-full bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="p-1 px-2 rounded-full bg-orange-400 mx-2" onClick={openModalHandler}>ویرایش
            </button>
        </>
    )
}