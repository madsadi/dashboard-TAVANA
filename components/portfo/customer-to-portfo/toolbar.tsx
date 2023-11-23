import { SwitchToggle } from "components/common/components/button/switch-toggle";
import { formatNumber } from "utils/common-funcions";
import React, { useState } from "react";

export default function CustomerToPortfoToolbar(props: {
  toggleAction: (keyword: string, visible: boolean) => void;
  data: { totalCount: number; pagedData: any[] };
}) {
  const { toggleAction, data } = props;
  const [state, setState] = useState<"LastPrice" | "ClosingPrice">(
    "ClosingPrice"
  );

  const changeHandler = (e: any) => {
    toggleAction(e ? "ClosingPrice" : "LastPrice", false);
    toggleAction(e ? "LastPrice" : "ClosingPrice", true);
    setState(e ? "LastPrice" : "ClosingPrice");
  };

  return (
    <div className={"border-x border-border"}>
      <div className={"toolbar p-2"}>
        <SwitchToggle
          isChecked={state === "LastPrice"}
          onChange={changeHandler}
          labelBefore={"قیمت پایانی"}
          labelAfter={"قیمت آخرین  معامله"}
        />
        <div className="bg-gray-100 border border-border px-3 rounded-full mr-auto">
          تعداد کل مشتریان:
          <span className="mr-2">
            {data?.totalCount
              ? formatNumber(
                  {
                    value: data?.totalCount,
                  },
                  0
                )
              : "-"}
          </span>
        </div>
        <div className="bg-gray-100 border border-border px-3 rounded-full mr-3">
          ارزش کل پورتفو:
          <span className="mr-2">
            {data?.pagedData?.[0]
              ? formatNumber(
                  {
                    value:
                      data?.pagedData?.[0]["totalPortfolioValueBy" + state],
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
