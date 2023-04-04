import AccordionComponent from "../../common/components/AccordionComponent";
import Image from "next/image";
import {findBank} from "../../common/functions/common-funcions";
import LabelValue from "../../common/components/LabelValue";
import {accountTypeEnums} from "./enums";
import {useContext} from "react";
import {
    OnlineRegDetailContext
} from "../../../pages/users-management/online-registration/[...detail]";

export default function BankComponent() {
    const {data} = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.metaData)?.Account

    return (
        <>
            {
                data?.metaData ? <AccordionComponent title={'اطلاعات بانکی'}>
                    {profile.map((item: any) => {
                        return (
                            <div className="grid md:grid-cols-4 grid-cols-2 gap-3 border border-dashed border-gray-200 p-5 mb-3"
                                 key={item?.AccountNumber}>
                                <div>
                                    <Image src={`/bankIcons/${findBank(item?.Bank?.Name).logo}.svg`} height={24}
                                           width={24} alt={item?.branchName}/>
                                </div>
                                <LabelValue title={'شماره حساب'} value={item?.AccountNumber || 'ثبت نشده'}/>
                                <LabelValue title={'نام بانک'} value={item?.Bank?.Name || 'ثبت نشده'}/>
                                <LabelValue title={'نام شعبه'} value={item?.BranchName || 'ثبت نشده'}/>
                                <LabelValue title={'شهر شعبه'} value={item?.branchCity?.Name || 'ثبت نشده'}/>
                                <LabelValue title={'شماره شعبه'} value={item?.Sheba || 'ثبت نشده'}/>
                                <LabelValue title={'نوع حساب'}
                                            value={accountTypeEnums.find((i: any) => i.enTitle === item?.Type)?.faTitle}/>
                            </div>
                        )
                    })}
                </AccordionComponent>:null
            }
        </>
    )
}