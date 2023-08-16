import {
    CalendarDaysIcon,
    ClipboardIcon,
    WalletIcon,
    QuestionMarkCircleIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import Link from "next/link";

export default function ProfileNavigation() {
    const profilePages: any = [
        {
            id: 0,
            title: 'حساب کاربری',
            icon: <UserIcon className={'h-5 w-5'}/>,
            url: '/profile'
        }
    ]

    const route = useRouter()
    return (
        <div className={'dark:bg-box bg-white shadow-md dark:shadow-none p-3 flex justify-between'}>
            <div className={'flex space-x-reverse space-x-10'}>
                {profilePages.map((page: any) => {
                    return (
                            <Link href={page.url} key={page.id} className={`flex space-x-reverse space-x-1 ${route.pathname===page.url ? 'text-active border-b-2 border-active' : ''}`}>
                                {page.icon}
                                <span>{page.title}</span>
                            </Link>
                    )
                })}
            </div>
            {/*<div className={'flex space-x-reverse space-x-1'}>*/}
            {/*    <QuestionMarkCircleIcon className={'h-5 w-5'}/>*/}
            {/*    <span>راهنمای سامانه آنلاین پلاس</span>*/}
            {/*</div>*/}
        </div>
    )
}