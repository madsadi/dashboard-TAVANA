import React, { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);

const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { AgChartsReact } from "ag-charts-react";
import {
  formatNumberSecond,
  nFormatter,
} from "components/common/functions/common-funcions";
import { Interval } from "constants/Enums";
import { EnumType } from "types/types";
import { AgChart, AgChartOptions } from "ag-charts-community";
import moment from "jalali-moment";
import { SwitchToggle } from "components/common/components/button/switch-toggle";
import { PresentationChartLineIcon } from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Button } from "components/common/components/button/button";

function CustomerPortfo() {
  const {
    data = [],
    loading,
    query,
    fetchData,
  } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetPortfolioTrend`,
  });
  const [chartData, setChartData] = useState<any>({});
  const [state, setState] = useState<
    "portfolioValueByLastPrice" | "portfolioValueByClosingPrice"
  >("portfolioValueByClosingPrice");

  const options: AgChartOptions = {
    type: "area",
    autoSize: true,
    tooltip: {
      class: "tooltipClassName",
    },
    title: {
      text: chartData?.result?.length
        ? [
            ` کدمعاملاتی: ${chartData?.result?.[0].tradingCode} `,
            ` عنوان مشتری: ${chartData?.result?.[0].customerTitle} `,
            ` کد ملی: ${chartData?.result?.[0].nationalId} `,
            ` کد بورسی: ${chartData?.result?.[0].bourseCode} `,
            ` فاصله گزارش گیری: ${chartData?.result?.[0].timeIntervalTitle} `,
          ].join("   |   ")
        : "",
      fontFamily: "Yekan Bakh",
    },
    subtitle: {
      text: `نمودار روند پورتفو ${
        query.TimeInterval
          ? Interval.find((item: EnumType) => item.id === query.TimeInterval)
              ?.title
          : ""
      }`,
      fontFamily: "Yekan Bakh",
    },
    theme: {
      palette: {
        fills: ["#41a9c9"],
        strokes: ["#2d768d"],
      },
    },
    data: chartData?.result?.map((item: any) => {
      return {
        ...item,
        date: Date.parse(item.date.split("+")[0]),
      };
    }),
    padding: {
      right: 50,
    },
    axes: [
      {
        type: "number",
        position: "left",
        title: {
          text: "ارزش پورتفو",
          fontFamily: "Yekan Bakh",
          fontSize: 20,
        },
        label: {
          fontFamily: "Yekan Bakh",
          formatter: (params: any) => {
            return nFormatter(params.value, 1);
          },
        },
      },
      {
        type: "time",
        position: "bottom",
        nice: false,
        label: {
          fontFamily: "Yekan Bakh",
          formatter: (params: any) => {
            return moment(params.value).locale("fa").format("YYYY-MM-DD");
          },
        },
      },
    ],
    series: [
      {
        type: "area",
        xKey: "date",
        fillOpacity: 0.5,
        yKey: "value",
        tooltip: {
          renderer: (params) => {
            return `
            <div class="ag-chart-tooltip-title" >
            ${moment(params.xValue).locale("fa").format("YYYY-MM-DD")}
            </div>
            <div class="ag-chart-tooltip-content">
                <span class="flex">
                ارزش:
                ${formatNumberSecond(params.yValue)}
                </span>    
            </div>`;
          },
        },
      },
    ],
  };
  const ref: any = useRef();
  const changeHandler = (e: any) => {
    let mode: any = e
      ? "portfolioValueByLastPrice"
      : "portfolioValueByClosingPrice";
    setState(mode);
    const _data = chartData?.result?.map((item: any) => {
      return {
        ...item,
        value: item[mode],
      };
    });
    setChartData({ result: _data });
  };

  useEffect(() => {
    if (data) {
      const _data = data?.result.map((item: any) => {
        return {
          ...item,
          value: item[state],
        };
      });
      setChartData({ result: _data });
    }
  }, [data]);

  const download = useCallback(() => {
    AgChart.download(ref.current.chart);
  }, []);

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.PORTFO_customer_portfo}
        />
      </AccordionComponent>
      <div
        className={
          "relative grow flex flex-col overflow-hidden border border-border rounded-b-xl min-h-[200px]"
        }
      >
        <div className="flex items-center px-5">
          <SwitchToggle
            isChecked={state === "portfolioValueByLastPrice"}
            onChange={changeHandler}
            labelBefore={"قیمت پایانی"}
            labelAfter={"آخرین قیمت"}
          />
          <Button
            label="دانلود نمودار"
            className="mr-auto bg-border my-1 !text-black"
            icon={<ArrowDownTrayIcon className="h-5 w-5" />}
            onClick={download}
          />
        </div>
        <div className="grow flex flex-col">
          {chartData?.result?.length ? (
            <AgChartsReact ref={ref} options={options} />
          ) : (
            <PresentationChartLineIcon className="h-60 w-60 m-auto text-border" />
          )}
        </div>
      </div>
    </div>
  );
}

export default withPermission(
  CustomerPortfo,
  ModuleIdentifier.PORTFO_customer_portfo
);
