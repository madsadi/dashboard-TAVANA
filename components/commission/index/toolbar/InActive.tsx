import React, {useContext} from "react";
import {CommissionContext} from "../../../../pages/commission-management/commission";
import {COMMISSION_BASE_URL} from "../../../../api/constants";
import useMutation from "../../../../hooks/useMutation";
import {throwToast} from "../../../common/functions/notification";

export default function InActive() {

    const {fetchData, query: searchQuery, selectedRows} = useContext<any>(CommissionContext)
    const {mutate} = useMutation({url: `${COMMISSION_BASE_URL}/api/CommissionDetail/InActive`, method: "PUT"})

    const editHandler = async () => {
        await mutate({id: selectedRows[0].id,EndDate:selectedRows[0]?.EndDate})
            .then(() => {
                throwToast({type: 'success', value: 'با موفقیت انجام شد'})
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({type: 'error', value: err}))
    }

    const openHandler = () => {
        if (selectedRows.length) {
            editHandler()
        } else {
            throwToast({type: 'warning', value: 'لطفا یک گزینه برای غیر فعال کردن انتخاب کنید'})
        }
    }

    return (
        <button className="button bg-orange-500" onClick={openHandler}>غیر فعال کردن ضریب کارمزد</button>
    )
}