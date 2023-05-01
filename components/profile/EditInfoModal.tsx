import InputComponent from "../common/components/InputComponent";
import Modal from "../common/layout/Modal";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useMutation from "../../hooks/useMutation";
import {IDP} from "../../api/constants";
import {throwToast} from "../common/functions/notification";

const userInputs = [
    {title: 'userName', name: 'نام کاربری', type: 'input'},
    {title: 'firstName', name: 'نام', type: 'input'},
    {title: 'lastName', name: 'نام خانوادگی', type: 'input'},
    {title: 'email', name: 'ایمیل', type: 'input'},
    {title: 'nationalId', name: 'کدملی', type: 'input',valueType:'number'},
]

export const EditInfoModal=({open,setOpen}:{open:boolean,setOpen:any})=>{
    const {userInfo:data} = useSelector((state:any)=>state.userManagementConfig)
    const {mutate} = useMutation({url:`${IDP}/account`,method:'PUT'})
    const [query,setQuery] = useState({})
    const editHandler = async (e:any)=>{
        e.preventDefault()
        await mutate(query,{},{'withCredentials': true})
            .then(()=>{
                throwToast({type:'success',value:'با موفقیت ویرایش شد'})
                setOpen(false)
            })
            .catch((err)=>throwToast({type:'error',value:err}))
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
    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
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
                                                       onChange={onChange}
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