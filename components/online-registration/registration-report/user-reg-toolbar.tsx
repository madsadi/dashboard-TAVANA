import React from "react";
import EditRegStateComponent from "./edit-reg-state";
import TBSComponent from "./tbs";
import InquirySejamStateComponent from "./inquiry-sejam-state";
import { SendMessageComponent } from "./send-message";
import AgreementToTbs from "./agreement-to-tbs";
import EditRefCode from "./edit-ref-code";
import BuildAgreementsFiles from "./build-agreements-files";
import EditBourseCode from "./edit-bourse-code";
import UpdateAgentInfo from "./update-agent-info";

export default function UserRegToolbarComponent() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar py-2'}>
                <EditRegStateComponent />
                <EditRefCode />
                <EditBourseCode />
                <UpdateAgentInfo />
                <InquirySejamStateComponent />
                <SendMessageComponent />
                <BuildAgreementsFiles />
                <TBSComponent />
                <AgreementToTbs />
            </div>
        </div>
    )
}