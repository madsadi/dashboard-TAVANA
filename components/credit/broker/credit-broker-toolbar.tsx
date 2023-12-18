import { formatNumber } from "utils/common-funcions";
import React from "react";

export default function CreditBrokerToolbar(props: {
  data: { brokerTotalCreditLine: number; brokerFreeCreditLine: number };
}) {
  const { data } = props;

  return (
    <div className={"border-x border-border"}>
      <div className={"toolbar p-2"}>
        <div className="bg-gray-100 border border-border px-3 rounded-full mr-auto">
          کل اعتبار کارگزاری:
          <span className="mr-2">
            {data?.brokerTotalCreditLine
              ? formatNumber(
                  {
                    value: data?.brokerTotalCreditLine,
                  },
                  0
                )
              : "-"}
          </span>
        </div>
        <div className="bg-gray-100 border border-border px-3 rounded-full mr-3">
          اعتبار باقی مانده کارگزاری:
          <span className="mr-2">
            {data?.brokerFreeCreditLine
              ? formatNumber(
                  {
                    value: data?.brokerFreeCreditLine,
                  },
                  0
                )
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
