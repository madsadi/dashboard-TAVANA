import LabelValue from "../../../common/components/label-value";
import {
  LegalPersonShareholderViewModelEnums,
  LegalPersonStakeholderTypeEnums,
} from "../enums";
import { useContext } from "react";
import { OnlineRegDetailContext } from "../../../../pages/online-registration/registration-report/detail";
import DaisyAccordionComponent from "../../../common/components/daisy-accordion";

export default function LegalPersonStakeholdersComponent() {
  const { data } = useContext<any>(OnlineRegDetailContext);
  const profile = JSON.parse(data?.sejamProfile)?.legalPersonStakeholders;

  return (
    <>
      {profile?.length ? (
        <DaisyAccordionComponent title={"اطلاعات ذی نفعان"}>
          {profile?.map((item: any) => {
            return (
              <div
                className="grid md:grid-cols-4 grid-cols-2  gap-3"
                key={item?.uniqueIdentifier}
              >
                <LabelValue title={"نام"} value={item?.firstName} />
                <LabelValue title={"نام خانوادگی"} value={item?.lastName} />
                <LabelValue title={"کد ملی"} value={item?.uniqueIdentifier} />
                <LabelValue
                  title={"نوع ذینفع شخصیت حقوقی"}
                  value={
                    LegalPersonStakeholderTypeEnums.find(
                      (i: any) => i.id === item?.type
                    )?.title
                  }
                />
                <LabelValue
                  title={"تاریخ شروع دوره تصدی"}
                  value={item?.startAt}
                />
                <LabelValue
                  title={"تاریخ پایان دوره تصدی"}
                  value={item?.endAt}
                />
                <LabelValue
                  title={"سمت"}
                  value={
                    LegalPersonShareholderViewModelEnums.find(
                      (item: any) => item.id === item?.positionType
                    )?.title
                  }
                />
                <LabelValue
                  title={" فیلد مشخص کننده صاحب امضا بودن فرد"}
                  value={item.isOwnerSignature ? "بله" : "خیر"}
                />
              </div>
            );
          })}
        </DaisyAccordionComponent>
      ) : null}
    </>
  );
}
