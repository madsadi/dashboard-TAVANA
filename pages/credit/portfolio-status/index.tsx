import React from "react";
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
import { CREDIT_MANAGEMENT } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import DetailPortfolio from "components/credit/portfolio/detail-portfolio";

function CreditPortfolioStatus() {
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/PortfolioStatus`,
  });

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CREDIT_portfolio_status}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.CREDIT_portfolio_status}
        rowId={["tradeCode"]}
        pagination={true}
        masterDetail={true}
        detailComponent={DetailPortfolio}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  CreditPortfolioStatus,
  ModuleIdentifier.CREDIT_portfolio_status
);
