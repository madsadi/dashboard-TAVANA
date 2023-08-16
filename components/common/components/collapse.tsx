import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function CollapseComponent({children,title}:{children:any,title:string}){

    return(
        <div className="relative collapse border border-border rounded-lg ">
            <input type="checkbox" className="peer w-full h-[40px] hover:bg-gray-100" />
            <div className="collapse-title bg-transparent flex items-center justify-between p-2 peer-checked:hidden ">
                <h4>{title}</h4>
                <ChevronLeftIcon className={'h-6 w-6'} />
            </div>
            <div className="collapse-title bg-transparent hidden justify-between p-2 peer-checked:flex transition-all">
                <h4>{title}</h4>
                <ChevronDownIcon className={'h-6 w-6'} />
            </div>
            <div className="collapse-content bg-transparent">
                {children}
            </div>
        </div>
    )
}
