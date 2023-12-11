import { SwitchToggle } from "components/common/components/button/switch-toggle";
import React, { useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import moment from "jalali-moment";
import { AgPieSeriesTooltipRendererParams } from "ag-charts-community";

export default function CSDIPortfoComparisonToolbar(props: {
  toggleAction: (keyword: string, visible: boolean) => void;
  data: any;
}) {
  const { toggleAction, data } = props;
  const [state, setState] = useState<"lastPrice" | "closingPrice">("lastPrice");

  const option1: any = {
    data: data?.result?.pagedData || [],
    title: {
      text: data?.date?.first
        ? `${moment(data?.date?.first).locale("fa").format("YYYY-MM-DD")}`
        : "",
      fontFamily: "Yekan Bakh",
    },
    tooltip: {
      class: "tooltipClassName",
    },
    legend: {
      position: "right", // 'bottom', 'left', 'top'
      item: {
        label: {
          fontWeight: "bold",
          fontFamily: "Yekan Bakh",
        },
      },
    },
    series: [
      {
        type: "pie",
        angleKey:
          state === "lastPrice"
            ? "firstnetValuebyLastPrice"
            : "firstnetValuebyClosingPrice",
        calloutLabelKey: "faInsCode",
        calloutLabel: {
          fontFamily: "Yekan Bakh",
        },
        sectorLabelKey:
          state === "lastPrice"
            ? "firstnetValuebyLastPrice"
            : "firstnetValuebyClosingPrice",
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          fontFamily: "Yekan Bakh",
        },
        tooltip: {
          enabled: true,
          renderer: function (params: AgPieSeriesTooltipRendererParams) {
            return {
              content:
                state === "lastPrice"
                  ? params.datum.firstLastPricePercentage.toFixed(2) + "%"
                  : params.datum.firstClosingPricePercentage.toFixed(2) + "%",
            };
          },
        },
      },
    ],
  };
  const option2: any = {
    data: data?.result?.pagedData || [],
    title: {
      text: data?.date?.second
        ? `${moment(data?.date?.second).locale("fa").format("YYYY-MM-DD")}`
        : "",
      fontFamily: "Yekan Bakh",
    },
    tooltip: {
      class: "tooltipClassName",
    },
    legend: {
      position: "right", // 'bottom', 'left', 'top'
      item: {
        label: {
          fontWeight: "bold",
          fontFamily: "Yekan Bakh",
        },
      },
    },
    series: [
      {
        type: "pie",
        angleKey:
          state === "lastPrice"
            ? "secondnetValuebyLastPrice"
            : "secondnetValuebyClosingPrice",
        calloutLabelKey: "faInsCode",
        calloutLabel: {
          fontFamily: "Yekan Bakh",
        },
        sectorLabelKey:
          state === "lastPrice"
            ? "secondnetValuebyLastPrice"
            : "secondnetValuebyClosingPrice",
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
        },
        tooltip: {
          enabled: true,
          renderer: function (params: AgPieSeriesTooltipRendererParams) {
            return {
              content:
                state === "lastPrice"
                  ? params.datum.secondLastPricePercentage.toFixed(2) + "%"
                  : params.datum.secondClosingPricePercentage.toFixed(2) + "%",
            };
          },
        },
      },
    ],
  };

  const changeHandler = (e: any) => {
    toggleAction(e ? "closingPrice" : "lastPrice", false);
    toggleAction(e ? "lastPrice" : "closingPrice", true);
    setState(e ? "lastPrice" : "closingPrice");
  };

  return (
    <div className={"border-x border-border"}>
      <div className={"p-2"}>
        <div className="flex items-center justify-between">
          <SwitchToggle
            isChecked={state === "lastPrice"}
            onChange={changeHandler}
            labelBefore={"قیمت پایانی"}
            labelAfter={"قیمت آخرین  معامله"}
          />
          <AgChartsReact options={option1} />
          <AgChartsReact options={option2} />
        </div>
      </div>
    </div>
  );
}
