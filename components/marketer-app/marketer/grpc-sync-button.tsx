import React, { useContext } from "react";
import { throwToast } from "../../common/functions/notification";
import { MARKETER_ADMIN } from "../../../api/constants";
import { MarketerContext } from "pages/marketer-app/marketers";
import useQuery from "hooks/useQuery";

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
        <button className={'button bg-primary'} onClick={openHandler}>
            بروزرسانی بازاریاب ها
        </button>
    )
}