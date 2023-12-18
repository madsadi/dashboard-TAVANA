import React from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
import useQuery from "../../hooks/useQuery";
import { CREDIT_MANAGEMENT } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import CreditKPIToolbar from "components/credit/KPI/credit-KPI-toolbar";

function CreditCustomerKPI() {
  const { data: brokerData, fetchData: brokerFetch }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/KPIBrokerageTotalCreditKPI`,
  });
  const {
    data: customerData,
    fetchData: customerFetch,
    query,
    loading,
  }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/KPICustomerTotalCreditKPI`,
  });

  const fetchHandler = (query: any) => {
    const { startDate, endDate } = query;
    brokerFetch({ startDate, endDate });
    customerFetch(query);
  };
  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchHandler}
          loading={loading}
          module={ModuleIdentifier.CREDIT_customer_kpi}
        />
      </AccordionComponent>
      <CreditKPIToolbar data={brokerData?.result} />
      <TableComponent
        data={customerData?.result?.pagedData}
        module={ModuleIdentifier.CREDIT_customer_kpi}
        rowId={["tradeCode"]}
        pagination={true}
        totalCount={customerData?.result?.totalCount}
        fetcher={customerFetch}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  CreditCustomerKPI,
  ModuleIdentifier.CREDIT_customer_kpi
);
