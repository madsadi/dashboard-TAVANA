import React from "react";
import AddNew from "./AddNew";
import Edit from "./Edit";
import Permissions from "./Permissions";

export default function RolesToolbar(){
    return(
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                <AddNew/>
                <Edit/>
                <Permissions/>
            </div>
        </div>
    )
}