import React from "react";
import EditRegStateComponent from "./EditRegState.component";
import {TBSComponent} from "./TBS.component";
import {InquirySejamStateComponent} from "./InquirySejamState.component";
import {SendMessageComponent} from "./SendMessage.component";

export default function UserRegToolbarComponent(){
    return(
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                <EditRegStateComponent/>
                <InquirySejamStateComponent/>
                <SendMessageComponent/>
                <TBSComponent/>
            </div>
        </div>
    )
}