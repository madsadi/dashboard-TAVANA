import React from "react";
import TableComponent from "../../common/table/table-component";
import useQuery from "../../../hooks/useQuery";
import { CREDIT_MANAGEMENT } from "../../../api/constants";
import { ModuleIdentifier } from "utils/Module-Identifier";

export default function DetailPortfolio({
  data,
}: {
  data: { tradeCode: number; creditRiskStatus: { createdDate: string }[] };
}) {
  const { data: result, loading } = useQuery({
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
      <p>
        وضعیت دارایی:
        <span className="font-bold mx-2">
          {result?.result.pagedData?.[0]?.assetStatus}
        </span>
      </p>
      <TableComponent
        sideBar={false}
        loading={loading}
        data={result?.result?.pagedData[0]?.assets}
        module={ModuleIdentifier.CREDIT_portfolio_status_detail}
        rowId={["marketInstrumentIsin"]}
        groupIncludeFooter={true}
        groupIncludeTotalFooter={true}
      />
    </div>
  );
}
