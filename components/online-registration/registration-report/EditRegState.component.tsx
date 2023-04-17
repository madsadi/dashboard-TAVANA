import InputComponent from "../../common/components/InputComponent";
import Modal from "../../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import {OnlineRegContext} from "../../../pages/online-registration/registration-report";
import {toast} from "react-toastify";
import {editRegState} from "../../../api/users-management.api";
import {useRouter} from "next/router";

export default function EditRegStateComponent() {
    const {selectedRows} = useContext<any>(OnlineRegContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    const forums = [
        {title:'registrationState',name:'وضعیت ثبت نام',type:'selectInput'},
        {title:'changeReasonDescription',name:'توضیحات',type:'input'},
    ]

    useEffect(() => {
        if (modal && selectedRows?.length && !userId) {
            let _initialValue: any = {};
            Object.keys(selectedRows[0]).map((item: string) => {
                if (item === 'registrationState' || item === 'changeReasonDescription'){
                    _initialValue[item] = selectedRows[0][`${item}`]
                }
            })
            setQuery(_initialValue)
        }
    }, [modal])

    const openHandler = ()=>{
        if (selectedRows?.length===1 || userId){
            setModal(true)
        }else{
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }

    }
    const submitHandler = async (e:any)=>{
        e.preventDefault()
        await editRegState({...query,userId:selectedRows?.[0].userId || userId})
            .then((res)=> {
                setModal(false)
                setQuery(null)
                toast.success(`${res?.result?.message}`)
            })
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    return (
        <>
            <button className={'button bg-orange-500'} onClick={openHandler}>
                تغییر وضعیت ثبت نام
            </button>
            <Modal title={'ویرایش اطلاعات کاربر'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form onSubmit={submitHandler}>
                        <div className={'grid grid-cols-2 gap-4'} >
                            {
                                forums.map((item: any) => {
                                    return <InputComponent key={item.title}
                                                           query={query}
                                                           title={item?.title}
                                                           name={item?.name}
                                                           setQuery={setQuery}
                                                           valueType={item?.valueType}
                                                           type={item?.type}
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