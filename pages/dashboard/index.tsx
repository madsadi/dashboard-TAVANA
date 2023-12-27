import { CSDCPSStatusBox } from "components/dashboard/CSDCPS-box";
import React from "react";
import LastTradeDate from "../../components/dashboard/last-trade-date";

export default function Index() {
  return (
    <div className="grow gap-4 flex flex-col">
      <div className="grid grid-cols-2 gap-4">
        <CSDCPSStatusBox />
        <LastTradeDate />
      </div>
    </div>
  );
}
