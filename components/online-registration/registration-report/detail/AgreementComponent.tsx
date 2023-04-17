import React, {useContext} from "react";
import LabelValue from "../../../common/components/LabelValue";
import { jalali} from "../../../common/functions/common-funcions";
import {
    OnlineRegDetailContext
} from "../../../../pages/online-registration/registration-report/[...detail]";
import DaisyAccordionComponent from "../../../common/components/DaisyAccordion.component";

export default function AgreementComponent() {
    const {data} = useContext<any>(OnlineRegDetailContext)
    const agreement = JSON.parse(data?.metaData)?.Agreement

    return (
        <>
            {
                data?.metaData ? <DaisyAccordionComponent title={'قرار داد ها'}>
                    {agreement?.map((item: any) => {
                        return (
                            <div
                                className="grid md:grid-cols-4 grid-cols-2 gap-3 border border-dashed border-gray-200 p-5 mb-3"
                                key={item?.AccountNumber}>
                                <LabelValue title={'نام قرارداد'} value={item?.Name || 'ثبت نشده'}/>
                                <LabelValue title={'اجباری'} value={item?.IsRequired ? 'بله':'خیر'}/>
                                <LabelValue title={'تاریخ تایید'} value={item?.ApprovalDateTime ? jalali(item?.ApprovalDateTime)?.date:''}/>
                            </div>
                        )
                    })}
                </DaisyAccordionComponent> : null
            }
        </>)
}