import React, { useContext, useState } from "react";
import { OnlineRegContext } from "../../../pages/online-registration/registration-report";
import { useRouter } from "next/router";
import { ADMIN_GATEWAY } from "../../../api/constants";
import useMutation from "../../../hooks/useMutation";
import { throwToast } from "../../common/functions/notification";
import { OnlineRegDetailContext } from "../../../pages/online-registration/registration-report/[...detail]";
import { Loader } from "../../common/components/loader/Loader";

export const TBSComponent = () => {
    const { selectedRows } = useContext<any>(OnlineRegContext)
    const router = useRouter()
    let dep: string | undefined = router.query?.detail?.[0]
    const queryData: string[] | undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/PushToTbs` })
    const [loading, setLoading] = useState(false)
    const TbsHandler = () => {
        const Tbs = async (row: any, index: number) => {
            setLoading(true)
            await mutate({ userId: row.userId || userId })
                .then(() => {
                    if (userId) {
                        throwToast({ type: 'success', value: `وضعیت کاربر با موفقیت عوض شد ` })
                    } else {
                        throwToast({ type: 'success', value: ` وضعیت کاربر با کد ملی ${row.uniqueId}  با موفقیت عوض شد ` })
                    }
                    if (index + 1 < selectedRows?.length) {
                        Tbs(selectedRows[index + 1], index + 1)
                    }
                })
                .catch((err) => {
                    if (index + 1 < selectedRows?.length) {
                        Tbs(selectedRows[index + 1], index + 1)
                    }
                    throwToast({ type: 'error', value: err })
                })
                .finally(() => setLoading(false))
        }
        if (selectedRows?.length || userId) {
            Tbs(selectedRows?.[0] || userId, 0)
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک ردیف را انتخاب کنید' })
        }
    }

    return (
        <button className={'button flex items-center disabled:bg-gray-400 bg-green-500 mr-auto'} onClick={TbsHandler} disabled={loading}>
            ثبت در تدبیر
            {loading && <Loader />}
        </button>
    )
}