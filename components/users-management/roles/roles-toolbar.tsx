import React from "react";
import AddNew from "./add-new";
import Edit from "./edit";
import Permissions from "./permissions-";

export default function RolesToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddNew />
                <Edit />
                <Permissions />
            </div>
        </div>
    )
}