import React from "react";
import AddNew from "./add-new";
import Edit from "./edit";

export default function RulesToolbar() {

    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <AddNew />
                <Edit />
            </div>
        </div>
    )
}