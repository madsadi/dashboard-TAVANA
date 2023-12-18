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
import CreditBrokerToolbar from "components/credit/broker/credit-broker-toolbar";

function CreditCustomerRequest() {
  const { data, fetchData, loading }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/BrokerCredit/Categories/Detail`,
  });

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CREDIT_broker}
        />
      </AccordionComponent>
      <CreditBrokerToolbar data={data?.result?.brokerCreditLineDetail} />
      <TableComponent
        data={data?.result?.brokerCreditCategoryDetail}
        module={ModuleIdentifier.CREDIT_broker}
        rowId={["id"]}
      />
    </div>
  );
}

export default withPermission(
  CreditCustomerRequest,
  ModuleIdentifier.CREDIT_broker
);
