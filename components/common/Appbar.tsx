import {useEffect, useState} from 'react'
import {Popover} from '@headlessui/react'
import {
    Bars3Icon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import {useAuth} from "react-oidc-context";
import Router from "next/router";
import BreadCrumbComponent from "./BreadCrumb";
import SideBar from './SideBar';
import Time from "./Time";

export default function Example() {
    const [open, setOpen] = useState(false)

    const auth = useAuth();

    return (
        <Popover className="fixed top-0 w-full z-10 bg-white border-b border-border">
            <div className="container">
                <div className="flex items-center justify-between py-2 md:justify-start">
                    <div className="flex space-x-1 space-x-reverse items-center">
                        <div className={'p-1 border border-border rounded-md cursor-pointer hover:bg-border transition-all'}>
                            <Bars3Icon className={'h-6 w-6'} onClick={()=>setOpen(true)}/>
                        </div>
                        <BreadCrumbComponent/>
                    </div>
                    <div className="sm:flex hidden mr-auto light:text-black space-x-1 space-x-reverse divide-x-2 divide-x-reverse divide-slate-400/25">
                        <Time/>
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
