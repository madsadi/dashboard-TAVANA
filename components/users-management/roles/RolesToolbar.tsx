import React from "react";
import AddNew from "./AddNew";
import Edit from "./Edit";
import Permissions from "./Permissions";

export default function RolesToolbar(){
    return(
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddNew/>
                <Edit/>
                <Permissions/>
            </div>
        </div>
    )
}