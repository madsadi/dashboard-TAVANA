import React, { useContext, useState } from "react";
import { throwToast } from "../../common/functions/notification";
import { MARKETER_ADMIN } from "../../../api/constants";
import { MarketerContext } from "pages/marketer-app/marketers";
import useQuery from "hooks/useQuery";
import { Button } from "components/common/components/button/button";

export default function GRPCSyncButton() {
    const { fetchData, searchQuery } = useContext<any>(MarketerContext)
    const { fetchAsyncData } = useQuery({ url: `${MARKETER_ADMIN}/grpc/marketer-sync` })
    const [loading, setLoading] = useState(false)
    const openHandler = async () => {
        setLoading(true)
        await fetchAsyncData()
            .then(() => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }


    return (
        <Button className={'bg-primary'} loading={loading} label="بروزرسانی بازاریاب ها" onClick={openHandler} />
    )
}