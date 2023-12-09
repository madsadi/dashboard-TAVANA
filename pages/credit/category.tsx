import React, { useState } from "react";
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
import { CreditCategoryToolbar } from "components/credit/category/credit-category-toolbar";

function CreditCategory() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/Category/Search`,
  });

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CREDIT_category}
        />
      </AccordionComponent>
      <CreditCategoryToolbar />
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.CREDIT_category}
        rowId={["creditCategoryCode"]}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(CreditCategory, ModuleIdentifier.CREDIT_category);
