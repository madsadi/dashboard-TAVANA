import LabelValue from "../../common/components/LabelValue";
import {jalali} from "../../common/functions/common-funcions";
import AccordionComponent from "../../common/components/AccordionComponent";
import {agentTypeEnums} from "./enums";
import {useContext} from "react";
import {
    OnlineRegDetailContext
} from "../../../pages/users-management/online-registration/[...detail]";

export default function AgentComponent(){
    const {data} = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.agent

    return(
        <>
            {profile ? <AccordionComponent title={'وکیل / نماینده'}>
                <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                    <LabelValue title={'مشخص کننده نوع نماینده'}
                                value={agentTypeEnums.find((item: any) => item.id === profile?.type)?.title}/>
                    <LabelValue title={'تاریخ انقضای نمایندگی'} value={profile?.expirationDate ? jalali(profile?.expirationDate).date:'-'}/>
                    <LabelValue title={'توضیحات'} value={profile?.description}/>
                    <LabelValue title={'کد ملی'} value={profile?.uniqueIdentifier}/>
                    <LabelValue title={'نام'} value={profile?.firstName}/>
                    <LabelValue title={'نام خانوادگی'} value={profile?.lastName}/>
                    <LabelValue title={'مشخص کننده تایید نماینده'}
                                value={profile?.isConfirmed ? 'تایید شده' : 'تایید نشده'}/>
                </div>
            </AccordionComponent>:null}
        </>
    )
}