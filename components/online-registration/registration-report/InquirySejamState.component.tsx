import React, {useContext} from "react";
import {OnlineRegContext} from "../../../pages/online-registration/registration-report";
import {toast} from "react-toastify";
import {checkUserSejamState} from "../../../api/users-management.api";
import {onlineRegistrationState} from "./enums";
import {useRouter} from "next/router";

export const InquirySejamStateComponent = () => {
    const {selectedRows} = useContext<any>(OnlineRegContext)
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    const inquiryHandler = () => {
        if (selectedRows?.length || userId) {
            const checkState = async (user: any, index: number) => {
                await checkUserSejamState(user.userId || userId)
                    .then((res) => {
                        if (userId){
                            toast.success(` وضعیت این کاربر ${onlineRegistrationState.find((item: any) => item.id === res?.result.sejamStatus)?.title}  می باشد `)
                        }else{
                            toast.success(` وضعیت کاربر با کد ملی ${user.uniqueId} ${onlineRegistrationState.find((item: any) => item.id === res?.result.sejamStatus)?.title}  می باشد `)
                        }
                        if (index + 1 < selectedRows?.length) {
                            checkState(selectedRows[index + 1], index + 1)
                        }
                    })
                    .catch((err) => {
                        if (err?.response?.data?.error?.message==='کاربر سجامی نیست' && !userId){
                            toast.error(` کاربر با کد ملی ${user.uniqueId} سجامی نمی باشد `)
                        }else{
                            toast.error(`${err?.response?.data?.error?.message}`)
                        }
                        if (index + 1 < selectedRows?.length) {
                            checkState(selectedRows[index + 1], index + 1)
                        }
                    })
            }
            checkState(selectedRows?.[0] || userId, 0)
        } else {
            toast.warning('لطفا یک ردیف را انتخاب کنید')
        }
    }

    return (
            <button className={'button bg-yellow-500'} onClick={inquiryHandler}>
                وضعیت سجام
            </button>
    )
}