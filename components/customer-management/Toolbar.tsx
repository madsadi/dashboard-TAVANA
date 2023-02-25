import React from "react";
import AddNew from "./AddNew";
import Edit from "./Edit";
import Remove from "./Remove";

export default function Toolbar() {

    return (
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                <AddNew />
                <Edit />
                <Remove />
            </div>
        </div>
    )
}