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
import { CREDIT_MANAGEMENT } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { CreditCategoryAssignmentToolbar } from "components/credit/assignment/credit-category-assignment-toolbar";

export const CreditAssignmentContext = createContext({});
function CreditCategoryAssignment() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/category-credit-assignment/Search`,
  });

  return (
    <CreditAssignmentContext.Provider
      value={{ selected: selectedRows[0], fetchData: () => fetchData(query) }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CREDIT_category_assignment}
          />
        </AccordionComponent>
        <CreditCategoryAssignmentToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CREDIT_category_assignment}
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
    </CreditAssignmentContext.Provider>
  );
}

export default withPermission(
  CreditCategoryAssignment,
  ModuleIdentifier.CREDIT_category_assignment
);
