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
import RelationToolbar from "../../components/marketer-app/relations/toolbar/relation-toolbar";
import { withPermission } from "components/common/layout/with-permission";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

export const RelationsContext = createContext({});
function Relations() {
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const {
    data,
    fetchData,
    query: searchQuery,
    loading,
  }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer-relation/search` });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.MARKETER_APP_relations_detail
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
    <RelationsContext.Provider
      value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.MARKETER_APP_relations}
          />
        </AccordionComponent>
        <RelationToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.MARKETER_APP_relations}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection={"multiple"}
          rowId={["LeaderMarketerId", "FollowerMarketerId"]}
          detailCellRendererParams={detailCellRendererParams}
          masterDetail={true}
        />
      </div>
    </RelationsContext.Provider>
  );
}

export default withPermission(
  Relations,
  ModuleIdentifier.MARKETER_APP_relations
);
