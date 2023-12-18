import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import RemoveFinancial from "./remove-financial";
import EditFinancialBroker from "./edit-financial";
import AddFinancialBroker from "./add-financial";

export const CustomerFinancialBrokerInfoContext = createContext({});
export default function CustomerFinancialBrokerInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customerFinancialBroker/Search`,
  });

  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  const selectionHandler = (item: any) => {
    if (selected?.id === item.id) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };
  return (
    <CustomerFinancialBrokerInfoContext.Provider
      value={{
        fetchHandler,
        customerId: data.id,
        selected,
      }}
    >
      {info ? (
        <DaisyAccordionComponent title={"سابقه کارگزاری"}>
          <CustomerFinancialBrokertoolbar />
          {info?.result?.pagedData.map((job: any) => {
            return (
              <div
                className="flex space-x-2 space-x-reverse mb-5 "
                key={job.id}
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 my-auto"
                  checked={selected?.id === job.id}
                  onChange={() => selectionHandler(job)}
                />
                <div
                  className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer`}
                  onClick={() => selectionHandler(job)}
                >
                  <LabelValue
                    title={"عنوان مشتری"}
                    value={job?.customerTitle}
                  />
                  <LabelValue
                    title={"کد ملی مشتری"}
                    value={job?.customerUniqueId}
                  />
                  <LabelValue
                    title={"عنوان کارگزاری"}
                    value={job?.financialBrokerTitle}
                  />
                  <LabelValue
                    title={"کد کارگزاری"}
                    value={job?.financialBrokerCode}
                  />
                  <LabelValue title={"آدرس"} value={job?.companyAddress} />
                  <LabelValue
                    title={"تاریخ ایجاد"}
                    value={
                      job?.createDateTime
                        ? jalali(job?.createDateTime).date
                        : "-"
                    }
                  />
                  <LabelValue
                    title={"تاریخ ویرایش"}
                    value={
                      job?.updateDateTime
                        ? jalali(job?.updateDateTime).date
                        : "-"
                    }
                  />
                </div>
              </div>
            );
          })}
        </DaisyAccordionComponent>
      ) : null}
    </CustomerFinancialBrokerInfoContext.Provider>
  );
}

const CustomerFinancialBrokertoolbar = () => {
  return (
    <div className="flex space-x-2 space-x-reverse z-10 mb-4">
      <AddFinancialBroker />
      <EditFinancialBroker />
      <RemoveFinancial />
    </div>
  );
};
