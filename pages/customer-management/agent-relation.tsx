import React, { createContext, useState } from "react";
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
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import {
  CustomerAgentRelationInfoContext,
  CustomerAgentRelationToolbar,
} from "components/customer-management/customer/detail/agent-relation/customer-agent-relation-info";

function AgentRelation() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customerAgentRelation/Search`,
  });

  return (
    <CustomerAgentRelationInfoContext.Provider
      value={{
        fetchHandler: () => fetchData(query),
        customerId: selectedRows?.[0]?.id,
        selected: selectedRows?.[0],
      }}
    >
      <div className={"flex flex-col h-full flex-1 "}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_agent_relation}
          />
        </AccordionComponent>
        <CustomerAgentRelationToolbar isMainPage={true} />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_agent_relation}
          loading={loading}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection="single"
          rowId={["id"]}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerAgentRelationInfoContext.Provider>
  );
}

export default withPermission(
  AgentRelation,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_agent_relation
);
