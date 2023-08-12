import React from "react";
import Edit from "./edit";
import AddNew from "./add-new";
import Password from "./password";
import LockOut from "./lock-out";
import UserRole from "./user-role";

export default function UsersToolbar() {
    return (
        <div className={'border-x border-border'}>
            <div className={'toolbar p-2'}>
                <AddNew />
                <Edit />
                <Password />
                <LockOut />
                <UserRole />
            </div>
        </div>
    )
}