import InputComponent from "../../common/components/InputComponent";
import Modal from "../../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import {OnlineRegContext} from "../../../pages/users-management/online-registration";
import {toast} from "react-toastify";
import {editRegState} from "../../../api/users-management.api";

export default function EditRegStateComponent() {
    const {selectedRows,onSubmit} = useContext<any>(OnlineRegContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const forums = [
        {title:'registrationState',name:'وضعیت ثبت نام',type:'selectInput'},
        {title:'changeReasonDescription',name:'توضیحات',type:'input'},
    ]

    useEffect(() => {
        if (modal && selectedRows.length) {
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
        if (selectedRows.length){
            setModal(true)
        }else{
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }

    }
    const submitHandler = async ()=>{
        await editRegState({...query,userId:selectedRows[0].userId})
            .then(()=> {
                setModal(false)
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
            <Modal title={'ویرایش اطلاعات کاربر'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
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
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}>لغو
                        </button>
                        <button type={"submit"} className="button bg-lime-600" onClick={submitHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}