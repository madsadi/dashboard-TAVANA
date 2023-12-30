import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import { CustomerManagementLegalPersonShareholderContext } from "pages/customer-management/legal-person-shareholder";
import { LegalPersonShareholderToolbar } from "components/customer-management/legal-person-shareholder/legal-person-shareholder-toolbar";

export default function CustomerLegalPersonShareholder() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/legalPersonShareholder/Search`,
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
    <CustomerManagementLegalPersonShareholderContext.Provider
      value={{
        fetchData: () => fetchHandler(),
        customer: {
          customerId: data?.id,
          customerTitle: data?.title,
        },
        selected,
      }}
    >
      <DaisyAccordionComponent title={"سهام داران مشتریان حقوقی"}>
        <LegalPersonShareholderToolbar />
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
                <LabelValue title={"کد پستی"} value={customer?.postalCode} />
                <LabelValue title={"آدرس"} value={customer?.address} />
                <LabelValue
                  title={"سمت شغلی"}
                  value={customer?.positionTypeTitle}
                />
                <LabelValue
                  title={"درصد حق رای"}
                  value={customer?.percentageVotingRight}
                />
                <LabelValue
                  title={"تاریخ ایجاد"}
                  value={
                    customer?.createDateTime
                      ? jalali(customer?.createDateTime).date
                      : "-"
                  }
                />
                <LabelValue
                  title={"تاریخ ویرایش "}
                  value={
                    customer?.updateDateTime
                      ? jalali(customer?.updateDateTime).date
                      : "-"
                  }
                />
              </div>
            </div>
          );
        })}
      </DaisyAccordionComponent>
    </CustomerManagementLegalPersonShareholderContext.Provider>
  );
}
