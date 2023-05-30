import React from "react";
import AddNew from "../market-rules-management/AddNew";
import Edit from "../market-rules-management/Edit";

export default function RulesToolbar() {

    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <AddNew/>
                <Edit/>
            </div>
        </div>
    )
}