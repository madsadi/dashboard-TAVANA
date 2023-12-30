import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import { CustomerManagementLegalPersonStakeholderContext } from "pages/customer-management/legal-person-stakeholder";
import { LegalPersonstakeholderToolbar } from "components/customer-management/legal-person-stakeholder/legal-person-stakeholder-toolbar";

export default function CustomerLegalPersonStakeholder() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/legalPersonStakeholder/Search`,
  });

  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  const selectionHandler = (customer: any) => {
    if (selected?.id === customer.id) {
      setSelected(null);
    } else {
      setSelected(customer);
    }
  };

  return (
    <CustomerManagementLegalPersonStakeholderContext.Provider
      value={{
        fetchData: () => fetchHandler(),
        customer: {
          customerId: data?.id,
          customerTitle: data?.title,
        },
        selected,
      }}
    >
      <DaisyAccordionComponent title={"ذینفعان مشتریان حقوقی"}>
        <LegalPersonstakeholderToolbar />
        {info?.result?.pagedData.map((customer: any) => {
          return (
            <div
              className="flex space-x-2 space-x-reverse mb-5"
              key={customer.id}
            >
              <input
                type="checkbox"
                className="h-5 w-5 my-auto"
                checked={selected?.id === customer.id}
                onChange={() => selectionHandler(customer)}
              />
              <div
                className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer`}
                onClick={() => selectionHandler(customer)}
              >
                <LabelValue
                  title={"عنوان مشتری"}
                  value={customer?.customerTitle}
                />
                <LabelValue title={"کد ملی"} value={customer?.uniqueId} />
                <LabelValue title={"نام"} value={customer?.firstName} />
                <LabelValue title={"نام خانوادگی"} value={customer?.lastName} />
                <LabelValue title={"نوع سمت"} value={customer?.typeTitle} />
                <LabelValue
                  title={"سمت شغلی"}
                  value={customer?.positionTypeTitle}
                />
                <LabelValue
                  title={"حق امضاء دارد؟"}
                  value={customer?.hasSignatureRight ? "بله" : "خیر"}
                />
                <LabelValue
                  title={"ابتدای دوره فعالیت"}
                  value={
                    customer?.positionStartDate
                      ? jalali(customer?.positionStartDate).date
                      : "-"
                  }
                />
                <LabelValue
                  title={"انتهای دوره فعالیت"}
                  value={
                    customer?.positionEndDate
                      ? jalali(customer?.positionEndDate).date
                      : "-"
                  }
                />
              </div>
            </div>
          );
        })}
      </DaisyAccordionComponent>
    </CustomerManagementLegalPersonStakeholderContext.Provider>
  );
}
