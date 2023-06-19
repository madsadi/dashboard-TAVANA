import React from "react";
import AddMarketersRelations from "./AddMarketersRelations";
import EditMarketersRelations from "./EditMarketersRelations";
import DeleteMarketersRelations from "./DeleteMarketersRelations";

export default function RelationToolbar(){
    return(
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <AddMarketersRelations/>
                <EditMarketersRelations/>
                <DeleteMarketersRelations/>
            </div>
        </div>
    )
}