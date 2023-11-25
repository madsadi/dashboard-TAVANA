import React, { useMemo, useEffect, useState } from "react";
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
import { NETFLOW } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { SettlementDelayEnums, sides } from "constants/Enums";
import { EnumType } from "types/types";
import { formatNumber, jalali } from "utils/common-funcions";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

function TradesReportPivot() {
  const [rowData, setRowData] = useState<any>(null);
  const { fetchData, loading, data, query } = useQuery({
    url: `${NETFLOW}/Report/trades`,
  });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        rowStyle: {},
        suppressRowTransform: true,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.NETFLOW_trades_report_detail
        ),
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: (params: any) => {
        params.successCallback([params.data?.feeDetail]);
      },
    };
  }, []);

  useEffect(() => {
    if (data?.result) {
      const _data = data?.result.map((item: any) => {
        return {
          ...item,
          side: sides.find((e: EnumType) => e.id === item.side)?.title,
          tradeDate: jalali(item?.georgianTradeDate).date,
          settlementDelay: SettlementDelayEnums.find(
            (e: EnumType) => e.id === item.settlementDelay
          )?.title,
        };
      });
      setRowData({ ...data, result: _data });
    }
  }, [data]);

  return (
    <div className={"relative flex flex-col grow overflow-hidden"}>
      <AccordionComponent>
        <SearchComponent
          module={ModuleIdentifier.NETFLOW_trades_report}
          onSubmit={fetchData}
          loading={loading}
        />
      </AccordionComponent>
      <TableComponent
        data={rowData?.result}
        module={ModuleIdentifier.NETFLOW_trades_report}
        loading={loading}
        rowId={["ticket", "tradeDate"]}
        detailCellRendererParams={detailCellRendererParams}
        masterDetail={true}
        pagination={true}
        totalCount={data?.totalRecord}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  TradesReportPivot,
  ModuleIdentifier.NETFLOW_trades_report
);
