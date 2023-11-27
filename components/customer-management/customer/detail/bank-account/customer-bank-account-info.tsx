import { useEffect, useState } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/[...userId]";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import AddNewAccount from "./add-new-account";
import EditBankAccount from "./edit-bank-account";

export default function CustomerBankAccountInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/bankAccount/Search`,
  });

  useEffect(() => {
    if (data) fetchData({ CustomerId: data.id });
  }, [data]);

  return (
    <>
      {info ? (
        <DaisyAccordionComponent
          title={"حساب های بانکی"}
          extra={
            <CustomerBankAccounttoolbar
              refetch={() => fetchData({ CustomerId: data.id })}
              privateInfo={info?.result?.pagedData[0]}
              selectedItem={selected}
            />
          }
        >
          {info?.result?.pagedData.map((bank: any) => {
            return (
              <div
                className="flex space-x-2 space-x-reverse"
                key={bank.accountNumber}
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 my-auto"
                  checked={selected?.accountNumber === bank.accountNumber}
                  onChange={() => {
                    if (selected?.accountNumber === bank.accountNumber) {
                      setSelected(null);
                    } else {
                      setSelected(bank);
                    }
                  }}
                />
                <div className="grid md:grid-cols-5 grid-cols-2 gap-3 border border-border rounded-md p-5 mb-3 grow">
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
    </>
  );
}

const CustomerBankAccounttoolbar = (props: {
  refetch: () => void;
  privateInfo: any;
  selectedItem: any;
}) => {
  const { refetch, privateInfo, selectedItem } = props;
  return (
    <div className="toolbar z-10">
      <AddNewAccount refetch={refetch} privateInfo={privateInfo} />
      <EditBankAccount
        refetch={refetch}
        privateInfo={privateInfo}
        selectedItem={selectedItem}
      />
    </div>
  );
};
