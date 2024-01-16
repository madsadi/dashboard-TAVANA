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
import { AgreementsManagementToolbar } from "components/customer-management/agreements-management/agreements-management-toolbar";

export const CustomerManagementAgreementsManagementContext = createContext({});
function CustomerManagementAgreementsManagement() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/agreement/Search`,
  });

  return (
    <CustomerManagementAgreementsManagementContext.Provider
      value={{ selected: selectedRows[0], fetchData: () => fetchData(query) }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management}
          />
        </AccordionComponent>
        <AgreementsManagementToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management}
          rowId={["id"]}
          loading={loading}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerManagementAgreementsManagementContext.Provider>
  );
}

export default withPermission(
  CustomerManagementAgreementsManagement,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management
);
