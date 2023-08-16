import React, { useContext, useState } from "react";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../common/functions/notification";
import { Button } from "../common/components/button/button";
import usePageStructure from "../../hooks/usePageStructure";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";
import useMutation from "../../hooks/useMutation";
import {CustomerManagement} from "../../pages/customer-management/[[...page]]";

export const CreateRefCode = () => {
    const { page } = usePageStructure()
    const {selectedRows}=useContext<any>(CustomerManagement)
    const { restriction, modules, service } = useSearchFilters(ModuleIdentifier[`CUSTOMER_MANAGEMENT_${page?.api}`])
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/marketer/CreateRefCode` })
    const [loading, setLoading] = useState(false)

    const submitHandler = () => {
        setLoading(true)
        mutate({id:selectedRows[0].id})
            .then((res) => {
                throwToast({ type: 'success', value: `${res?.data.result.message}` })
            })
            .catch((err) => {
                throwToast({ type: 'error', value: err })
            })
            .finally(() => setLoading(false))
    }

    const openModalHandler = () => {
        if (selectedRows.length === 1) {
            submitHandler()
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای تغییر انتخاب کنید' })
        }
    }

    return (
        <Button label={'بروزرسانی لینک'}
                className="bg-sky-400"
                onClick={openModalHandler}
                loading={loading}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[1], 'Create'].join('.')] : []}
        />
    )
}