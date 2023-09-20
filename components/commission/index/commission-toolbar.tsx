import React from "react";
import AddCommission from "./toolbar/add-new";
import InActive from "./toolbar/deactive";
import EditCommission from "./toolbar/edit-commission";

const CommissionToolbar = () => {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddCommission />
                <EditCommission />
                <InActive />
            </div>
        </div>
    )
}
export default CommissionToolbar