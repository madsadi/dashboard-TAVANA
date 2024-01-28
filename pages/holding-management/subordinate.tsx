import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
const SubordinateToolbar = dynamic(
  () => import("../../components/customer-management/subordinate/toolbar")
);
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import AccordionComponent from "components/common/components/accordion";

export const CustomerManagementSubordinateContext = createContext({});
function Subordinate() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/marketerSubordinate/Search`,
  });
  const detailCellRendererParams = () => {
    return {
      detailGridOptions: {
        enableRtl: true,
        getRowId: (params: any) => params.data.id,
        sideBar: false,
        columnDefs: [
          {
            field: "branchTitle",
            headerName: "	عنوان شعبه بازاریاب ",
          },
          {
            field: "branchTypeTitle",
            headerName: "نوع شعبه بازاریاب",
          },
          {
            field: "subsidiaryTitle",
            headerName: "	عنوان شرکت",
          },
          {
            field: "subsidiaryTypeTitle",
            headerName: "	نوع شرکت",
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
    <CustomerManagementSubordinateContext.Provider
      value={{
        fetchData: () => fetchData(query),
        selected: selectedRows,
        setSelectedRows,
      }}
    >
      <div className={"flex flex-col h-full grow "}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_subordinate}
          />
        </AccordionComponent>
        <SubordinateToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_subordinate}
          loading={loading}
          detailCellRendererParams={detailCellRendererParams}
          masterDetail={true}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection="single"
          rowId={["id"]}
        />
      </div>
    </CustomerManagementSubordinateContext.Provider>
  );
}

export default Subordinate;
