import React, { useState, useEffect } from "react";
import { RangeDateInput } from "components/common/components/inputs/range-date-input";
import CSDCPSStatusChart from "./CSDCPSStatus-chart";
import { ADMIN_GATEWAY } from "api/constants";
import useQuery from "hooks/useQuery";
import moment from "jalali-moment";

export const CSDCPSStatusBox = () => {
  const [query, setQuery] = useState({ startDate: "", endDate: "" });
  const [rowData, setRowData] = useState([]);
  const { fetchAsyncData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetCSDCPSStatus`,
  });

  const dateChangeHandler = (query: { startDate: string; endDate: string }) => {
    setQuery(query);
    if (query.startDate && query.endDate) {
      fetchAsyncData(query).then((res: any) => {
        const _data = res.data?.result.pagedData.map((item: any) => {
          return {
            ...item,
            effectiveDate: moment(item.effectiveDate)
              .locale("fa")
              .format("YYYY/MM/DD"),
          };
        });
        setRowData(_data);
      });
    }
  };

  return (
    <div className="border border-border rounded-lg shadow p-4">
      <div className="max-w-[250px]">
        <RangeDateInput
          query={query}
          setQuery={dateChangeHandler}
          item={{ name: "تاریخ بازه", title: "date", type: "date" }}
        />
      </div>
      <div className="relative">
        <CSDCPSStatusChart
          data={rowData}
          onChartReady={() =>
            dateChangeHandler({
              startDate: moment()
                .locale("en")
                .subtract(5, "day")
                .format("YYYY-MM-DD"),
              endDate: moment().locale("en").format("YYYY-MM-DD"),
            })
          }
        />
      </div>
    </div>
  );
};
