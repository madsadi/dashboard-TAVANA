import React from "react";
import EditRegStateComponent from "./EditRegState.component";

export default function UserRegToolbarComponent(){
    return(
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                <EditRegStateComponent/>
            </div>
        </div>
    )
}