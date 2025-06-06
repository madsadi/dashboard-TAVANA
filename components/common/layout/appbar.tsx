import { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import {
    Bars3Icon,
} from '@heroicons/react/24/outline'
import { useRouter } from "next/router";
import BreadCrumbComponent from "./bread-crumb";
import SideBar from './side-bar';
import { Accessibility } from "./accessibility";

export default function Example() {
    const [open, setOpen] = useState(false)
    const router = useRouter();
    let query = router.query?.page?.[0]
    useEffect(() => {
        setOpen(false)
    }, [router.pathname, query])

    return (
        <Popover className="sticky top-0 right-0 w-full z-[100] bg-white border-b border-border">
            <div className="container">
                <div className="relative flex items-center justify-between py-2 md:justify-start">
                    <div className="flex space-x-1 space-x-reverse items-center">
                        <div
                            className={'p-1 border border-border rounded-md cursor-pointer hover:bg-border transition-all'}
                            onClick={() => setOpen(true)}>
                            <Bars3Icon className={'h-6 w-6'} />
                        </div>
                        <BreadCrumbComponent />
                    </div>
                    <Accessibility />
                </div>
            </div>
            <SideBar setOpen={setOpen} open={open} />
        </Popover>
    )
}
