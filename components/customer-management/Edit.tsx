import React, {useContext, useEffect, useState} from "react";
import Modal from "../common/layout/Modal";
import usePageStructure from "../../hooks/usePageStructure";
import InputComponent from "../common/components/InputComponent";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";
import {throwToast} from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import {MARKET_RULES_MANAGEMENT} from "../../api/constants";

export default function Edit() {
    const {page} = usePageStructure()
    const {mutate} = useMutation({url:`${MARKET_RULES_MANAGEMENT}/request/${page.api}/Update`,method:"PUT"})

    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const {fetchData, selectedRows,setSelectedRows,query:searchQuery} = useContext<any>(CustomerManagement)

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
            setQuery(initialValue)
        }
    }, [page?.form, selectedRows[0]])

    const editHandler = async (e: any) => {
        await mutate( {...query, id: selectedRows[0]?.id, addressId: selectedRows[0]?.address?.id})
            .then((res) => {
                fetchData(searchQuery)
                setModal(false);
                setQuery(null)
            })
            .catch((err: any) => throwToast({type:'error',value:err}))
    }

    const openModalHandler = () => {
        if (selectedRows.length === 1) {
            setModal(true)
        } else {
            throwToast({type:'warning',value:'لطفا یک گزینه برای تغییر انتخاب کنید'})
        }
    }
    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <Modal title={` ویرایش ${page?.searchFilter} `} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            (page?.form)?.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       onChange={onChange}
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