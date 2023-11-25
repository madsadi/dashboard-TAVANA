import React, { useMemo } from "react";
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
import { formatNumber } from "../../utils/common-funcions";
import useQuery from "../../hooks/useQuery";
import { NETFLOW } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

function ClearedTrade() {
  const { data, query, loading, fetchData }: any = useQuery({
    url: `${NETFLOW}/Report/cleared-trade`,
  });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.NETFLOW_cleared_trade_detail
        ),
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([params.data?.feeDetail]);
      },
    };
  }, []);

  return (
    <div className={"relative flex flex-col grow overflow-hidden"}>
      <AccordionComponent>
        <SearchComponent
          module={ModuleIdentifier.NETFLOW_cleared_trade}
          onSubmit={fetchData}
          loading={loading}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result}
        module={ModuleIdentifier.NETFLOW_cleared_trade}
        loading={loading}
        rowId={["ticket"]}
        masterDetail={true}
        detailCellRendererParams={detailCellRendererParams}
        pagination={true}
        totalCount={data?.totalRecord}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  ClearedTrade,
  ModuleIdentifier.NETFLOW_cleared_trade
);
