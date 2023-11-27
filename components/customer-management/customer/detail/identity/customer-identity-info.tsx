import { useEffect } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/[...userId]";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import AddPrivateInfo from "./add-private-info";
import EditPrivateInfo from "./edit-private-info";
import EditDeseacedDate from "./edit-deceased-date";

export default function CustomerIdentityInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/privatePerson/Search`,
  });

  useEffect(() => {
    if (data) fetchData({ CustomerId: data.id });
  }, [data]);

  return (
    <>
      {info ? (
        <DaisyAccordionComponent
          title={"اطلاعات مشتری حقیقی"}
          extra={
            <CustomerIdentitytoolbar
              refetch={() => fetchData({ CustomerId: data.id })}
              privateInfo={info?.result?.pagedData[0]}
            />
          }
        >
          <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
            <LabelValue
              title={"نام"}
              value={info?.result?.pagedData[0]?.firstName}
            />
            <LabelValue
              title={"نام خانوادگی"}
              value={info?.result?.pagedData[0]?.lastName}
            />
            <LabelValue
              title={"کد ملی"}
              value={info?.result?.pagedData[0]?.uniqueId}
            />
            <LabelValue
              title={"نام پدر"}
              value={info?.result?.pagedData[0]?.fatherName}
            />
            <LabelValue
              title={"جنسیت"}
              value={info?.result?.pagedData[0]?.genderTitle}
            />
            <LabelValue
              title={"شماره شناسنامه"}
              value={
                info?.result?.pagedData[0]?.seriShChar +
                info?.result?.pagedData[0]?.seriSh +
                info?.result?.pagedData[0]?.shSerial +
                info?.result?.pagedData[0]?.shNumber
              }
            />
            <LabelValue
              title={"تاریخ تولد "}
              value={
                info?.result?.pagedData[0]?.birthDate
                  ? jalali(info?.result?.pagedData[0]?.birthDate).date
                  : "-"
              }
            />
            <LabelValue
              title={" صادره از "}
              value={info?.result?.pagedData[0]?.issuePlace}
            />
            <LabelValue
              title={"فوت شده؟ "}
              value={info?.result?.pagedData[0]?.isDeceased ? "بله" : "خیر"}
            />
            <LabelValue
              title={"تاریخ وفات "}
              value={
                info?.result?.pagedData[0]?.deceasedDate
                  ? jalali(info?.result?.pagedData[0]?.deceasedDate).date
                  : "-"
              }
            />
            <LabelValue
              title={"تاریخ ایجاد "}
              value={
                info?.result?.pagedData[0]?.createDateTime
                  ? jalali(info?.result?.pagedData[0]?.createDateTime).date
                  : "-"
              }
            />
            <LabelValue
              title={"تاریخ ویرایش "}
              value={
                info?.result?.pagedData[0]?.updateDateTime
                  ? jalali(info?.result?.pagedData[0]?.updateDateTime).date
                  : "-"
              }
            />
          </div>
        </DaisyAccordionComponent>
      ) : null}
    </>
  );
}

const CustomerIdentitytoolbar = (props: {
  refetch: () => void;
  privateInfo: any;
}) => {
  const { refetch, privateInfo } = props;
  return (
    <div className="toolbar z-10">
      <AddPrivateInfo refetch={refetch} privateInfo={privateInfo} />
      <EditPrivateInfo refetch={refetch} privateInfo={privateInfo} />
      <EditDeseacedDate refetch={refetch} privateInfo={privateInfo} />
    </div>
  );
};
