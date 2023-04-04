import React, {useContext} from "react";
import LabelValue from "../../common/components/LabelValue";
import { jalali} from "../../common/functions/common-funcions";
import AccordionComponent from "../../common/components/AccordionComponent";
import {
    OnlineRegDetailContext
} from "../../../pages/users-management/online-registration/[...detail]";

export default function AgreementComponent() {
    const {data} = useContext<any>(OnlineRegDetailContext)
    const agreement = JSON.parse(data?.metaData)?.Agreement

    return (
        <>
            {
                data?.metaData ? <AccordionComponent title={'قرار داد ها'}>
                    {agreement?.map((item: any) => {
                        return (
                            <div
                                className="grid md:grid-cols-4 grid-cols-2 gap-3 border border-dashed border-gray-200 p-5 mb-3"
                                key={item?.AccountNumber}>
                                <LabelValue title={'نام قرارداد'} value={item?.Name || 'ثبت نشده'}/>
                                <LabelValue title={'اجباری'} value={item?.IsRequired ? 'بله':'خیر'}/>
                                <LabelValue title={'تاریخ ثبت'} value={jalali(item?.ApprovalDateTime)?.date}/>
                            </div>
                        )
                    })}
                </AccordionComponent> : null
            }
        </>)
}