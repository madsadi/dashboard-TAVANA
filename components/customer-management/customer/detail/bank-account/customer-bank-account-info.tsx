import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/[...userId]";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import AddNewAccount from "./add-new-account";
import EditBankAccount from "./edit-bank-account";
import ConfirmBankAccount from "./confirm-bank-account";
import DefaultBankAccount from "./default-bank-account";
import RemoveBankAccount from "./remove-bank-acccount";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export const CustomerBankAccountContext = createContext({});
export default function CustomerBankAccountInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/bankAccount/Search`,
  });

  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  const selectionHandler = (bank: any) => {
    if (selected?.accountNumber === bank.accountNumber) {
      setSelected(null);
    } else {
      setSelected(bank);
    }
  };
  return (
    <CustomerBankAccountContext.Provider
      value={{
        fetchHandler,
        customerId: data.id,
        selected,
      }}
    >
      {info ? (
        <DaisyAccordionComponent title={"حساب های بانکی"}>
          <CustomerBankAccounttoolbar />
          {info?.result?.pagedData.map((bank: any) => {
            return (
              <div
                className="flex space-x-2 space-x-reverse mb-5 "
                key={bank.accountNumber}
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 my-auto"
                  checked={selected?.accountNumber === bank.accountNumber}
                  onChange={() => selectionHandler(bank)}
                />
                <div
                  className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer ${
                    bank.isDefault
                      ? "border-emerald-500 pt-10"
                      : "border-border"
                  }`}
                  onClick={() => selectionHandler(bank)}
                >
                  {bank.isDefault ? (
                    <div
                      className={
                        "absolute flex items-center top-2 right-3 text-emerald-500"
                      }
                    >
                      <CheckBadgeIcon className={" h-7 w-7  "} />
                      <p>حساب پیش فرض</p>
                    </div>
                  ) : null}
                  <LabelValue
                    title={"عنوان مشتری"}
                    value={bank?.customerTitle}
                  />
                  <LabelValue
                    title={"کد ملی مشتری"}
                    value={bank?.customerUniqueId}
                  />
                  <LabelValue
                    title={"	تلفن تماس مشتری"}
                    value={bank?.customerPhoneNumber}
                  />
                  <LabelValue title={"شبای حساب"} value={bank?.sheba} />
                  <LabelValue
                    title={"شماره حساب"}
                    value={bank?.accountNumber}
                  />
                  <LabelValue title={"نوع حساب"} value={bank?.typeTitle} />
                  <LabelValue title={"نام بانک "} value={bank?.bankTitle} />
                  <LabelValue title={" کد شعبه "} value={bank?.branchCode} />
                  <LabelValue title={"نام شعبه "} value={bank?.branchTitle} />
                  <LabelValue title={"شهر شعبه"} value={bank?.cityTitle} />
                  <LabelValue
                    title={"حساب پیش فرض؟ "}
                    value={bank?.isDefault ? "بله" : "خیر"}
                  />
                  <LabelValue
                    title={"سجامی؟ "}
                    value={bank?.isFromSejam ? "بله" : "خیر"}
                  />
                  <LabelValue
                    title={"تائید شده؟ "}
                    value={bank?.isConfirmed ? "بله" : "خیر"}
                  />
                  <LabelValue title={"توضیحات "} value={bank?.description} />

                  <LabelValue
                    title={"تاریخ ایجاد "}
                    value={
                      bank?.createDateTime
                        ? jalali(bank?.createDateTime).date
                        : "-"
                    }
                  />
                  <LabelValue
                    title={"تاریخ ویرایش "}
                    value={
                      bank?.updateDateTime
                        ? jalali(bank?.updateDateTime).date
                        : "-"
                    }
                  />
                </div>
              </div>
            );
          })}
        </DaisyAccordionComponent>
      ) : null}
    </CustomerBankAccountContext.Provider>
  );
}

export const CustomerBankAccounttoolbar = ({ isMainPage = false }) => {
  return (
    <div
      className={
        isMainPage
          ? "toolbar p-2 border-x border-border"
          : "flex space-x-2 space-x-reverse z-10 mb-4"
      }
    >
      {isMainPage ? null : <AddNewAccount />}
      <EditBankAccount />
      <ConfirmBankAccount />
      <DefaultBankAccount />
      <RemoveBankAccount />
    </div>
  );
};
