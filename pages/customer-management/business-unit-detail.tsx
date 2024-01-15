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
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { dateCell } from "utils/common-funcions";
import { BusinessUnitDetailRelatedToolbar } from "components/customer-management/business-unit-detail/related-party/relatedparty-toolbar";
import { BusinessUnitDetailOwnerToolbar } from "components/customer-management/business-unit-detail/owner-party/ownerparty-toolbar";

export const CustomerManagementBusinessUnitDetailContext = createContext({});
function BusinessUnitDetail() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/businessUnit/SearchRelation`,
  });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        columnDefs: [
          { headerName: "", field: "type" },
          { field: "entityTitle", headerName: "ماهیت" },
          { field: "partyTitle", headerName: "عضو" },
          {
            field: "createDateTime",
            headerName: "تاریخ ایجاد",
            valueFormatter: (rowData: any) => {
              return dateCell(rowData.value);
            },
          },
          {
            field: "updateDateTime",
            headerName: "تاریخ ویرایش",
            valueFormatter: (rowData: any) => {
              return dateCell(rowData.value);
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
        const related = params.data.relatedParty.map((item: any) => {
          return {
            type: "دسترسی",
            ...item,
          };
        });
        const owner = params.data.ownerParty.map((item: any) => {
          return {
            type: "مالک",
            ...item,
          };
        });
        params.successCallback([...related, ...owner]);
      },
    };
  }, []);

  return (
    <CustomerManagementBusinessUnitDetailContext.Provider
      value={{
        fetchData: () => fetchData(query),
        selected: selectedRows,
      }}
    >
      <div className={"flex flex-col h-full flex-1 "}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_detail}
          />
        </AccordionComponent>
        <div className="flex items-center border border-l">
          <BusinessUnitDetailRelatedToolbar />
          <BusinessUnitDetailOwnerToolbar />
        </div>
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_detail}
          loading={loading}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection="single"
          rowId={["id"]}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerManagementBusinessUnitDetailContext.Provider>
  );
}

export default withPermission(
  BusinessUnitDetail,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_detail
);
