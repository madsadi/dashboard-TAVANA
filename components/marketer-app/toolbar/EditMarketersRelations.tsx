import InputComponent from "../../common/components/InputComponent";
import Modal from "../../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import {throwToast} from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import {ADMIN_GATEWAY} from "../../../api/constants";
import {useSearchFilters} from "../../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../../common/functions/Module-Identifier";
import {RelationsContext} from "../../../pages/marketer-app/relations";

export default function EditMarketersRelations() {
    const {selectedRows,fetchData,searchQuery} = useContext<any>(RelationsContext)
    const {toolbar} = useSearchFilters(ModuleIdentifier.MARKETER_APP_RELATIONS,'edit')
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/marketer/modify-marketers-relations`,method:"PUT"})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    useEffect(() => {
        if (modal && selectedRows?.length) {
            let _initialValue: any = {};
            _initialValue['LeaderMarketerID '] = selectedRows[0][`LeaderMarketerID `]
            _initialValue['FollowerMarketerID '] = selectedRows[0][`FollowerMarketerID `]
            _initialValue['CommissionCoefficient '] = selectedRows[0][`CommissionCoefficient `]
            _initialValue['StartDate '] = selectedRows[0][`StartDate `]
            _initialValue['EndDate '] = selectedRows[0][`EndDate `]

            setQuery(_initialValue)
        }
    }, [modal])

    const openHandler = ()=>{
        if (selectedRows?.length===1){
            setModal(true)
        }else{
            throwToast({type:'warning',value:'لطفا یک گزینه برای تغییر انتخاب کنید'})
        }

    }
    const submitHandler = async (e:any)=>{
        e.preventDefault()
        await mutate(query)
            .then((res)=> {
                throwToast({type:'success',value:`${res?.data?.result?.message}`})
                setModal(false)
                setQuery(null)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({type:'error',value:err}))
    }
    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <button className={'button bg-orange-500'} onClick={openHandler}>
                ویرایش رابطه بین دو بازاریاب
            </button>
            <Modal title={'ویرایش رابطه بین دو بازاریاب'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form onSubmit={submitHandler}>
                        <div className={'grid grid-cols-2 gap-4'} >
                            {
                                toolbar.map((item: any) => {
                                    return <InputComponent key={item.title}
                                                           query={query}
                                                           item={item}
                                                           onChange={onChange}
                                    />
                                })
                            }
                        </div>
                        <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                            <button className="button bg-red-500"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setModal(false)
                                    }}>لغو
                            </button>
                            <button type={"submit"} className="button bg-lime-600" >تایید</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}