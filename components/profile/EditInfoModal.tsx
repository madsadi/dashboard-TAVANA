import InputComponent from "../common/components/InputComponent";
import Modal from "../common/layout/Modal";
import React, {useEffect, useState} from "react";
import {updateAccount} from "../../api/users-management.api";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const userInputs = [
    {title: 'userName', name: 'نام کاربری', type: 'input'},
    {title: 'firstName', name: 'نام', type: 'input'},
    {title: 'lastName', name: 'نام خانوادگی', type: 'input'},
    {title: 'email', name: 'ایمیل', type: 'input'},
    {title: 'nationalId', name: 'کدملی', type: 'input',valueType:'number'},
]

export const EditInfoModal=({open,setOpen}:{open:boolean,setOpen:any})=>{
    const {userInfo:data} = useSelector((state:any)=>state.userManagementConfig)
    const [query,setQuery] = useState({})
    const editHandler = async (e:any)=>{
        e.preventDefault()
        await updateAccount(query)
            .then(()=>{
                toast.success('با موفقیت ویرایش شد')
                setOpen(false)
            })
            .catch((err)=>toast.error(`${err?.response?.data?.error?.message}`))
    }

    useEffect(()=>{
        if (data){
            let _query:any = {}
            Object.keys(data)?.map((item:any)=>{
                if (item!=='birthdate' || item!=='twoFactorEnabled' || item!=='phoneNumber'){
                    _query[item] = data[item]
                }
            })
            setQuery(_query)
        }
    },[data])

    return(
        <Modal title={'ویرایش حساب کاربری'} setOpen={setOpen}
               open={open}>
            <div className="field mt-4">
                <form onSubmit={editHandler}>
                    <div className={'grid grid-cols-2 gap-4'}>
                        {
                            userInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       setQuery={setQuery}
                                />
                            })
                        }
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                                type={'button'}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setOpen(false)
                                }}>لغو
                        </button>
                        <button type={"submit"} className="button bg-lime-600">تایید</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}