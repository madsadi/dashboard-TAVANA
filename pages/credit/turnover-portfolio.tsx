import React, { createContext } from "react";
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
import { CREDIT_MANAGEMENT } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

export const CreditContractContext = createContext({});
function CreditTurnPortfolio() {
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/PortfolioStatus/TurnOver/PeriodDate`,
  });

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CREDIT_turnover_portfolio}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.CREDIT_turnover_portfolio}
        rowId={["tradeCode"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  CreditTurnPortfolio,
  ModuleIdentifier.CREDIT_turnover_portfolio
);
