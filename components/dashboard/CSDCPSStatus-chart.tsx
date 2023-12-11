import React, { memo } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

const CSDCPSStatusChart = (props: { data: any; onChartReady: () => void }) => {
  const { data, onChartReady } = props;

  const option1: AgChartOptions = {
    title: {
      text: " تغییرات پورتفو سپرده گذاری",
      fontFamily: "Yekan Bakh",
    },
    data: data,
    legend: {
      item: {
        label: {
          fontFamily: "Yekan Bakh",
        },
      },
    },
    tooltip: {
      class: "tooltipClassName",
    },
    series: [
      {
        type: "bar",
        xKey: "effectiveDate",
        yKey: "countBuyChange",
        yName: "تعداد خرید",
        fill: "green",
        stroke: "transparent",
        stacked: true,
      },
      {
        type: "bar",
        xKey: "effectiveDate",
        yKey: "countSellChange",
        yName: "تعداد فروش",
        stacked: true,
        stroke: "transparent",
        fill: "red",
      },
      {
        type: "bar",
        xKey: "effectiveDate",
        yKey: "countAssetSwitchIn",
        yName: "تعداد تغییر ناظر ورودی",
        stroke: "transparent",
        stacked: true,
      },
      {
        type: "bar",
        xKey: "effectiveDate",
        yKey: "countAssetSwitchOut",
        yName: "تعداد تغییر ناظر خروجی",
        stroke: "transparent",
        stacked: true,
      },
      {
        type: "bar",
        xKey: "effectiveDate",
        yKey: "countFreezed",
        yName: "تعداد فریز شده",
        stacked: true,
        stroke: "transparent",
      },
      {
        type: "bar",
        xKey: "effectiveDate",
        yKey: "countUnFreezed",
        yName: "تعداد آزاد",
        stacked: true,
        stroke: "transparent",
      },
      {
        type: "bar",
        xKey: "effectiveDate",
        yKey: "countException",
        yName: "تعداد نا مشخص",
        stacked: true,
        stroke: "transparent",
      },
    ],
  };

  return (
    <AgChartsReact
      options={option1}
      className={"ag-rtl"}
      onChartReady={onChartReady}
    />
  );
};

export default memo(CSDCPSStatusChart);
