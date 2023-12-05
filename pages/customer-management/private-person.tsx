import React, { createContext, useState } from "react";
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
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";
import { CustomerPrivatePersonInfoContext } from "components/customer-management/customer/detail/private-person/customer-private-person";
import { PrivatePersonToolbar } from "components/customer-management/customer/detail/private-person/toolbar";

function PrivatePerson() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/privatePerson/search`,
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

  console.log(selectedRows);

  return (
    <CustomerPrivatePersonInfoContext.Provider
      value={{
        fetchHandler: () => fetchData(query),
        customerId: selectedRows?.[0]?.customerId,
        info: selectedRows?.[0],
      }}
    >
      <div className={"flex flex-col h-full flex-1 "}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_private_person}
          />
        </AccordionComponent>
        <PrivatePersonToolbar isMainPage={true} />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_private_person}
          loading={loading}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection="single"
          rowId={["customerId"]}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CustomerPrivatePersonInfoContext.Provider>
  );
}

export default withPermission(
  PrivatePerson,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_private_person
);
