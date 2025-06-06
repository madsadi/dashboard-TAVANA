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

function BranchHistory() {
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/marketer/SearchBranchHistory`,
  });

  return (
    <div className={"flex flex-col h-full flex-1 "}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_branch_history}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_branch_history}
        rowId={["id"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  BranchHistory,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_branch_history
);
