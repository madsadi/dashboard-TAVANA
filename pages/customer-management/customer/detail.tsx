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
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";
const CustomerLegalPersonStakeholder = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/legal-person-stakeholder"
    )
);
const CustomerLegalPerson = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/legal-person/customer-legal-person"
    )
);
const CustomerToolbar = dynamic(
  () => import("components/customer-management/customer/toolbar")
);
const CustomerLegalPersonShareholder = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/legal-person-shareholder"
    )
);
const CustomerAccountingCode = dynamic(
  () => import("components/customer-management/customer/detail/accounting-code")
);
const CustomerCustomerAgreement = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/customer-agreement.tsx"
    )
);
const CustomerBourseCode = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/bourse-code/customer-bourse-code"
    )
);
const CustomerPrivatePortfolio = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/private-portfolio/customer-private-portfolio"
    )
);
const CustomerIdentityInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/private-person/customer-private-person"
    )
);
const CustomerBankAccountInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/bank-account/customer-bank-account-info"
    )
);
const CustomerAgentRelationInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/agent-relation/customer-agent-relation-info"
    )
);
const CustomerAddressInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/address/customer-address-info"
    )
);
const CustomerJobInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/job/customer-job-info"
    )
);
const CustomerFinancialBrokerInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/financial-broker/customer-financial-broker-info"
    )
);
const CustomerFinancialInfoInfo = dynamic(
  () =>
    import(
      "components/customer-management/customer/detail/financial-info/customer-financial-info"
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
  let dep = router.query;
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
      dep?.userId &&
      (restriction
        ? isAllowed({
            userPermissions,
            whoIsAllowed: [[service?.[0], modules?.[0]?.[0], "Read"].join(".")],
          })
        : true)
    ) {
      let _query: any = {};
      _query["UserId"] = dep?.userId;
      fetchDetailData(_query);
    }
  }, [dep, userPermissions]);

  const IdentityComponent: any = {
    1: <CustomerIdentityInfo />,
    2: <CustomerLegalPerson />,
    3: <CustomerPrivatePortfolio />,
  };

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
            {IdentityComponent[data.personType]}
            <CustomerBankAccountInfo />
            <CustomerBourseCode />
            <CustomerCustomerAgreement />
            <CustomerAccountingCode />
            {data.personType === 2 ? (
              <>
                <CustomerLegalPersonShareholder />
                <CustomerLegalPersonStakeholder />
              </>
            ) : null}
            {data.personType !== 3 ? (
              <>
                <CustomerAgentRelationInfo />
                <CustomerAddressInfo />
                <CustomerJobInfo />
                <CustomerFinancialBrokerInfo />
                <CustomerFinancialInfoInfo />
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </CustomerDetailContext.Provider>
  );
}

export default Detail;
