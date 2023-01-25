import React from "react";
import AddNew from "./AddNew";
import Edit from "./Edit";
import Remove from "./Remove";

export default function Toolbar({gridRef}:{gridRef:any}) {

    return (
        <div className={'border-x border-border'}>
            <div className={'flex p-2'}>
                <AddNew gridRef={gridRef}/>
                <Edit gridRef={gridRef}/>
                <Remove gridRef={gridRef}/>
            </div>
        </div>
    )
}