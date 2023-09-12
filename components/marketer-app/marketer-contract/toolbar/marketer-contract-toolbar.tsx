import React from "react";
import AddMarketerContract from "./add-marketer-contract";
import DeleteMarketerContract from "./delete-marketer-contract";
import EditMarketerContract from "./edit-marketer-contract";

export default function MarketerContractToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <AddMarketerContract />
                <EditMarketerContract />
                <DeleteMarketerContract />
            </div>
        </div>
    )
}