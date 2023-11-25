import React, { useMemo } from "react";
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
import { formatNumber } from "../../utils/common-funcions";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

function Trades() {
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchTrades`,
  });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.ONLINE_TRADES_detail
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
    <div className="flex flex-col h-full grow">
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.ONLINE_TRADES}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.ONLINE_TRADES}
        loading={loading}
        rowId={["tradeTime", "tradeDate", "orderId", "tradeId"]}
        detailCellRendererParams={detailCellRendererParams}
        masterDetail={true}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(Trades, ModuleIdentifier.ONLINE_TRADES);
