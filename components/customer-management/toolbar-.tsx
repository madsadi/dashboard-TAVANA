import React from "react";
import AddNew from "./add-new";
import Edit from "./edit-";
import Remove from "./remove-";
import { TBSBranches } from "./tbs-branches";
import { TBSMarketer } from "./tbs-marketer";
import { TBSReagents } from "./tbs-reagents";
import usePageStructure from "../../hooks/usePageStructure";
import { CreateRefCode } from "./create-ref-code";

export default function Toolbar() {
    const { page } = usePageStructure()

    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddNew />
                <Edit />
                <Remove />
                {page.api === 'branch' ? <TBSBranches /> : null}
                {page.api === 'marketer' ? <TBSMarketer /> : null}
                {page.api === 'marketer' ? <TBSReagents /> : null}
                {page.api === 'marketer' ? <CreateRefCode /> : null}
            </div>
        </div>
    )
}