import {useEffect, useState} from 'react'
import {Popover} from '@headlessui/react'
import {
    Bars3Icon,
    ArrowRightIcon,
    ArrowLeftOnRectangleIcon, UserCircleIcon
} from '@heroicons/react/24/outline'
import {useAuth} from "react-oidc-context";
import Router, {useRouter} from "next/router";
import BreadCrumbComponent from "./BreadCrumb";
import SideBar from './SideBar';
import Time from "../components/Time";
import Link from "next/link";
import {userInfo} from "../../../store/user-management.config";
import {useDispatch} from "react-redux";
import useQuery from "../../../hooks/useQuery";
import {IDP} from "../../../api/constants";

export default function Example() {
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState<{lastName:string,firstName:string}>({lastName:'',firstName:''})
    const {fetchAsyncData} = useQuery({url:`${IDP}/users/GetCurrentUserInfo`})
    const auth = useAuth();
    const router = useRouter();
    let query = router.query?.page?.[0]
    const dispatch = useDispatch()

    useEffect(() => {
        setOpen(false)
    }, [router.pathname, query])

    useEffect(() => {
        fetchAsyncData()
            .then((res) => {
                setInfo(res?.data?.result);
                dispatch(userInfo(res?.data?.result))
            })
    }, [])

    return (
        <Popover className="fixed top-0 w-full z-10 bg-white border-b border-border">
            <div className="container">
                <div className="flex items-center justify-between py-2 md:justify-start">
                    <div className="flex space-x-1 space-x-reverse items-center">
                        <div
                            className={'p-1 border border-border rounded-md cursor-pointer hover:bg-border transition-all'}
                            onClick={() => setOpen(true)}>
                            <Bars3Icon className={'h-6 w-6'}/>
                        </div>
                        {(router.pathname.startsWith('/portfo/[[...query]]') || router.pathname.startsWith('/online-registration/registration-report/[...detail]')) && <button
                            className={'p-1 border border-border rounded-md cursor-pointer hover:bg-border transition-all'}
                            onClick={() => router.back()}><ArrowRightIcon className={'h-6 w-6'}/></button>}
                        <BreadCrumbComponent/>
                    </div>
                    <div
                        className="sm:flex hidden mr-auto light:text-black space-x-1 space-x-reverse divide-x-2 divide-x-reverse divide-slate-400/25">
                        <Time/>
                        <div>
                            <Link className={'flex items-center px-3 cursor-pointer'} href={'/profile'}>
                                {info?.firstName + " " + info?.lastName}
                                <UserCircleIcon className={'h-5 w-5 mr-2'}/>
                            </Link>
                        </div>
                        <button className={'flex pr-2'} onClick={() => {
                            void auth.signoutRedirect({id_token_hint: auth.user?.id_token})
                            Router.push('/')
                        }}>
                            خروج
                            <ArrowLeftOnRectangleIcon className={'h-5 w-5 light:text-black mr-2'}/>
                        </button>
                    </div>
                </div>
            </div>
            <SideBar setOpen={setOpen} open={open}/>
        </Popover>
    )
}
