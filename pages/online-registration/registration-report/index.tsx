import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const AccordionComponent = dynamic(
  () => import("../../../components/common/components/accordion")
);
const SearchComponent = dynamic(
  () => import("../../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);
const UserRegToolbarComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/user-reg-toolbar"
    )
);
import { formatNumber } from "../../../utils/common-funcions";
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";

export const OnlineRegContext = createContext({});
function OnlineRegistration() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const {
    data,
    query: searchQuery,
    loading,
    fetchData,
  }: any = useQuery({ url: `${ADMIN_GATEWAY}/api/request/SearchUser` });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.ONLINE_REGISTRATION_detail
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
    <OnlineRegContext.Provider
      value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.ONLINE_REGISTRATION}
          />
        </AccordionComponent>
        <UserRegToolbarComponent />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.ONLINE_REGISTRATION}
          loading={loading}
          rowId={["userId", "id"]}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          detailCellRendererParams={detailCellRendererParams}
          masterDetail={true}
          rowSelection={"multiple"}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={searchQuery}
        />
      </div>
    </OnlineRegContext.Provider>
  );
}

export default withPermission(
  OnlineRegistration,
  ModuleIdentifier.ONLINE_REGISTRATION
);
