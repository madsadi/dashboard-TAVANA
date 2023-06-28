import React, {useContext, useState} from "react";
import {OnlineRegContext} from "../../../pages/online-registration/registration-report";
import {useRouter} from "next/router";
import {ADMIN_GATEWAY} from "../../../api/constants";
import useMutation from "../../../hooks/useMutation";
import {throwToast} from "../../common/functions/notification";
import {OnlineRegDetailContext} from "../../../pages/online-registration/registration-report/[...detail]";

export const TBSComponent=()=>{
    const {selectedRows} = useContext<any>(OnlineRegContext)
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/api/request/PushToTbs`})
    const [loading,setLoading]=useState(false)
    const TbsHandler = ()=>{
        const Tbs =async (row:any,index:number)=>{
            setLoading(true)
            await mutate({userId:row.userId || userId})
                .then(()=> {
                    if (userId){
                        throwToast({type:'success',value:`وضعیت کاربر با موفقیت عوض شد `})
                    }else{
                        throwToast({type:'success',value:` وضعیت کاربر با کد ملی ${row.uniqueId}  با موفقیت عوض شد `})
                    }
                    if (index+1<selectedRows?.length){
                        Tbs(selectedRows[index+1],index+1)
                    }
                })
                .catch((err) => {
                    if (index+1<selectedRows?.length){
                        Tbs(selectedRows[index+1],index+1)
                    }
                    throwToast({type:'error',value:err})
                })
                .finally(()=>setLoading(false))
        }
        if (selectedRows?.length || userId){
                Tbs(selectedRows?.[0] || userId,0)
        }else{
            throwToast({type:'warning',value:'لطفا یک ردیف را انتخاب کنید'})
        }
    }

    return(
        <button className={'button flex items-center bg-green-500 mr-auto'} onClick={TbsHandler}>
            ثبت در تدبیر
            {loading && <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
        </button>
    )
}