import { createContext, useEffect } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import AddLegalPerson from "./add-legal-person";
import EditLegalPerson from "./edit-legal-person";
import EditExpirationDate from "./edit-expiration-date";

export const CustomerLegalPersonInfoContext = createContext({});
export default function CustomerLegalPerson() {
  const { data } = useContext<any>(CustomerDetailContext);
  const { data: result, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/legalPerson/Search`,
  });
  const info = result?.result?.pagedData[0];
  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };

  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  return (
    <CustomerLegalPersonInfoContext.Provider
      value={{ fetchHandler, customerId: data.id, info }}
    >
      {info ? (
        <DaisyAccordionComponent title={"اطلاعات مشتری حقوقی"}>
          <CustomerIdentitytoolbar />
          <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
            <LabelValue title={"شناسه ملی"} value={info?.uniqueId} />
            <LabelValue title={"عنوان شرکت"} value={info?.companyName} />
            <LabelValue title={"شماره ثبت"} value={info?.registerNumber} />
            <LabelValue title={"محل ثبت"} value={info?.registerPlace} />
            <LabelValue
              title={"تاریخ ثبت "}
              value={info?.registerDate ? jalali(info?.registerDate).date : "-"}
            />
            <LabelValue
              title={"صادر کنند مجوز "}
              value={info?.evidenceReleaseCompany}
            />
            <LabelValue
              title={"تاریخ صدور مجوز "}
              value={
                info?.evidenceReleaseDate
                  ? jalali(info?.evidenceReleaseDate).date
                  : "-"
              }
            />
            <LabelValue title={"کد اقتصادی"} value={info?.economicCode} />
            <LabelValue
              title={"تاریخ انقضا مجوز "}
              value={
                info?.evidenceExpirationDate
                  ? jalali(info?.evidenceExpirationDate).date
                  : "-"
              }
            />
            <LabelValue
              title={" نوع موسه "}
              value={info?.legalPersonTypeCategoryTitle}
            />
            <LabelValue
              title={" گروه بندی موسسه "}
              value={info?.legalPersonTypeSubCategoryTitle}
            />
            <LabelValue
              title={"منحل شده؟"}
              value={info?.isDissolved ? "بله" : "خیر"}
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
    </CustomerLegalPersonInfoContext.Provider>
  );
}

export const CustomerIdentitytoolbar = ({ isMainPage = false }) => {
  return (
    <div
      className={
        isMainPage
          ? "toolbar p-2 border-x border-border"
          : "flex space-x-2 space-x-reverse z-10 mb-4"
      }
    >
      {isMainPage ? null : <AddLegalPerson />}
      <EditLegalPerson isMainPage={isMainPage} />
      <EditExpirationDate isMainPage={isMainPage} />
    </div>
  );
};
