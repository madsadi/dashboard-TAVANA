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

function Rules() {
  const { fetchData, loading, data, query } = useQuery({
    url: `${NETFLOW}/Report/rules`,
  });

  const getRowStyle = (params: any) => {
    if (params?.node?.data?.side === 1) {
      return { backgroundColor: "rgba(5,122,85,0.18)" };
    } else {
      return { backgroundColor: "rgba(225,29,72,0.18)" };
    }
  };
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        rowStyle: {},
        getRowStyle: getRowStyle,
        suppressRowTransform: true,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.NETFLOW_rules_detail
        ),
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: (params: any) => {
        params.successCallback([
          ...params.data?.feeBound,
          ...params.data?.feeValue,
        ]);
      },
    };
  }, []);

  return (
    <div className="flex flex-col h-full grow">
      <AccordionComponent>
        <SearchComponent
          module={ModuleIdentifier.NETFLOW_rules}
          onSubmit={fetchData}
          loading={loading}
        />
      </AccordionComponent>
      <TableComponent
        module={ModuleIdentifier.NETFLOW_rules}
        data={data?.result}
        loading={loading}
        rowId={["endDate", "startDate", "name", "tierName"]}
        rowSelection={"single"}
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

export default withPermission(Rules, ModuleIdentifier.NETFLOW_rules);
