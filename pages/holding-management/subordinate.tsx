import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
const SubordinateToolbar = dynamic(
  () => import("../../components/customer-management/subordinate/toolbar")
);
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import AccordionComponent from "components/common/components/accordion";

export const CustomerManagementSubordinateContext = createContext({});
function Subordinate() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/marketerSubordinate/Search`,
  });

  return (
    <CustomerManagementSubordinateContext.Provider
      value={{
        fetchData: () => fetchData(query),
        selected: selectedRows,
        setSelectedRows,
      }}
    >
      <div className={"flex flex-col h-full grow "}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_subordinate}
          />
        </AccordionComponent>
        <SubordinateToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer_detail}
          loading={loading}
          sideBar={false}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection="single"
          rowId={["id"]}
        />
      </div>
    </CustomerManagementSubordinateContext.Provider>
  );
}

export default Subordinate;
