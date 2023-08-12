import Edit from "./edit-";
import AddNew from "./add-new";
import Remove from "./remove";
import React from "react";

export default function InstrumentTypeToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddNew />
                <Edit />
                <Remove />
            </div>
        </div>
    )
}