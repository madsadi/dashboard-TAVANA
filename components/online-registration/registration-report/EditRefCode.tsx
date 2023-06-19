import InputComponent from "../../common/components/InputComponent";
import Modal from "../../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import {OnlineRegContext} from "../../../pages/online-registration/registration-report";
import {useRouter} from "next/router";
import {throwToast} from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import {ADMIN_GATEWAY} from "../../../api/constants";
import {useSearchFilters} from "../../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../../common/functions/Module-Identifier";
import {OnlineRegDetailContext} from "../../../pages/online-registration/registration-report/[...detail]";

export default function EditRefCode() {
    const {selectedRows,fetchData,searchQuery} = useContext<any>(OnlineRegContext)
    const {fetchData:detailFetch} = useContext<any>(OnlineRegDetailContext)
    const {toolbar} = useSearchFilters(ModuleIdentifier.ONLINE_REGISTRATION,'refCode')
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/api/request/UpdateMarketerRefCode`})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    useEffect(() => {
        if (modal && selectedRows?.length && !userId) {
            let _initialValue: any = {};
            _initialValue['refCode'] = selectedRows[0]['marketerRefCode']

            setQuery(_initialValue)
        }
    }, [modal])

    const openHandler = ()=>{
        if (selectedRows?.length===1 || userId){
            setModal(true)
        }else{
            throwToast({type:'warning',value:'لطفا یک گزینه برای تغییر انتخاب کنید'})
        }

    }
    const submitHandler = async (e:any)=>{
        e.preventDefault()
        await mutate({...query,userId:selectedRows?.[0].userId || userId})
            .then((res)=> {
                throwToast({type:'success',value:`${res?.data?.result?.message}`})
                setModal(false)
                setQuery(null)
                if (router.pathname==='/online-registration/registration-report'){
                    fetchData(searchQuery)
                }else{
                    detailFetch({UserId:userId})
                }
            })
            .catch((err) => throwToast({type:'error',value:err}))
    }
    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value.trim()
        setQuery(_query)
    }
    return (
        <>
            <button className={'button bg-orange-500'} onClick={openHandler}>
                ویرایش کدبازاریابی
            </button>
            <Modal title={'ویرایش کدبازاریابی'} setOpen={setModal}
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