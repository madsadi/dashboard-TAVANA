import React from "react";
import AddMarketerContractCoeffDetail from "./add-marketer-contract-coeff-detail";
import DeleteMarketerContractCoefDetail from "./delete-marketer-contract-coeff-detail";
import EditMarketerContractCoeffDetail from "./edit-marketer-contract-coeff-detail";
import AddMarketerContractCoeffBaseType from "./add-marketer-contract-coeff-base-type";

export default function MarketerContractCoefficientDetailToolbar(props: any) {
  const { selectedCoeff } = props;
  return (
    <div className={"border-x border-t border-border"}>
      <div className={"toolbar p-2 "}>
        <AddMarketerContractCoeffDetail />
        <AddMarketerContractCoeffBaseType />
        <EditMarketerContractCoeffDetail selected={selectedCoeff[0]} />
        <DeleteMarketerContractCoefDetail selected={selectedCoeff[0]} />
      </div>
    </div>
  );
}
