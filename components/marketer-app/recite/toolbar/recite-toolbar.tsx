import React from "react";
import EditMarketerRecite from "./rdit-marketer-recite";
import DeleteMarketerRecite from "./delete-marketer-recite";
import CalculationButton from "./calculate-button";
import EditAccounting from "./edit-accounting";
import EditFactorStatus from "./edit-factor-status";

export default function ReciteToolbar() {
  return (
    <div className={"border-x border-border"}>
      <div className={"toolbar p-2 "}>
        <CalculationButton />
        {/* <EditMarketerRecite /> */}
        <EditFactorStatus />
        <EditAccounting />
        <DeleteMarketerRecite />
      </div>
    </div>
  );
}
