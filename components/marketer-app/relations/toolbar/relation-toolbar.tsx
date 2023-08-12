import React from "react";
import AddMarketersRelations from "./add-marketers-relations";
import EditMarketersRelations from "./edit-marketers-relations";
import DeleteMarketersRelations from "./delete-marketers-relations";

export default function RelationToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <AddMarketersRelations />
                <EditMarketersRelations />
                <DeleteMarketersRelations />
            </div>
        </div>
    )
}