import { useEffect, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/[...userId]";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import EditFinancialInfo from "./edit-financial-info";
import AddFinancialInfo from "./add-financial-info";

export const CustomerFinancialInfoContext = createContext({});
export default function CustomerFinancialInfoInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/financialInfo/Search`,
  });

  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  return (
    <CustomerFinancialInfoContext.Provider
      value={{
        fetchHandler,
        customerId: data.id,
        selected: info?.result?.pagedData[0],
      }}
    >
      {info ? (
        <DaisyAccordionComponent title={"اطلاعات مالی"}>
          <CustomerFinancialInfotoolbar />
          <div className="flex space-x-2 space-x-reverse mb-5 ">
            <div
              className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer `}
            >
              <LabelValue
                title={"عنوان مشتری"}
                value={info?.result?.pagedData[0]?.customerTitle}
              />
              <LabelValue
                title={"کد ملی مشتری"}
                value={info?.result?.pagedData[0]?.customerUniqueId}
              />
              <LabelValue
                title={"مقدار دارایی"}
                value={info?.result?.pagedData[0]?.assetValue}
              />
              <LabelValue
                title={"میانگین درآمد"}
                value={info?.result?.pagedData[0]?.averageIncome}
              />
              <LabelValue
                title={"مبلغ معاملات بورس های اوراق"}
                value={info?.result?.pagedData[0]?.sExchangeTransaction}
              />
              <LabelValue
                title={"مبلغ معاملات بورس های کالایی"}
                value={info?.result?.pagedData[0]?.cExchangeTransaction}
              />
              <LabelValue
                title={"مبلغ معاملات بورس های خارجی "}
                value={info?.result?.pagedData[0]?.foreignExchangeTransaction}
              />
              <LabelValue
                title={" سطح معاملات "}
                value={info?.result?.pagedData[0]?.transactionLevelTitle}
              />
              <LabelValue
                title={"سطح دانش بورسی "}
                value={info?.result?.pagedData[0]?.tradingKnowledgeLevelTitle}
              />
              <LabelValue
                title={"هدف سرمایه گذاری"}
                value={info?.result?.pagedData[0]?.companyPurpose}
              />
              <LabelValue
                title={"مرجع رتبه بندی "}
                value={info?.result?.pagedData[0]?.referenceRateCompany}
              />
              <LabelValue
                title={"تاریخ رتبه بندی "}
                value={
                  info?.result?.pagedData[0]?.rateDate
                    ? jalali(info?.result?.pagedData[0]?.rateDate).date
                    : "-"
                }
              />
              <LabelValue
                title={"رتبه"}
                value={info?.result?.pagedData[0]?.rate}
              />
              <LabelValue
                title={"اطلاعات سجامی است؟"}
                value={info?.result?.pagedData[0]?.isFromSejam ? "بله" : "خیر"}
              />
              <LabelValue
                title={"	تاریخ ایجاد"}
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
          </div>
        </DaisyAccordionComponent>
      ) : null}
    </CustomerFinancialInfoContext.Provider>
  );
}

const CustomerFinancialInfotoolbar = () => {
  return (
    <div className="flex space-x-2 space-x-reverse z-10 mb-4">
      <AddFinancialInfo />
      <EditFinancialInfo />
    </div>
  );
};
