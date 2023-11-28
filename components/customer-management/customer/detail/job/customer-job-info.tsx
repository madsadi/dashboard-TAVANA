import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/[...userId]";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import AddJob from "./add-job";
import EditJob from "./edit-job";
import RemoveJob from "./remove-job";

export const CustomerJobInfoContext = createContext({});
export default function CustomerJobInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/jobInfo/Search`,
  });

  const fetchHandler = () => {
    fetchData({ CustomerId: data.id });
  };
  useEffect(() => {
    if (data) fetchHandler();
  }, [data]);

  const selectionHandler = (job: any) => {
    if (selected?.jobId === job.jobId) {
      setSelected(null);
    } else {
      setSelected(job);
    }
  };
  return (
    <CustomerJobInfoContext.Provider
      value={{
        fetchHandler,
        customerId: data.id,
        selected,
      }}
    >
      {info ? (
        <DaisyAccordionComponent title={"اطلاعات شغلی"}>
          <CustomerJobInfoToolbar />
          {info?.result?.pagedData.map((job: any) => {
            return (
              <div
                className="flex space-x-2 space-x-reverse mb-5 "
                key={job.jobId}
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 my-auto"
                  checked={selected?.jobId === job.jobId}
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
                  <LabelValue title={"عنوان شغلی"} value={job?.jobTitle} />
                  <LabelValue
                    title={"تاریخ استخدام"}
                    value={
                      job?.employmentDate
                        ? jalali(job?.employmentDate).date
                        : "-"
                    }
                  />
                  <LabelValue title={"محل اشتغال"} value={job?.companyName} />
                  <LabelValue title={"آدرس"} value={job?.companyAddress} />
                  <LabelValue
                    title={"کد پستی"}
                    value={job?.companyPostalCode}
                  />
                  <LabelValue title={"ایمیل"} value={job?.companyEmail} />
                  <LabelValue title={"وب سایت"} value={job?.companyWebSite} />
                  <LabelValue
                    title={"پیش شماره "}
                    value={job?.companyCityPrefix}
                  />
                  <LabelValue title={"تلفن"} value={job?.companyPhone} />
                  <LabelValue
                    title={"پیش شماره فکس"}
                    value={job?.companyFaxPrefix}
                  />
                  <LabelValue title={"فکس"} value={job?.companyFax} />
                  <LabelValue title={"سمت شغلی"} value={job?.position} />
                  <LabelValue title={"توضیحات"} value={job?.description} />
                  <LabelValue
                    title={"اطلاعات سجامی؟"}
                    value={job?.isFromSejam ? "بله" : "خیر"}
                  />
                  <LabelValue
                    title={"تاریخ ویرایش"}
                    value={
                      job?.updateDateTime
                        ? jalali(job?.updateDateTime).date
                        : "-"
                    }
                  />
                  <LabelValue
                    title={"تاریخ ایجاد"}
                    value={
                      job?.createDateTime
                        ? jalali(job?.createDateTime).date
                        : "-"
                    }
                  />
                </div>
              </div>
            );
          })}
        </DaisyAccordionComponent>
      ) : null}
    </CustomerJobInfoContext.Provider>
  );
}

const CustomerJobInfoToolbar = () => {
  return (
    <div className="flex space-x-2 space-x-reverse z-10 mb-4">
      <AddJob />
      <EditJob />
      <RemoveJob />
    </div>
  );
};
