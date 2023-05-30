import React from "react";
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";
import RemoveComponent from "./RemoveComponent";

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