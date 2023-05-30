import Edit from "../instrumentType/Edit";
import AddNew from "../instrumentType/AddNew";
import Remove from "../instrumentType/Remove";
import React from "react";

export default function InstrumentTypeToolbar(){
    return(
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddNew/>
                <Edit/>
                <Remove/>
            </div>
        </div>
    )
}