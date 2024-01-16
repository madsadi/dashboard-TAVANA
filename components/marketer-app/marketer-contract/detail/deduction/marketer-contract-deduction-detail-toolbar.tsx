import React from "react";
import AddMarketerContractDetail from "./add-marketer-contract-detail";
import DeleteMarketerContractDetail from "./delete-marketer-contract-detail";
import EditMarketerContractDetail from "./edit-marketer-contract-detail";

export default function MarketerContractDeductionDetailToolbar(props: any) {
  const { selectedDeduction } = props;
  return (
    <div className={"border-x border-t border-border"}>
      <div className={"toolbar p-2 "}>
        <AddMarketerContractDetail />
        <EditMarketerContractDetail selected={selectedDeduction[0]} />
        <DeleteMarketerContractDetail selected={selectedDeduction[0]} />
      </div>
    </div>
  );
}
