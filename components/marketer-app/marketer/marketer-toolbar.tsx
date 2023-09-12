import React from "react";
import GRPCSyncButton from "./grpc-sync-button";

export default function MarketerToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <GRPCSyncButton />
            </div>
        </div>
    )
}