import { formatNumber, formatNumberSecond } from "utils/common-funcions";
import React from "react";

export default function CreditKPIToolbar(props: {
  data: {
    totalAssignedCredits: number;
    totalUsedCredits: number;
    totalCommissions: number;
    kPI1Value: number;
  };
}) {
  const { data } = props;

  const valueFormatter = (value: any) => {
    if (value) {
      const digit = `${value}`.split(".");
      if (digit?.[1]?.length > 2) {
        return formatNumberSecond(+digit[0]) + "." + digit[1]?.slice(0, 2);
      } else {
        return formatNumberSecond(+digit[0]) + "." + (digit[1] || "0");
      }
    } else {
      return value;
    }
  };

  return (
    <div className={"border-x border-border"}>
      <div className={"toolbar p-2"}>
        <div className="bg-gray-100 border border-border px-3 rounded-full mr-auto">
          مقدار کل اعتبار اختصاص داده شده:
          <span className="mr-2" dir="ltr">
            {data?.totalAssignedCredits
              ? formatNumber(
                  {
                    value: data?.totalAssignedCredits,
                  },
                  0
                )
              : "-"}
          </span>
        </div>
        <div className="bg-gray-100 border border-border px-3 rounded-full mr-3">
          مقدار کل اعتبار استفاده شده:
          <span className="mr-2" dir="ltr">
            {data?.totalUsedCredits
              ? formatNumber(
                  {
                    value: data?.totalUsedCredits,
                  },
                  0
                )
              : "-"}
          </span>
        </div>
        <div className="bg-gray-100 border border-border px-3 rounded-full mr-3">
          مقدار کل کارمزدها:
          <span className="mr-2" dir="ltr">
            {data?.totalCommissions
              ? formatNumber(
                  {
                    value: data?.totalCommissions,
                  },
                  0
                )
              : "-"}
          </span>
        </div>
        <div className="bg-gray-100 border border-border px-3 rounded-full mr-3">
          مقدار عملکرد اعتبار کارگزاری:
          <span className="mr-2" dir="ltr">
            {data?.kPI1Value ? valueFormatter(data?.kPI1Value) : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
