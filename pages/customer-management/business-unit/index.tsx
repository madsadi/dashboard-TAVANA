import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);
const AccordionComponent = dynamic(
  () => import("../../../components/common/components/accordion")
);
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { BusinessUnitToolbar } from "components/customer-management/business-unit/toolbar";

export const CustomerManagementBusinessUnit = createContext({});
function BusinessUnit() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/businessUnit/Search`,
  });

  return (
    <CustomerManagementBusinessUnit.Provider
      value={{
        fetchData: () => fetchData(query),
        selected: selectedRows,
      }}
    >
      <div className={"flex flex-col h-full flex-1 "}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit}
          />
        </AccordionComponent>
        <BusinessUnitOwnerToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit}
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
    </CustomerManagementBusinessUnit.Provider>
  );
}

export default withPermission(
  BusinessUnit,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit
);
