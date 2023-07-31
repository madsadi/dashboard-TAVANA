import React from "react";
import EditRegStateComponent from "./EditRegState.component";
import TBSComponent from "./TBS.component";
import InquirySejamStateComponent from "./InquirySejamState.component";
import { SendMessageComponent } from "./SendMessage.component";
import AgreementToTbs from "./AgreementToTbs";
import EditRefCode from "./EditRefCode";
import BuildAgreementsFiles from "./BuildAgreementsFiles";

export default function UserRegToolbarComponent() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2 '}>
                <EditRegStateComponent />
                <InquirySejamStateComponent />
                <SendMessageComponent />
                <BuildAgreementsFiles />
                <EditRefCode />
                <TBSComponent />
                <AgreementToTbs />
            </div>
        </div>
    )
}