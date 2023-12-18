import React, { useContext } from "react";
import LabelValue from "../../../common/components/label-value";
import { jalali } from "../../../../utils/common-funcions";
import { OnlineRegDetailContext } from "../../../../pages/online-registration/registration-report/detail";
import DaisyAccordionComponent from "../../../common/components/daisy-accordion";

export default function JobInfoComponent() {
  const { data } = useContext<any>(OnlineRegDetailContext);
  const profile = JSON.parse(data?.sejamProfile)?.jobInfo;

  return (
    <>
      {profile ? (
        <DaisyAccordionComponent title={"اطلاعات شغلی"}>
          <div className="grid md:grid-cols-4 grid-cols-2  gap-3">
            <LabelValue title={"نام شرکت"} value={profile?.companyName} />
            <LabelValue title={"ایمیل کاری"} value={profile?.companyEmail} />
            <LabelValue
              title={"شماره شرکت"}
              value={
                (profile?.companyCityPrefix
                  ? profile?.companyCityPrefix + "-"
                  : "") + (profile?.companyPhone ? profile?.companyPhone : "")
              }
            />
            <LabelValue
              title={"کد پستی شرکت"}
              value={profile?.companyPostalCode}
            />
            <LabelValue title={"سایت شرکت"} value={profile?.companyWebSite} />
            <LabelValue
              title={"تاریخ استخدام"}
              value={
                profile?.employmentDate
                  ? jalali(profile?.employmentDate)?.date
                  : "-"
              }
            />
            <LabelValue title={"عنوان شغل"} value={profile?.job?.name} />
            <LabelValue title={"سمت کاری"} value={profile?.position} />
            <LabelValue title={"آدرس شرکت"} value={profile?.companyAddress} />
          </div>
        </DaisyAccordionComponent>
      ) : null}
    </>
  );
}
