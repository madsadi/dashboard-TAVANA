import React from 'react';
import UserInfo from "../../components/profile/user-info";

export default function Profile() {
    return (
        <div className={'flex flex-col h-full flex-1'}>
            {/*<ProfileNavigation/>*/}
            <UserInfo />
        </div>
    )
}