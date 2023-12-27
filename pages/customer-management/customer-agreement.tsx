import React, { useState, createContext } from "react";
import dynamic from "next/dynamic";
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
const Toolbar = dynamic(
  () => import("../../components/customer-management/toolbar")
);
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { CustomerAgreementToolbar } from "components/customer-management/customer-agreement/customer-agreement-toolbar";

export const CustomerAgreementContext = createContext({});
function CustomerManagementCustomerAgreement() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, loading, fetchData, query } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customerAgreement/Search`,
  });

  return (
    <CustomerAgreementContext.Provider
      value={{ fetchData, selected: selectedRows[0], query }}
    >
      <div className="flex flex-col h-full grow">
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customerAgreement}
          />
        </AccordionComponent>
        <CustomerAgreementToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customerAgreement}
          loading={loading}
          rowId={["id"]}
          rowSelection={"single"}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerAgreementContext.Provider>
  );
}

export default withPermission(
  CustomerManagementCustomerAgreement,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_customerAgreement
);
