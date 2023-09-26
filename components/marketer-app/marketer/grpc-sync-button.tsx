import React, { useContext } from "react";
import { throwToast } from "../../common/functions/notification";
import { MARKETER_ADMIN } from "../../../api/constants";
import { MarketerContext } from "pages/marketer-app/marketers";
import useQuery from "hooks/useQuery";
import { Button } from "components/common/components/button/button";

export default function GRPCSyncButton() {
    const { fetchData, searchQuery } = useContext<any>(MarketerContext)
    const { fetchAsyncData } = useQuery({ url: `${MARKETER_ADMIN}/grpc/marketer-sync` })

    const openHandler = async () => {
        await fetchAsyncData()
            .then(() => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }


    return (
        <Button className={'bg-primary'} label="بروزرسانی بازاریاب ها" onClick={openHandler} />
    )
}