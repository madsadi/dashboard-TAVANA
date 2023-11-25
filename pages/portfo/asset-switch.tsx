import React, { createContext, useMemo, useState } from "react";
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
import { formatNumber } from "utils/common-funcions";
import AssetSwitchToolbar from "components/asset-switch/asset-switch-toolbar";
import { withPermission } from "components/common/layout/with-permission";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

export const AssetSwitchContext = createContext({});
function AssetSwitch() {
  const [selectedRows, setSelectedRows] = useState([]);
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchAssetSwitch`,
  });
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.PORTFO_asset_switch_request_detail
        ),
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([params.data]);
      },
    };
  }, []);

  return (
    <AssetSwitchContext.Provider value={{ selectedRows, fetchData, query }}>
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.PORTFO_asset_switch_request}
          />
        </AccordionComponent>
        <AssetSwitchToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.PORTFO_asset_switch_request}
          loading={loading}
          detailCellRendererParams={detailCellRendererParams}
          rowId={["id"]}
          pagination={true}
          rowSelection={"single"}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          masterDetail={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </AssetSwitchContext.Provider>
  );
}

export default withPermission(
  AssetSwitch,
  ModuleIdentifier.PORTFO_asset_switch_request
);
