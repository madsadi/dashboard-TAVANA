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
  CustomerIdentitytoolbar,
  CustomerLegalPersonInfoContext,
} from "components/customer-management/customer/detail/legal-person/customer-legal-person";

function LegalPerson() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/legalPerson/Search`,
  });

  return (
    <CustomerLegalPersonInfoContext.Provider
      value={{
        fetchHandler: () => fetchData(query),
        customerId: selectedRows?.[0]?.id,
        info: selectedRows?.[0],
      }}
    >
      <div className={"flex flex-col h-full flex-1 "}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person}
          />
        </AccordionComponent>
        <CustomerIdentitytoolbar isMainPage={true} />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person}
          loading={loading}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection="single"
          rowId={["customerId"]}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerLegalPersonInfoContext.Provider>
  );
}

export default withPermission(
  LegalPerson,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person
);
