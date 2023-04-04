import React, {useContext} from 'react';
import AccordionComponent from "../../common/components/AccordionComponent";
import LabelValue from "../../common/components/LabelValue";
import {jalali} from "../../common/functions/common-funcions";
import {
    OnlineRegDetailContext
} from "../../../pages/users-management/online-registration/[...detail]";

export default function JobInfoComponent(){
    const {data} = useContext<any>(OnlineRegDetailContext)
    const profile = JSON.parse(data?.sejamProfile)?.jobInfo

    return(
        <>
            {profile ? <AccordionComponent title={'اطلاعات شغلی'}>
                <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
                    <LabelValue title={'نام شرکت'} value={profile?.companyName}/>
                    <LabelValue title={'ایمیل کاری'} value={profile?.companyEmail}/>
                    <LabelValue title={'شماره شرکت'}
                                value={profile?.companyCityPrefix + profile?.companyPhone}/>
                    <LabelValue title={'کد پستی شرکت'} value={profile?.companyPostalCode}/>
                    <LabelValue title={'سایت شرکت'} value={profile?.companyWebSite}/>
                    <LabelValue title={'تاریخ استخدام'} value={profile?.employmentDate ? jalali(profile?.employmentDate)?.date:'-'}/>
                    <LabelValue title={'عنوان شغل'} value={profile?.job?.title}/>
                    <LabelValue title={'سمت کاری'} value={profile?.position}/>
                    <LabelValue title={'آدرس شرکت'} value={profile?.companyAddress}/>
                </div>
            </AccordionComponent>:null}
        </>
    )
}