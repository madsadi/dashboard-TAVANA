import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import { BourseCodeToolbar } from "components/customer-management/bourse-code/bourse-code-toolbar";

export const CustomerManagementBourseCodeContext = createContext({});
export default function CustomerBourseCode() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customerBourseCode/Search`,
  });

  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  const selectionHandler = (bourse: any) => {
    if (selected?.id === bourse.id) {
      setSelected(null);
    } else {
      setSelected(bourse);
    }
  };

  return (
    <CustomerManagementBourseCodeContext.Provider
      value={{
        fetchData: () => fetchHandler(),
        customer: {
          customerId: data?.id,
          relatedCustomerTitle: data?.title,
        },
        selected,
      }}
    >
      <DaisyAccordionComponent title={"کد های بورسی"}>
        <BourseCodeToolbar />
        {info?.result?.pagedData.map((bourse: any) => {
          return (
            <div
              className="flex space-x-2 space-x-reverse mb-5"
              key={bourse.id}
            >
              <input
                type="checkbox"
                className="h-5 w-5 my-auto"
                checked={selected?.id === bourse.id}
                onChange={() => selectionHandler(bourse)}
              />
              <div
                className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer`}
                onClick={() => selectionHandler(bourse)}
              >
                <LabelValue title={"نوع"} value={bourse?.typeTitle} />
                <LabelValue title={"کد بورسی"} value={bourse?.bourseCode} />
                <LabelValue title={"کد معاملاتی"} value={bourse?.tradingCode} />
                <LabelValue
                  title={"تاریخ ایجاد"}
                  value={
                    bourse?.createDateTime
                      ? jalali(bourse?.createDateTime).date
                      : "-"
                  }
                />
                <LabelValue
                  title={"تاریخ ویرایش "}
                  value={
                    bourse?.updateDateTime
                      ? jalali(bourse?.updateDateTime).date
                      : "-"
                  }
                />
              </div>
            </div>
          );
        })}
      </DaisyAccordionComponent>
    </CustomerManagementBourseCodeContext.Provider>
  );
}
