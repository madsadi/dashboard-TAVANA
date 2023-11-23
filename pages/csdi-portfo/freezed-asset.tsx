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
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

function FreezedAsset() {
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchCustomerFreezedAsset`,
  });

  return (
    <div className={"flex flex-col h-full flex-1 "}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CSDI_PORTFO_freezed_asset}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.CSDI_PORTFO_freezed_asset}
        loading={loading}
        rowId={["id"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  FreezedAsset,
  ModuleIdentifier.CSDI_PORTFO_freezed_asset
);
