import LabelValue from "../../../common/components/label-value";
import { jalali } from "../../../../utils/common-funcions";
import {
  legalPersonTypeCategoryEnums,
  legalPersonTypeSubCategory,
} from "../enums";
import { useContext } from "react";
import { OnlineRegDetailContext } from "../../../../pages/online-registration/registration-report/detail";
import DaisyAccordionComponent from "../../../common/components/daisy-accordion";

export default function IdentityComponent() {
  const { data } = useContext<any>(OnlineRegDetailContext);
  const profile = JSON.parse(data?.sejamProfile);

  return (
    <>
      {profile ? (
        profile?.legalPerson ? (
          <DaisyAccordionComponent title={"اطلاعات هویتی حقوقی"}>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
              <LabelValue
                title={"نام شخص حقوقی"}
                value={profile?.legalPerson?.companyName}
              />
              <LabelValue
                title={"شماره ثبت شخص حقوقی"}
                value={profile?.legalPerson?.registerNumber}
              />
              <LabelValue
                title={" تاریخ ثبت"}
                value={
                  profile?.legalPerson?.registerDate
                    ? jalali(profile?.legalPerson?.registerDate)?.date
                    : null
                }
              />
              <LabelValue
                title={"محل ثبت"}
                value={profile?.legalPerson?.registerPlace}
              />
              <LabelValue
                title={"کد اقتصادی"}
                value={profile?.legalPerson?.economicCode}
              />
              <LabelValue
                title={"سازمان صادرکننده مجوز"}
                value={profile?.legalPerson?.evidenceReleaseCompany}
              />
              <LabelValue
                title={"تاریخ صدور مجوز"}
                value={profile?.legalPerson?.evidenceReleaseDate}
              />
              <LabelValue
                title={"تاریخ انقضاء مجوز "}
                value={profile?.legalPerson?.evidenceExpirationDate}
              />
              <LabelValue
                title={"نوع شرکت"}
                value={
                  legalPersonTypeCategoryEnums.find(
                    (item: any) =>
                      item.id === profile?.legalPerson?.legalPersonTypeCategory
                  )?.title
                }
              />
              <LabelValue
                title={"زیر مجموعه نوع شرکت"}
                value={
                  legalPersonTypeSubCategory.find(
                    (item: any) =>
                      item.id ===
                      profile?.legalPerson?.legalPersonTypeSubCategory
                  )?.title
                }
              />
            </div>
          </DaisyAccordionComponent>
        ) : (
          <DaisyAccordionComponent title={"اطلاعات هویتی"}>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
              <LabelValue
                title={"نام"}
                value={profile?.privatePerson?.firstName}
              />
              <LabelValue
                title={"نام خانوادگی"}
                value={profile?.privatePerson?.lastName}
              />
              <LabelValue
                title={"تاریخ تولد"}
                value={
                  profile?.privatePerson?.birthDate
                    ? jalali(profile?.privatePerson?.birthDate)?.date
                    : null
                }
              />
              <LabelValue
                title={"نام پدر"}
                value={profile?.privatePerson?.fatherName}
              />
              <LabelValue
                title={"محل تولد"}
                value={profile?.privatePerson?.placeOfBirth}
              />
              <LabelValue
                title={"صادره از"}
                value={profile?.privatePerson?.placeOfIssue}
              />
              <LabelValue
                title={"سریال شناسنامه"}
                value={
                  profile?.privatePerson?.serial
                    ? `${
                        profile?.privatePerson?.serial +
                        `/` +
                        profile?.privatePerson?.seriShChar +
                        profile?.privatePerson?.seriSh
                      }`
                    : ""
                }
              />
              <LabelValue
                title={"شماره شناسنامه"}
                value={profile?.privatePerson?.shNumber}
              />
              <LabelValue title={"کد ملی"} value={profile?.uniqueIdentifier} />
            </div>
          </DaisyAccordionComponent>
        )
      ) : null}
    </>
  );
}
