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
import { BourseCodeToolbar } from "components/customer-management/bourse-code/bourse-code-toolbar";
import { CustomerManagementBourseCodeContext } from "components/customer-management/customer/detail/bourse-code/customer-bourse-code";

function CustomerManagementBourseCode() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customerBourseCode/Search`,
  });

  return (
    <CustomerManagementBourseCodeContext.Provider
      value={{
        selected: selectedRows[0],
        customer: {
          customerId: selectedRows[0]?.customerId,
          relatedCustomerTitle: selectedRows[0]?.customerTitle,
        },
        fetchData: () => fetchData(query),
      }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code}
          />
        </AccordionComponent>
        <BourseCodeToolbar isMainPage={true} />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code}
          rowId={["id"]}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerManagementBourseCodeContext.Provider>
  );
}

export default withPermission(
  CustomerManagementBourseCode,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code
);
