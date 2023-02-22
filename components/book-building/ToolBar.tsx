import React from "react";
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";
import RemoveComponent from "./RemoveComponent";

export default function ToolBar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                <AddComponent />
                <EditComponent />
                <RemoveComponent />
            </div>
        </div>
    )
}