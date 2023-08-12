import React from "react";
import InActive from "./toolbar/deactive";
import AddCommission from "./toolbar/add";
import EditCommission from "./toolbar/edit-commission";

const CommissionToolbar = () => {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <InActive />
                <AddCommission />
                <EditCommission />
            </div>
        </div>
    )
}
export default CommissionToolbar