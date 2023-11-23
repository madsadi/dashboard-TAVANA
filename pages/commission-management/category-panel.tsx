import React from "react";
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

function CategoryPanel() {
  const { data, loading, fetchData, query } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/CommissionCategory/Search`,
  });

  return (
    <div className={"relative flex flex-col grow overflow-hidden"}>
      <AccordionComponent>
        <SearchComponent
          module={ModuleIdentifier.COMMISSION_MANAGEMENT_category}
          loading={loading}
          onSubmit={fetchData}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.COMMISSION_MANAGEMENT_category}
        rowId={["id"]}
        loading={loading}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  CategoryPanel,
  ModuleIdentifier.COMMISSION_MANAGEMENT_category
);
