import React, { useState, createContext } from "react";
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
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { BranchToolbar } from "components/customer-management/branch/toolbar";

export const CustomerManagementBranch = createContext({});
function Branch() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, loading, fetchData, query } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/branch/Search`,
  });

  const detailCellRendererParams = () => {
    return {
      detailGridOptions: {
        enableRtl: true,
        getRowId: (params: any) => params.data.id,
        columnDefs: [
          {
            field: "id",
            headerName: "شناسه آدرس ",
            cellRendererSelector: () => {
              const ColourCellRenderer = (rowData: any) => {
                return <span>{rowData?.data?.address?.id}</span>;
              };
              const moodDetails = {
                component: ColourCellRenderer,
              };
              return moodDetails;
            },
          },
        ],
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([params.data]);
      },
    };
  };

  return (
    <CustomerManagementBranch.Provider
      value={{
        fetchData: () => fetchData(query),
        selected: selectedRows,
        setSelectedRows,
        query,
      }}
    >
      <div className="flex flex-col h-full grow">
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_branch}
          />
        </AccordionComponent>
        <BranchToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_branch}
          loading={loading}
          rowId={["id"]}
          detailCellRendererParams={detailCellRendererParams}
          rowSelection={"single"}
          masterDetail={true}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerManagementBranch.Provider>
  );
}

export default withPermission(
  Branch,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_branch
);
