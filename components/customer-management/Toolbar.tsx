import React from "react";
import AddNew from "./AddNew";
import Edit from "./Edit";
import Remove from "./Remove";
import {TBSBranches} from "./TBSBranches";
import {useRouter} from "next/router";
import {TBSMarketer} from "./TBSMarketer";
import {TBSReagents} from "./TBSReagents";

export default function Toolbar() {
    const router = useRouter()
    console.log(router)
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddNew />
                <Edit />
                <Remove />
                {router.asPath==='/customer-management/branch' ? <TBSBranches/>:null}
                {router.asPath==='/customer-management/marketer' ? <TBSMarketer/>:null}
                {router.asPath==='/customer-management/marketer' ? <TBSReagents/>:null}
            </div>
        </div>
    )
}