import React, {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {searchUser} from "../../../api/users-management.api";
import IdentityComponent from "../../../components/online-registration/registration-report/detail/Identity.component";
import JobInfoComponent from "../../../components/online-registration/registration-report/detail/JobInfo.component";
import BankComponent from "../../../components/online-registration/registration-report/detail/Bank.component";
import LegalPersonShareholdersComponent
    from "../../../components/online-registration/registration-report/detail/LegalPersonShareholders.component";
import LegalPersonStakeholdersComponent
    from "../../../components/online-registration/registration-report/detail/LegalPersonStakeholders.component";
import BourseCodeComponent
    from "../../../components/online-registration/registration-report/detail/BourseCode.component";
import AgentComponent from "../../../components/online-registration/registration-report/detail/Agent.component";
import AddressesComponent from "../../../components/online-registration/registration-report/detail/Addresses.component";
import EconomicComponent from "../../../components/online-registration/registration-report/detail/Economic.component";
import AgreementComponent from "../../../components/online-registration/registration-report/detail/AgreementComponent";
import EditRegStateComponent from "../../../components/online-registration/registration-report/EditRegState.component";
import {
    InquirySejamStateComponent
} from "../../../components/online-registration/registration-report/InquirySejamState.component";
import {SendMessageComponent} from "../../../components/online-registration/registration-report/SendMessage.component";
import {TBSComponent} from "../../../components/online-registration/registration-report/TBS.component";
import DocumentsComponent from "../../../components/online-registration/registration-report/detail/Documents.component";

export const OnlineRegDetailContext = createContext({})
export default function Detail() {
    const [data, setData] = useState<any>(null)
    const router = useRouter()
    let dep = router.query?.detail?.[0]
    const onSubmit = async (e: any, query: any) => {
        e?.preventDefault()
        await searchUser(query)
            .then((res: any) => {
                setData(res?.result?.pagedData[0]);
            })
    };

    useEffect(() => {
        if (dep) {
            const queryData = dep.split('&')
            let _query: any = {};

            _query['userId'] = queryData[0].split('=')[1];
            _query['StartDate'] = queryData[1].split('=')[1];
            _query['EndDate'] = queryData[2].split('=')[1];
            onSubmit(null, _query)
        }
    }, [dep])

    return (
        <OnlineRegDetailContext.Provider value={{data}}>
            <div className={'w-full'}>
                <div className={'border border-border rounded-lg mb-5'}>
                    <div className={'flex p-2 space-x-2 space-x-reverse'}>
                        <EditRegStateComponent/>
                        <InquirySejamStateComponent/>
                        <TBSComponent/>
                    </div>
                </div>
                {data ? <div className={'w-full space-y-3'}>
                    <DocumentsComponent/>
                    <IdentityComponent/>
                    <JobInfoComponent/>
                    <BankComponent/>
                    <LegalPersonShareholdersComponent/>
                    <LegalPersonStakeholdersComponent/>
                    <BourseCodeComponent/>
                    <AgentComponent/>
                    <AddressesComponent/>
                    <EconomicComponent/>
                    <AgreementComponent/>
                </div> : null}
            </div>
        </OnlineRegDetailContext.Provider>
    )
}