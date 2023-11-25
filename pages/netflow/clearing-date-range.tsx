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

function ClearingDateRange() {
  const { data, query, loading, fetchData }: any = useQuery({
    url: `${NETFLOW}/Report/clearing-date-range-T`,
  });

  const getRowStyle = (params: any) => {
    if (params?.node?.rowIndex === 0) {
      return { borderRight: "2px solid rgba(5,122,85,1)" };
    } else {
      return { borderRight: "2px solid rgba(225,29,72,1)" };
    }
  };
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        rowStyle: {},
        getRowStyle: getRowStyle,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.NETFLOW_clearing_Range_detail
        ),
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([
          params.data?.buyCommission,
          params.data?.sellCommission,
        ]);
      },
    };
  }, []);

  return (
    <div className={"relative flex flex-col grow overflow-hidden"}>
      <AccordionComponent>
        <SearchComponent
          module={ModuleIdentifier.NETFLOW_clearing_Range}
          onSubmit={fetchData}
          loading={loading}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result}
        module={ModuleIdentifier.NETFLOW_clearing_Range}
        loading={loading}
        rowId={["sell", "settlementDelay", "enTierName", "georgianTradeDate"]}
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
  ClearingDateRange,
  ModuleIdentifier.NETFLOW_clearing_Range
);
