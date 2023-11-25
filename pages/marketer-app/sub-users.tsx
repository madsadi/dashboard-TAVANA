import React from "react";
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
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

function SubUsers() {
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${MARKETER_ADMIN}/marketer/all-users-total`,
  });

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.MARKETER_APP_subusers}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result.pagedData}
        module={ModuleIdentifier.MARKETER_APP_subusers}
        rowSelection={"single"}
        rowId={["TradeCode"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(SubUsers, ModuleIdentifier.MARKETER_APP_subusers);
