import React from "react";
import AddMarketerRectie from "./AddMarketerRectie";
import EditMarketerRecite from "./EditMarketerRecite";
import DeleteMarketerRecite from "./DeleteMarketerRecite";

export default function ReciteToolbar(){
    return(
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <AddMarketerRectie/>
                <EditMarketerRecite/>
                <DeleteMarketerRecite/>
            </div>
        </div>
    )
}