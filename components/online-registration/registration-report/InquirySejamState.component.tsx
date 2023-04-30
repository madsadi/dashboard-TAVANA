import React, {useContext} from "react";
import {OnlineRegContext} from "../../../pages/online-registration/registration-report";
import {onlineRegistrationState} from "./enums";
import {useRouter} from "next/router";
import useQuery from "../../../hooks/useQuery";
import {BOOKBUILDING_BASE_URL} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";

export const InquirySejamStateComponent = () => {
    const {selectedRows} = useContext<any>(OnlineRegContext)
    const {fetchAsyncData} = useQuery({url:`${BOOKBUILDING_BASE_URL}/checkUserSejamState`})
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    const inquiryHandler = () => {
        if (selectedRows?.length || userId) {
            const checkState = async (user: any, index: number) => {
                await fetchAsyncData({userId:user.userId || userId})
                    .then((res) => {
                        if (userId){
                            throwToast({type:'success',value:` وضعیت این کاربر ${onlineRegistrationState.find((item: any) => item.id === res?.data?.result.sejamStatus)?.title}  می باشد `})
                        }else{
                            throwToast({type:'success',value:` وضعیت کاربر با کد ملی ${user.uniqueId} ${onlineRegistrationState.find((item: any) => item.id === res?.data?.result.sejamStatus)?.title}  می باشد `})
                        }
                        if (index + 1 < selectedRows?.length) {
                            checkState(selectedRows[index + 1], index + 1)
                        }
                    })
                    .catch((err) => {
                        if (err?.response?.data?.error?.message==='کاربر سجامی نیست' && !userId){
                            throwToast({type:'customError',value:` کاربر با کد ملی ${user.uniqueId} سجامی نمی باشد `})
                        }else{
                            throwToast({type:'error',value:err})
                        }
                        if (index + 1 < selectedRows?.length) {
                            checkState(selectedRows[index + 1], index + 1)
                        }
                    })
            }
            checkState(selectedRows?.[0] || userId, 0)
        } else {
            throwToast({type:'warning',value:'لطفا یک ردیف را انتخاب کنید'})
        }
    }

    return (
            <button className={'button bg-yellow-500'} onClick={inquiryHandler}>
                وضعیت سجام
            </button>
    )
}