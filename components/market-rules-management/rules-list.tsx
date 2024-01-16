import React, { createContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const RulesExpressionDetail = dynamic(
  () => import("./rules-expression-detail")
);
const TableComponent = dynamic(() => import("../common/table/table-component"));
const RulesToolbar = dynamic(() => import("./rules-toolbar"));
const AccordionComponent = dynamic(
  () => import("../common/components/accordion")
);
const SearchComponent = dynamic(() => import("../common/components/search"));
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { isAllowed } from "../../utils/permission-utils";
import { useSelector } from "react-redux";
import { useSearchFilters } from "../../hooks/useSearchFilters";

export const MarketRulesContext = createContext({});
export default function RulesList() {
  const { restriction, service, modules } = useSearchFilters(
    ModuleIdentifier.MARKET_RULES_MANAGEMENT
  );
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, fetchData, loading } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetRules`,
  });
  const { data: dynamics, fetchData: fetchFields } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetFieldsList`,
  });
  let dynamicOptions = dynamics?.result;
  const { user_permissions: userPermissions } = useSelector(
    (state: any) => state.appConfig
  );

  useMemo(() => {
    if (
      restriction
        ? isAllowed({
            userPermissions,
            whoIsAllowed: [[service[0], modules[0][0], "Read"].join(".")],
          })
        : true
    ) {
      fetchFields();
    }
  }, [userPermissions]);

  return (
    <MarketRulesContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
        dynamicOptions,
        fetchData,
        query,
      }}
    >
      <div className="flex flex-col h-full grow">
        <AccordionComponent>
          <SearchComponent
            module={ModuleIdentifier.MARKET_RULES_MANAGEMENT}
            onSubmit={fetchData}
            loading={loading}
            dynamicOptions={dynamicOptions}
          />
        </AccordionComponent>
        <RulesToolbar />
        <TableComponent
          data={data?.result}
          module={ModuleIdentifier.MARKET_RULES_MANAGEMENT}
          rowId={["id"]}
          loading={loading}
          rowSelection={"single"}
          masterDetail={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          detailComponent={RulesExpressionDetail}
        />
      </div>
    </MarketRulesContext.Provider>
  );
}
