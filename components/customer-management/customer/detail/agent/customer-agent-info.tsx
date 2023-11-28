import { useEffect, useState, createContext } from "react";
import LabelValue from "../../../../common/components/label-value";
import { jalali } from "../../../../../utils/common-funcions";
import { useContext } from "react";
import DaisyAccordionComponent from "../../../../common/components/daisy-accordion";
import { CustomerDetailContext } from "pages/customer-management/customer/[...userId]";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import AddAgentRelation from "./add-agent-relation";
import EditAgentRelation from "./edit-agent-relation";

export const CustomerAgentInfoContext = createContext({});
export default function CustomerAgentInfo() {
  const { data } = useContext<any>(CustomerDetailContext);
  const [selected, setSelected] = useState<any>(null);
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customerAgentRelation/Search`,
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
    <CustomerAgentInfoContext.Provider
      value={{
        fetchHandler,
        customerId: data.id,
        selected,
      }}
    >
      {info ? (
        <DaisyAccordionComponent title={"اطلاعات وکیل/نماینده"}>
          <CustomerAgenttoolbar />
          {info?.result?.pagedData.map((agent: any) => {
            return (
              <div
                className="flex space-x-2 space-x-reverse mb-5 "
                key={agent.id}
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 my-auto"
                  checked={selected?.id === agent.id}
                  onChange={() => selectionHandler(agent)}
                />
                <div
                  className={`relative grid md:grid-cols-5 grid-cols-2 gap-3 border  rounded-md p-5 grow cursor-pointer`}
                  onClick={() => selectionHandler(agent)}
                >
                  <LabelValue
                    title={"کد ملی مشتری"}
                    value={agent?.customerUniqueId}
                  />
                  <LabelValue
                    title={"عنوان مشتری"}
                    value={agent?.customerTitle}
                  />
                  <LabelValue
                    title={"کد ملی نماینده"}
                    value={agent?.agentUniqueId}
                  />
                  <LabelValue
                    title={"عنوان نماینده"}
                    value={agent?.agentTitle}
                  />
                  <LabelValue
                    title={"نوع وکالت"}
                    value={agent?.agentTypeTitle}
                  />
                  <LabelValue
                    title={"تائید شده؟"}
                    value={agent?.isConfirmed ? "تایید شده" : "تایید نشده"}
                  />
                  <LabelValue
                    title={"تاریخ شروع وکالت"}
                    value={
                      agent?.startDate ? jalali(agent?.startDate).date : "-"
                    }
                  />
                  <LabelValue
                    title={"تاریخ انقضاء وکالت"}
                    value={
                      agent?.expirationDate
                        ? jalali(agent?.expirationDate).date
                        : "-"
                    }
                  />
                  <LabelValue title={"توضیحات"} value={agent?.description} />
                  <LabelValue
                    title={"تاریخ ایجاد"}
                    value={
                      agent?.createDateTime
                        ? jalali(agent?.createDateTime).date
                        : "-"
                    }
                  />
                </div>
              </div>
            );
          })}
        </DaisyAccordionComponent>
      ) : null}
    </CustomerAgentInfoContext.Provider>
  );
}

const CustomerAgenttoolbar = () => {
  return (
    <div className="flex space-x-2 space-x-reverse z-10 mb-4">
      <AddAgentRelation />
      <EditAgentRelation />
    </div>
  );
};
