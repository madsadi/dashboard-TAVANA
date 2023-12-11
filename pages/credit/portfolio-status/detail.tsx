import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../../components/common/components/search")
);
const AccordionComponent = dynamic(
  () => import("../../../components/common/components/accordion")
);
import useQuery from "../../../hooks/useQuery";
import { CREDIT_MANAGEMENT } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import { useRouter } from "next/router";
import moment from "jalali-moment";
import "ag-charts-enterprise";

function CreditPortfolioStatusDetail() {
  const router = useRouter();
  const { data, fetchData, loading }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/PortfolioStatus/Range`,
  });

  useEffect(() => {
    if (router.query?.tradeCode && router.query?.startDate) {
      fetchData({
        tradeCode: router.query?.tradeCode,
        startDate: router.query?.startDate,
      });
    }
  }, [router.query]);

  console.log(
    data?.result?.pagedData[0].creditRiskStatus.map((item: any) => {
      return {
        ...item,
        month: moment(item.createdDate).format("MMM"),
        day: moment(item.createdDate).format("DD"),
        value: 1,
      };
    })
  );

  const options: AgChartOptions = {
    data: data?.result?.pagedData[0].creditRiskStatus.map((item: any) => {
      return {
        ...item,
        month: moment(item.createdDate).locale("fa").format("MMM"),
        day: moment(item.createdDate).locale("fa").format("DD"),
        value: 1.2,
      };
    }),
    title: {
      text: "UK monthly mean temperature °C",
    },
    series: [
      {
        type: "heatmap",
        xKey: "month",
        yKey: "day",
        colorKey: "value",
      },
    ],
  };
  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CREDIT_portfolio_status_detail}
          initialQuery={{
            tradeCode: router.query?.tradeCode,
            startDate: router.query?.startDate,
          }}
        />
      </AccordionComponent>
      <div
        className={
          "relative grow flex flex-col overflow-hidden border border-border rounded-b-xl min-h-[200px]"
        }
      >
        <div className="absolute top-0 right-0 h-full w-full">
          <AgChartsReact options={options} />
        </div>
      </div>
    </div>
  );
}

export default withPermission(
  CreditPortfolioStatusDetail,
  ModuleIdentifier.CREDIT_portfolio_status_detail
);
