import React from "react";
import TableComponent from "../../common/table/table-component";
import useQuery from "../../../hooks/useQuery";
import { CREDIT_MANAGEMENT } from "../../../api/constants";
import { ModuleIdentifier } from "utils/Module-Identifier";

export default function DetailPortfolio({ data }: { data: any }) {
  const {
    fetchData,
    data: result,
    query,
  } = useQuery({
    url: `${CREDIT_MANAGEMENT}/PortfolioStatus/AssetWeight`,
    revalidateOnMount: true,
    params: {
      tradeCode: data?.tradeCode,
      date: data?.creditRiskStatus[0]?.createdDate,
      pageSize: 20,
    },
  });

  return (
    <div className={"m-5 flex flex-col h-full pb-16"}>
      <TableComponent
        sideBar={false}
        pagination={true}
        fetcher={fetchData}
        query={query}
        data={result?.result?.pagedData}
        module={ModuleIdentifier.CREDIT_portfolio_status_detail}
        rowId={["id"]}
      />
    </div>
  );
}
