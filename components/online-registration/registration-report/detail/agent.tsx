import LabelValue from "../../../common/components/label-value";
import { jalali } from "../../../common/functions/common-funcions";
import { agentTypeEnums } from "../enums";
import { useContext } from "react";
import {
    OnlineRegDetailContext
} from "../../../../pages/online-registration/registration-report/[...detail]";
import DaisyAccordionComponent from "../../../common/components/daisy-accordion";

export default function AgentComponent() {
    const { data } = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.agent
    const meta = JSON.parse(data?.metaData)?.Agent

    return (
        <>
            {profile ? <DaisyAccordionComponent title={'وکیل / نماینده'}>
                <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                    <LabelValue title={'مشخص کننده نوع نماینده'}
                        value={agentTypeEnums.find((item: any) => item.id === profile?.type)?.title} />
                    <LabelValue title={'مشخص کننده تایید نماینده'}
                        value={profile?.isConfirmed ? 'تایید شده' : 'تایید نشده'} />

                    <LabelValue title={'تاریخ انقضای نمایندگی'} value={profile?.expirationDate ? jalali(profile?.expirationDate)?.date : '-'} />
                    <LabelValue title={'توضیحات'} value={profile?.description} />
                    <LabelValue title={'کد ملی'} value={profile?.uniqueIdentifier} />
                    <LabelValue title={'نام'} value={profile?.firstName} />
                    <LabelValue title={'نام خانوادگی'} value={profile?.lastName} />
                    <LabelValue title={'نام پدر'} value={meta?.FatherName} />
                    <LabelValue title={'شماره شناسنامه'} value={meta?.BirthCertificateNumber} />
                    <LabelValue title={'شماره سریال شناسنامه'} value={meta?.BirthCertificateSerial?.SerialNumber} />
                    <LabelValue title={'حرف سریال شناسنامه'} value={meta?.BirthCertificateSerial?.SerialLetter} />
                    <LabelValue title={'سری سریال شناسنامه'} value={meta?.BirthCertificateSerial?.SerialSeri} />
                    <LabelValue title={'المثنی '} value={meta?.birthCertificateSerial?.IsReplica ? 'بله' : 'خیر'} />
                    <LabelValue title={'آدرس'} value={meta?.Address} />
                    <LabelValue title={'شهر محل سکونت'} value={meta?.BirthCertificateCity} />


                </div>
            </DaisyAccordionComponent> : null}
        </>
    )
}