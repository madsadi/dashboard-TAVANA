import { useEffect, useState } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import { CustomerManagementAccountingCodeContext } from "pages/customer-management/accounting-code";
import { AccountingCodeToolbar } from "components/customer-management/accounting-code.tsx/accounting-code-toolbar";

export default function CustomerAccountingCode() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customerAccountingCode/Search`,
  });

  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  const selectionHandler = (code: any) => {
    if (selected?.id === code.id) {
      setSelected(null);
    } else {
      setSelected(code);
    }
  };

  return (
    <CustomerManagementAccountingCodeContext.Provider
      value={{
        fetchData: () => fetchHandler(),
        customer: {
          customerId: data.id,
          customerTitle: data?.title,
        },
        selected,
      }}
    >
      <DaisyAccordionComponent title={"کدهای حسابداری مشتریان"}>
        <AccountingCodeToolbar />
        {info?.result?.pagedData.map((code: any) => {
          return (
            <div className="flex space-x-2 space-x-reverse mb-5" key={code.id}>
              <input
                type="checkbox"
                className="h-5 w-5 my-auto"
                checked={selected?.id === code.id}
                onChange={() => selectionHandler(code)}
              />
              <div
                className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer`}
                onClick={() => selectionHandler(code)}
              >
                <LabelValue
                  title={"نوع کد بورسی"}
                  value={code?.bourseCodeTypeTitle}
                />
                <LabelValue title={"نوع حساب"} value={code?.accountTypeTitle} />
                <LabelValue
                  title={"تاریخ ایجاد"}
                  value={
                    code?.createDateTime
                      ? jalali(code?.createDateTime).date
                      : "-"
                  }
                />
                <LabelValue
                  title={"تاریخ ویرایش "}
                  value={
                    code?.updateDateTime
                      ? jalali(code?.updateDateTime).date
                      : "-"
                  }
                />
              </div>
            </div>
          );
        })}
      </DaisyAccordionComponent>
    </CustomerManagementAccountingCodeContext.Provider>
  );
}
