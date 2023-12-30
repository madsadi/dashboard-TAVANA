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
import { LegalPersonstakeholderToolbar } from "components/customer-management/legal-person-stakeholder/legal-person-stakeholder-toolbar";

export const CustomerManagementLegalPersonStakeholderContext = createContext(
  {}
);
function CustomerManagementLegalPersonStakeholders() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/legalPersonStakeholder/Search`,
  });

  return (
    <CustomerManagementLegalPersonStakeholderContext.Provider
      value={{
        selected: selectedRows[0],
        customer: selectedRows[0],
        fetchData: () => fetchData(query),
      }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={
              ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person_stakeholders
            }
          />
        </AccordionComponent>
        <LegalPersonstakeholderToolbar isMainPage={true} />
        <TableComponent
          data={data?.result?.pagedData}
          module={
            ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person_stakeholders
          }
          rowId={["id"]}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerManagementLegalPersonStakeholderContext.Provider>
  );
}

export default withPermission(
  CustomerManagementLegalPersonStakeholders,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person_stakeholders
);
