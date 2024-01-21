import React, { useState, createContext } from "react";
import dynamic from "next/dynamic";
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
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
const EmployeeToolbar = dynamic(
  () => import("../../components/customer-management/employee/employee-toolbar")
);
export const CustomerManagementEmployeeContext = createContext({});
function Employee() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, loading, fetchData, query } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/employee/Search`,
  });

  return (
    <CustomerManagementEmployeeContext.Provider
      value={{
        fetchData: () => fetchData(query),
        selected: selectedRows,
        setSelectedRows,
        query,
      }}
    >
      <div className="flex flex-col h-full grow">
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_employee}
          />
        </AccordionComponent>
        <EmployeeToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_employee}
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
    </CustomerManagementEmployeeContext.Provider>
  );
}

export default withPermission(
  Employee,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_employee
);
