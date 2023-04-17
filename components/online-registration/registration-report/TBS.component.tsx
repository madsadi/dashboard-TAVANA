import React, {useContext} from "react";
import {pushToTbs} from "../../../api/users-management.api";
import {OnlineRegContext} from "../../../pages/online-registration/registration-report";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export const TBSComponent=()=>{
    const {selectedRows} = useContext<any>(OnlineRegContext)
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    const TbsHandler = ()=>{
        const Tbs =async (row:any,index:number)=>{
            await pushToTbs({userId:row.userId || userId})
                .then(()=> {
                    if (userId){
                        toast.success(`وضعیت کاربر با موفقیت عوض شد `)
                    }else{
                        toast.success(` وضعیت کاربر با کد ملی ${row.uniqueId}  با موفقیت عوض شد `)
                    }
                    if (index+1<selectedRows?.length){
                        Tbs(selectedRows[index+1],index+1)
                    }
                })
                .catch((err) => {
                    if (index+1<selectedRows?.length){
                        Tbs(selectedRows[index+1],index+1)
                    }
                    toast.error(`${err?.response?.data?.error?.message}`)
                })
        }
        if (selectedRows?.length || userId){
                Tbs(selectedRows?.[0] || userId,0)
        }else{
            toast.warning('لطفا یک ردیف را انتخاب کنید')
        }
    }

    return(
        <button className={'button bg-green-500'} onClick={TbsHandler}>
            ثبت در تدبیر
        </button>
    )
}