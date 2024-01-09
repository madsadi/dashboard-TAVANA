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
import { MarketerToolbar } from "components/customer-management/marketer/toolbar";

export const CustomerManagementMarketer = createContext({});
function Marketer() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, loading, fetchData, query } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/marketer/Search`,
  });

  const detailCellRendererParams = () => {
    return {
      detailGridOptions: {
        enableRtl: true,
        getRowId: (params: any) => params.data.id,
        columnDefs: [
          {
            field: "tbsMarketerId",
            headerName: "شناسه یازاریاب ",
          },
          {
            field: "reagentRefCode",
            headerName: "کد معرفی",
          },
          {
            field: "marketerRefCode",
            headerName: "کدبازاریابی",
          },
          {
            field: "tbsReagentId",
            headerName: "شناسه معرف",
          },
          {
            field: "customerId",
            headerName: "شناسه مشتری",
          },
          {
            field: "branchId",
            headerName: "شناسه شعبه",
          },
          {
            field: "UserId",
            headerName: "شناسه کاربر",
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
    <CustomerManagementMarketer.Provider
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
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer}
          />
        </AccordionComponent>
        <MarketerToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer}
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
    </CustomerManagementMarketer.Provider>
  );
}

export default withPermission(
  Marketer,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer
);
