import React from "react";
import AddMarketerContractCoeffDetail from "./add-marketer-contract-coeff-detail";
import DeleteMarketerContractCoefDetail from "./delete-marketer-contract-coeff-detail";
import EditMarketerContractCoeffDetail from "./edit-marketer-contract-coeff-detail";

export default function MarketerContractCoefficientDetailToolbar() {
    return (
        <div className={'border-x border-t border-border'}>
            <div className={'toolbar p-2 '}>
                <AddMarketerContractCoeffDetail />
                <EditMarketerContractCoeffDetail />
                <DeleteMarketerContractCoefDetail />
            </div>
        </div>
    )
}