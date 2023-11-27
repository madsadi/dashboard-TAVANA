import React, { createContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);

import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { useSelector } from "react-redux";
import { isAllowed } from "../../../utils/permission-utils";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";
import CustomerToolbar from "components/customer-management/customer/toolbar";
const CustomerIdentityInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/identity/customer-identity-info"
    )
);
const CustomerBankAccountInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/bank-account/customer-bank-account-info"
    )
);

export const CustomerDetailContext = createContext({});
function Detail() {
  const { user_permissions: userPermissions } = useSelector(
    (state: any) => state.appConfig
  );
  const { service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer
  );
  const {
    data: info,
    fetchData: fetchDetailData,
    query,
  }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/customer/search`,
  });
  let data = info?.result?.pagedData[0];
  const router = useRouter();
  let dep = router.query?.userId?.[0];
  const colDef = generateDynamicColumnDefs(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer
  ).filter(
    (item) => item.colId !== "checkbox" && item.colId !== "customer-detail"
  );

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

  useEffect(() => {
    if (
      dep &&
      (restriction
        ? isAllowed({
            userPermissions,
            whoIsAllowed: [[service?.[0], modules?.[0]?.[0], "Read"].join(".")],
          })
        : true)
    ) {
      const queryData = dep.split("&");
      let _query: any = {};

      _query["UserId"] = queryData[0];
      fetchDetailData(_query);
    }
  }, [dep, userPermissions]);

  return (
    <CustomerDetailContext.Provider value={{ data, fetchDetailData, query }}>
      <div className={"h-full w-full"}>
        <CustomerToolbar />
        <TableComponent
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customer}
          columnDefStructure={colDef}
          sideBar={false}
          data={info?.result?.pagedData}
          rowId={["userId", "id"]}
          detailCellRendererParams={detailCellRendererParams}
          masterDetail={true}
          indexOfOpenedDetail={0}
        />
        {data ? (
          <div className={"w-full grow space-y-3 mt-5"}>
            <CustomerIdentityInfo />
            <CustomerBankAccountInfo />
          </div>
        ) : null}
      </div>
    </CustomerDetailContext.Provider>
  );
}

export default Detail;
