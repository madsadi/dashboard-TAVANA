import Edit from "../instrumentType/Edit";
import AddNew from "../instrumentType/AddNew";
import Remove from "../instrumentType/Remove";
import React from "react";

export default function InstrumentTypeToolbar(){
    return(
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                <AddNew/>
                <Edit/>
                <Remove/>
            </div>
        </div>
    )
}