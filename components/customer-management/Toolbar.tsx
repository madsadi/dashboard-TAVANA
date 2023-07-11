import React from "react";
import AddNew from "./AddNew";
import Edit from "./Edit";
import Remove from "./Remove";
import {TBSBranches} from "./TBSBranches";
import {TBSMarketer} from "./TBSMarketer";
import {TBSReagents} from "./TBSReagents";

export interface CustomerManagementPropsType {
        api: string,
        columnsDefStructure: any,
        searchFilter: string,
    }
export default function Toolbar(props: { page:CustomerManagementPropsType }) {
    const {page} = props
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddNew />
                <Edit />
                <Remove />
                {page.api==='branch' ? <TBSBranches/>:null}
                {page.api==='marketer' ? <TBSMarketer/>:null}
                {page.api==='marketer' ? <TBSReagents/>:null}
            </div>
        </div>
    )
}