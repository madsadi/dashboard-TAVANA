import React from "react";
import AddNew from "../customer-management/AddNew";
import Edit from "../customer-management/Edit";

export default function RulesToolbar() {

    return (
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                {/*<Edit/>*/}
                <AddNew/>
            </div>
        </div>

    )
}