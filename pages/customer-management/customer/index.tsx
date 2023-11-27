import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);
const AccordionComponent = dynamic(
  () => import("../../../components/common/components/accordion")
);
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";
import CustomerToolbar from "components/customer-management/customer/toolbar";

export const CustomerContext = createContext({});
function Customers() {
  const [selectedRows, setSelectedRows] = useState([]);
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customer/search`,
  });

  const detailCellRendererParams = () => {
    return {
      detailGridOptions: {
        enableRtl: true,
        getRowId: (params: any) => params.data.id,
        columnDefs: generateDynamicColumnDefs(
          ModuleIdentifier.CUSTOMER_MANAGEMENT_customer_detail
        ),
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
    <CustomerContext.Provider
      value={{ fetchData, selectedRows, setSelectedRows, query }}
    >
      <div className={"flex flex-col h-full flex-1 "}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customer}
          />
        </AccordionComponent>
        <CustomerToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customer}
          loading={loading}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection="single"
          rowId={["id"]}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerContext.Provider>
  );
}

export default withPermission(
  Customers,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_customer
);
