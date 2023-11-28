import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/[...userId]";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import AddAddress from "./add-address";
import EditAddress from "./edit-address";
import RemoveAddress from "./remove-address";

export const CustomerAddressInfoContext = createContext({});
export default function CustomerAddressInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/address/Search`,
  });

  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  const selectionHandler = (agent: any) => {
    if (selected?.id === agent.id) {
      setSelected(null);
    } else {
      setSelected(agent);
    }
  };
  return (
    <CustomerAddressInfoContext.Provider
      value={{
        fetchHandler,
        customerId: data.id,
        selected,
      }}
    >
      {info ? (
        <DaisyAccordionComponent title={"اطلاعات تماس"}>
          <CustomerAddresstoolbar />
          {info?.result?.pagedData.map((address: any) => {
            return (
              <div
                className="flex space-x-2 space-x-reverse mb-5 "
                key={address.id}
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 my-auto"
                  checked={selected?.id === address.id}
                  onChange={() => selectionHandler(address)}
                />
                <div
                  className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer`}
                  onClick={() => selectionHandler(address)}
                >
                  <LabelValue
                    title={"عنوان مشتری"}
                    value={address?.customerTitle}
                  />
                  <LabelValue
                    title={"کد ملی مشتری"}
                    value={address?.customerUniqueId}
                  />
                  <LabelValue title={"کشور"} value={address?.countryName} />
                  <LabelValue title={"استان"} value={address?.provinceName} />
                  <LabelValue title={"شهر"} value={address?.cityName} />
                  <LabelValue title={"ناحیه"} value={address?.sectionName} />
                  <LabelValue title={"کدپستی"} value={address?.postalCode} />
                  <LabelValue title={"آدرس"} value={address?.remnantAddress} />
                  <LabelValue title={"کوچه"} value={address?.alley} />
                  <LabelValue title={"پلاک"} value={address?.plaque} />
                  <LabelValue
                    title={"پیش شماره کشور"}
                    value={address?.countryPrefix}
                  />
                  <LabelValue
                    title={"پیش شماره شهر"}
                    value={address?.cityPrefix}
                  />
                  <LabelValue title={"شماره تلفن"} value={address?.tel} />
                  <LabelValue
                    title={"تلفن اضطراری-پیش شماره شهر"}
                    value={address?.emergencyTelCityPrefix}
                  />
                  <LabelValue
                    title={"شماره تلفن اضطراری"}
                    value={address?.emergencyTel}
                  />
                  <LabelValue title={"شماره موبایل"} value={address?.mobile} />
                  <LabelValue title={"ایمیل"} value={address?.email} />
                  <LabelValue
                    title={"اطلاعات سجام است؟"}
                    value={address?.isFromSejam ? "بله" : "خیر"}
                  />
                  <LabelValue
                    title={"تاریخ ایجاد"}
                    value={
                      address?.createDateTime
                        ? jalali(address?.createDateTime).date
                        : "-"
                    }
                  />
                  <LabelValue
                    title={"آخرین ویرایش"}
                    value={
                      address?.updateDateTime
                        ? jalali(address?.updateDateTime).date
                        : "-"
                    }
                  />
                </div>
              </div>
            );
          })}
        </DaisyAccordionComponent>
      ) : null}
    </CustomerAddressInfoContext.Provider>
  );
}

const CustomerAddresstoolbar = () => {
  return (
    <div className="flex space-x-2 space-x-reverse z-10 mb-4">
      <AddAddress />
      <EditAddress />
      <RemoveAddress />
    </div>
  );
};
