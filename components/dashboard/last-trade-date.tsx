import { lazy, useEffect, useState } from "react";
import { jalali } from "../../utils/common-funcions";
import useMutation from "../../hooks/useMutation";
import { NETFLOW } from "../../api/constants";
import useQuery from "../../hooks/useQuery";
import { AgChartsReact } from "ag-charts-react";
import { AgPieSeriesTooltipRendererParams } from "ag-charts-community";

export default function LastTradeDate() {
  const { mutate: sellCount } = useMutation({
    url: `${NETFLOW}/Trade/sell-declaration-count`,
  });
  const { mutate: buyCount } = useMutation({
    url: `${NETFLOW}/Trade/buy-declaration-count`,
  });
  const { fetchAsyncData } = useQuery({
    url: `${NETFLOW}/Report/last-trade-date`,
  });
  const [counts, setCounts] = useState<any>([]);
  const _counts = [...counts];

  const count = async (date: string, index: number) => {
    if (index > 1) {
      await sellCount({ date: date }).then((res) => {
        const index = counts.findIndex((item: any) => item.typeEng === "sell");
        _counts.splice(index, 1, {
          type: "فروش",
          typeEng: "sell",
          count: res?.data,
          date: date,
        });
        setCounts((prev: any) => [...prev, ..._counts]);
      });
    } else {
      await buyCount({ date: date }).then((res) => {
        const index = counts.findIndex((item: any) => item.typeEng === "buy");
        _counts.splice(index, 1, {
          type: "خرید",
          typeEng: "buy",
          count: res?.data,
          date: date,
        });
        setCounts((prev: any) => [...prev, ..._counts]);
      });
    }
  };

  useEffect(() => {
    const fetchLastTradeDate = async (index: number) => {
      await fetchAsyncData({ Side: index }).then((res) => {
        count(jalali(res?.data).date.replaceAll("/", ""), index);
        if (index === 1) {
          fetchLastTradeDate(index + 1);
        }
      });
    };

    fetchLastTradeDate(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const option1: any = {
    data: counts,
    title: {
      text: "گزارشات معاملات سپرده گذاری",
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
    overLayer: {
      noData: {
        text: "اطلاعاتی موجود نیست",
      },
    },
    series: [
      {
        fills: counts.map((item: any) =>
          item.typeEng === "buy" ? "green" : "red"
        ),
        type: "pie",
        angleKey: "count",
        calloutLabelKey: "type",
        calloutLabel: {
          fontFamily: "Yekan Bakh",
        },
        sectorLabelKey: "count",
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
                params.datum.count +
                params.datum.type +
                " در تاریخ " +
                params.datum.date,
            };
          },
        },
      },
    ],
  };

  return (
    <div className="border border-border rounded-lg shadow p-4">
      <AgChartsReact options={option1} />
    </div>
  );
}
