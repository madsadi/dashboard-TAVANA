import React, { createContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const IdentityComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/identity"
    )
);
const JobInfoComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/job-info"
    )
);
const BankComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/bank"
    )
);
const LegalPersonShareholdersComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/legal-person-shareholders"
    )
);
const LegalPersonStakeholdersComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/legal-person-stakeholders"
    )
);
const BourseCodeComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/bourse-code"
    )
);
const AgentComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/agent"
    )
);
const AddressesComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/addresses"
    )
);
const EconomicComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/economic"
    )
);
const AgreementComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/agreement"
    )
);
const EditRegStateComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/edit-reg-state"
    )
);
const InquirySejamStateComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/inquiry-sejam-state"
    )
);
const TBSComponent = dynamic(
  () =>
    import("../../../components/online-registration/registration-report/tbs")
);
const DocumentsComponent = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/detail/documents"
    )
);
const EditRefCode = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/edit-ref-code"
    )
);
const BuildAgreementsFiles = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/build-agreements-files"
    )
);
const AgreementToTbs = dynamic(
  () =>
    import(
      "../../../components/online-registration/registration-report/agreement-to-tbs"
    )
);
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);

import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { formatNumber } from "../../../utils/common-funcions";
import { useSelector } from "react-redux";
import { isAllowed } from "../../../utils/permission-utils";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import EditBourseCode from "components/online-registration/registration-report/edit-bourse-code";
import { generateDynamicColumnDefs } from "utils/generate-dynamic-col-defs";
const UpdateAgentInfo = dynamic(
  () =>
    import(
      "components/online-registration/registration-report/update-agent-info"
    )
);

export const OnlineRegDetailContext = createContext({});
function Detail() {
  const { user_permissions: userPermissions } = useSelector(
    (state: any) => state.appConfig
  );
  const { service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.ONLINE_REGISTRATION,
    "edit"
  );
  const { data: info, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchUser`,
  });
  let data = info?.result?.pagedData[0];
  const router = useRouter();
  let dep = router.query;
  const colDef = generateDynamicColumnDefs(
    ModuleIdentifier.ONLINE_REGISTRATION
  ).filter(
    (item) =>
      item.colId !== "checkbox" && item.colId !== "online-registration-detail"
  );

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

  useEffect(() => {
    if (
      dep.userId &&
      (restriction
        ? isAllowed({
            userPermissions,
            whoIsAllowed: [[service?.[0], modules?.[0]?.[0], "Read"].join(".")],
          })
        : true)
    ) {
      let _query: any = {};
      _query["UserId"] = dep.userId;
      fetchData(_query);
    }
  }, [dep, userPermissions]);

  return (
    <OnlineRegDetailContext.Provider value={{ data, fetchData }}>
      <div className={"h-full w-full"}>
        <div className={"border border-border rounded-t-lg"}>
          <div className={"toolbar p-2"}>
            <EditRegStateComponent />
            <EditRefCode />
            <EditBourseCode />
            <UpdateAgentInfo />
            <InquirySejamStateComponent />
            <BuildAgreementsFiles />
            <TBSComponent />
            <AgreementToTbs />
          </div>
        </div>
        <TableComponent
          module={ModuleIdentifier.ONLINE_REGISTRATION}
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
            <DocumentsComponent />
            <IdentityComponent />
            <JobInfoComponent />
            <BankComponent />
            <LegalPersonShareholdersComponent />
            <LegalPersonStakeholdersComponent />
            <BourseCodeComponent />
            <AgentComponent />
            <AddressesComponent />
            <EconomicComponent />
            <AgreementComponent />
          </div>
        ) : null}
      </div>
    </OnlineRegDetailContext.Provider>
  );
}

export default Detail;
