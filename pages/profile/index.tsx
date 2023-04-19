import ProfileNavigation from "../../components/profile/ProfileNavigation";
import UserInfo from "../../components/profile/UserInfo";

export default function Profile(){
    return(
        <div className={'flex flex-col h-full flex-1'}>
            {/*<ProfileNavigation/>*/}
            <UserInfo/>
        </div>
    )
}