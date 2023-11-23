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
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

function Reconcilation() {
  const { data, fetchData, loading }: any = useQuery({
    url: `${MARKETER_ADMIN}/reconciliation`,
  });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        // getRowId:(params:any)=>params.data.orderId,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.MARKETER_APP_reconcilation_detail
        ),
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          // valueFormatter: formatNumber
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([params.data]);
      },
    };
  }, []);

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.MARKETER_APP_reconcilation}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.MARKETER_APP_reconcilation}
        rowId={["MarketerID"]}
        detailCellRendererParams={detailCellRendererParams}
        masterDetail={true}
      />
    </div>
  );
}

export default withPermission(
  Reconcilation,
  ModuleIdentifier.MARKETER_APP_reconcilation
);
