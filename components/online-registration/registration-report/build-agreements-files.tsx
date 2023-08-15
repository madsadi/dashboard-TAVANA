import React, { useContext, useState } from "react";
import { OnlineRegContext } from "../../../pages/online-registration/registration-report";
import { useRouter } from "next/router";
import { throwToast } from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import { OnlineRegDetailContext } from "../../../pages/online-registration/registration-report/[...detail]";
import { Button } from "../../common/components/button/button";

export default function BuildAgreementsFiles() {
    const { selectedRows } = useContext<any>(OnlineRegContext)
    const { fetchData: detailFetch } = useContext<any>(OnlineRegDetailContext)
    const { service, modules, restriction } = useSearchFilters(ModuleIdentifier.ONLINE_REGISTRATION)
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/UploadUserAgreementDocs` })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    let dep: string | undefined = router.query?.detail?.[0]
    const queryData: string[] | undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    const submitHandler = async () => {
        setLoading(true)
        await mutate({ userId: selectedRows?.[0].userId || userId })
            .then((res) => {
                throwToast({ type: 'success', value: `${res?.data?.result?.message}` })
                if (router.pathname === '/online-registration/registration-report') {

                } else {
                    detailFetch({ UserId: userId })
                }
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }
    const handler = () => {
        if (selectedRows?.length === 1 || userId) {
            submitHandler()
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای تغییر انتخاب کنید' })
        }

    }


    return (
        <Button label={'ایجاد فایل های قرارداد'}
            className="bg-fuchsia-600"
            onClick={handler}
            loading={loading}
            allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Create'].join('.')] : []}
        />
    )
}