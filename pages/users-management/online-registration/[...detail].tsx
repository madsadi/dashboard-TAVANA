import React, {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {searchUser} from "../../../api/users-management.api";
import IdentityComponent from "../../../components/users-management/online-registration/Identity.component";
import JobInfoComponent from "../../../components/users-management/online-registration/JobInfo.component";
import BankComponent from "../../../components/users-management/online-registration/Bank.component";
import LegalPersonShareholdersComponent
    from "../../../components/users-management/online-registration/LegalPersonShareholders.component";
import LegalPersonStakeholdersComponent from "../../../components/users-management/online-registration/LegalPersonStakeholders.component";
import BourseCodeComponent from "../../../components/users-management/online-registration/BourseCode.component";
import AgentComponent from "../../../components/users-management/online-registration/Agent.component";
import AddressesComponent from "../../../components/users-management/online-registration/Addresses.component";
import EconomicComponent from "../../../components/users-management/online-registration/Economic.component";
import AgreementComponent from "../../../components/users-management/online-registration/AgreementComponent";

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
            {data ? <div className={'w-full space-y-3'}>
                <IdentityComponent/>
                <JobInfoComponent/>
                <BankComponent/>
                <LegalPersonShareholdersComponent/>
                <LegalPersonStakeholdersComponent/>
                <BourseCodeComponent/>
                <AgentComponent/>
                <AddressesComponent/>
                <EconomicComponent />
                <AgreementComponent />
            </div>:null}
        </OnlineRegDetailContext.Provider>
    )
}