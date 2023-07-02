import React from "react";
import InActive from "./toolbar/InActive";
import AddCommission from "./toolbar/Add";

export const CommissionToolbar=()=>{
    return(
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <InActive/>
                <AddCommission/>
            </div>
        </div>
    )
}