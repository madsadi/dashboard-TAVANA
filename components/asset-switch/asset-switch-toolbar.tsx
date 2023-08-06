import React from "react";
import { CreateRequest } from "./create-request";
import EditRequest from "./edit-request";

export default function AssetSwitchToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <CreateRequest />
                <EditRequest />
            </div>
        </div>
    )
}