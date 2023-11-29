import { createContext, useEffect } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/[...userId]";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import AddPrivatePortfolio from "./add-private-portfolio";
import EditPrivatePortfolio from "./edit-private-portfolio";

export const CustomerPrivatePortfolioInfoContext = createContext({});
export default function CustomerPrivatePortfolio() {
  const { data } = useContext<any>(CustomerDetailContext);
  const { data: result, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/privatePortfolio/Search`,
  });
  const info = result?.result?.pagedData[0];
  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };

  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  return (
    <CustomerPrivatePortfolioInfoContext.Provider
      value={{ fetchHandler, customerId: data.id, info }}
    >
      {info ? (
        <DaisyAccordionComponent title={"اطلاعات شخص از نوع سبد اختصاصی"}>
          <CustomerIdentitytoolbar />
          <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
            <LabelValue
              title={"عنوان سبد اختصاصی"}
              value={info?.privatePortfolioTitle}
            />
            <LabelValue title={"کدبورسی"} value={info?.bourseCode} />
            <LabelValue
              title={"عنوان مالک سبد"}
              value={info?.relatedCustomerTitle}
            />
            <LabelValue
              title={"کد ملی مالک سبد"}
              value={info?.relatedCustomerUniqueId}
            />
            <LabelValue
              title={"عنوان مدیر سبد"}
              value={info?.assetManagerTitle}
            />

            <LabelValue
              title={"کد ملی مدیر سبد"}
              value={info?.assetManagerUniqueId}
            />

            <LabelValue
              title={" نوع مدیریت سبد "}
              value={info?.managementTypeTitle}
            />
            <LabelValue
              title={"	تاریخ شروع مدیریت سبد "}
              value={
                info?.managementStartDate
                  ? jalali(info?.managementStartDate).date
                  : "-"
              }
            />
            <LabelValue
              title={"	تاریخ پایان مدیریت سبد "}
              value={
                info?.managementEndDate
                  ? jalali(info?.managementEndDate).date
                  : "-"
              }
            />
            <LabelValue
              title={"منقضی شده؟"}
              value={info?.isExpired ? "بله" : "خیر"}
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
    </CustomerPrivatePortfolioInfoContext.Provider>
  );
}

const CustomerIdentitytoolbar = () => {
  return (
    <div className="flex space-x-2 space-x-reverse z-10 mb-4">
      <AddPrivatePortfolio />
      <EditPrivatePortfolio />
    </div>
  );
};
