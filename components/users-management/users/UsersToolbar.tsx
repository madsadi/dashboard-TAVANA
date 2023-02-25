import React from "react";
import Edit from "./Edit";
import AddNew from "./AddNew";
import Password from "./Password";
import LockOut from "./LockOut";
import UserRole from "./UserRole";

export default function UsersToolbar(){
    return(
        <div className={'border-x border-border'}>
            <div className={'flex p-2 space-x-2 space-x-reverse'}>
                <AddNew/>
                <Edit/>
                <Password/>
                <LockOut/>
                <UserRole/>
            </div>
        </div>
    )
}