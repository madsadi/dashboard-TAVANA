import React from "react";
import AddComponent from "./add-new";
import EditComponent from "./edit";
import RemoveComponent from "./remove";

export default function ToolBar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddComponent />
                <EditComponent />
                <RemoveComponent />
            </div>
        </div>
    )
}