import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import { CustomerAgreementContext } from "pages/customer-management/customer-agreement";
import { CustomerAgreementToolbar } from "components/customer-management/customer-agreement/customer-agreement-toolbar";

export default function CustomerCustomerAgreement() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customerAgreement/Search`,
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
    <CustomerAgreementContext.Provider
      value={{
        fetchData: () => fetchHandler(),
        customer: {
          customerId: data?.id,
          relatedCustomerTitle: data?.title,
        },
        selected,
      }}
    >
      <DaisyAccordionComponent title={"قرارداد های مشتری"}>
        <CustomerAgreementToolbar />
        {info?.result?.pagedData.map((agreement: any) => {
          return (
            <div
              className="flex space-x-2 space-x-reverse mb-5"
              key={agreement.id}
            >
              <input
                type="checkbox"
                className="h-5 w-5 my-auto"
                checked={selected?.id === agreement.id}
                onChange={() => selectionHandler(agreement)}
              />
              <div
                className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer`}
                onClick={() => selectionHandler(agreement)}
              >
                <LabelValue
                  title={"عنوان قرارداد"}
                  value={agreement?.agreementName}
                />
                <LabelValue
                  title={"عنوان شرکت"}
                  value={agreement?.subsidiaryTitle}
                />
                <LabelValue
                  title={"ملیت"}
                  value={agreement?.personNationalityTitle}
                />
                <LabelValue
                  title={"نوع مشتری"}
                  value={
                    agreement?.personTypeTitle +
                    " " +
                    agreement?.applicationTitle
                  }
                />
                <LabelValue
                  title={"نوع کد بورسی"}
                  value={agreement?.agreementCodeTypeTitle}
                />
                <LabelValue
                  title={"اجباری؟"}
                  value={agreement?.isRequired ? "بله" : "خیر"}
                />
                <LabelValue
                  title={"حذف شده؟"}
                  value={agreement?.isDeleted ? "بله" : "خیر"}
                />
                <LabelValue title={"وضعیت"} value={agreement?.stateTitle} />
                <LabelValue
                  title={"تاریخ ایجاد"}
                  value={
                    agreement?.createDateTime
                      ? jalali(agreement?.createDateTime).date
                      : "-"
                  }
                />
                <LabelValue
                  title={"تاریخ ویرایش "}
                  value={
                    agreement?.updateDateTime
                      ? jalali(agreement?.updateDateTime).date
                      : "-"
                  }
                />
              </div>
            </div>
          );
        })}
      </DaisyAccordionComponent>
    </CustomerAgreementContext.Provider>
  );
}
