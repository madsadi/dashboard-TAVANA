import React from "react";
import AddMarketerRectie from "./add-marketer-rectie";
import EditMarketerRecite from "./rdit-marketer-recite";
import DeleteMarketerRecite from "./delete-marketer-recite";

export default function ReciteToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <AddMarketerRectie />
                <EditMarketerRecite />
                <DeleteMarketerRecite />
            </div>
        </div>
    )
}