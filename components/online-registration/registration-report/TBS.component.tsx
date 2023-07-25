import React, { useContext, useState } from "react";
import { OnlineRegContext } from "../../../pages/online-registration/registration-report";
import { useRouter } from "next/router";
import { ADMIN_GATEWAY } from "../../../api/constants";
import useMutation from "../../../hooks/useMutation";
import { throwToast } from "../../common/functions/notification";
import { Button } from "../../common/components/button/button";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";

export const TBSComponent = () => {
    const { selectedRows } = useContext<any>(OnlineRegContext)
    const { service, modules, restriction } = useSearchFilters(ModuleIdentifier.ONLINE_REGISTRATION)

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
        <Button label={'ثبت در تدبیر'}
            className="bg-green-500 mr-auto"
            onClick={TbsHandler}
            loading={loading}
            allowed={restriction ? [[service?.[0], modules?.[0]?.[1], 'Create'].join('.')] : []}
        />
    )
}