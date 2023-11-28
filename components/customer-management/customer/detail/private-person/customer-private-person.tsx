import { createContext, useEffect } from "react";
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

export const CustomerPrivatePersonInfoContext = createContext({});
export default function CustomerIdentityInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const { data: result, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/privatePerson/Search`,
  });

  const info = result?.result?.pagedData[0];
  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  return (
    <CustomerPrivatePersonInfoContext.Provider
      value={{ fetchHandler, customerId: data.id, info }}
    >
      {info ? (
        <DaisyAccordionComponent title={"اطلاعات مشتری حقیقی"}>
          <CustomerIdentitytoolbar />
          <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
            <LabelValue title={"نام"} value={info?.firstName} />
            <LabelValue title={"نام خانوادگی"} value={info?.lastName} />
            <LabelValue title={"کد ملی"} value={info?.uniqueId} />
            <LabelValue title={"نام پدر"} value={info?.fatherName} />
            <LabelValue title={"جنسیت"} value={info?.genderTitle} />
            <LabelValue
              title={"شماره شناسنامه"}
              value={
                info?.seriShChar +
                info?.seriSh +
                info?.shSerial +
                info?.shNumber
              }
            />
            <LabelValue
              title={"تاریخ تولد "}
              value={info?.birthDate ? jalali(info?.birthDate).date : "-"}
            />
            <LabelValue title={" صادره از "} value={info?.issuePlace} />
            <LabelValue
              title={"فوت شده؟ "}
              value={info?.isDeceased ? "بله" : "خیر"}
            />
            <LabelValue
              title={"تاریخ وفات "}
              value={info?.deceasedDate ? jalali(info?.deceasedDate).date : "-"}
            />
            <LabelValue
              title={"تاریخ ایجاد "}
              value={
                info?.createDateTime ? jalali(info?.createDateTime).date : "-"
              }
            />
            <LabelValue
              title={"تاریخ ویرایش "}
              value={
                info?.updateDateTime ? jalali(info?.updateDateTime).date : "-"
              }
            />
          </div>
        </DaisyAccordionComponent>
      ) : null}
    </CustomerPrivatePersonInfoContext.Provider>
  );
}

const CustomerIdentitytoolbar = () => {
  return (
    <div className="flex space-x-2 space-x-reverse z-10 mb-4">
      <AddPrivateInfo />
      <EditPrivateInfo />
      <EditDeseacedDate />
    </div>
  );
};
