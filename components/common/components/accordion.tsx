import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import React, { ReactNode } from "react";
import { useState } from "react";

export interface accordionPropsType {
    children: ReactNode,
    title?: string,
    className?: string,
    isOpen?: boolean
}
export default function AccordionComponent({ children, title = 'جستجو', className, isOpen = true }: accordionPropsType) {
    const [isChecked, setChecked] = useState(isOpen)

    return (
        <div className={`relative collapse border border-border rounded-t-lg z-[10] ${isChecked ? '!overflow-visible' : 'overflow-hidden '} ${className}`}>
            <input type="checkbox" checked={isChecked} className="peer w-full h-full" aria-label="accordion" aria-labelledby="accordion" onChange={(e) => setChecked(e.target.checked)} />
            <div className={`collapse-title bg-border flex items-center px-2 py-2 peer-checked:hidden`}>
                <div className={'min-w-7'}><ChevronLeftIcon className={'h-7 w-7 '} /></div>
                <h4 className={'text-right'}>{title}</h4>
            </div>
            <div className={`collapse-title bg-border hidden px-2 py-2 peer-checked:flex transition-all`}>
                <div className={'min-w-7'}><ChevronDownIcon className={'h-7 w-7 '} /></div>
                <h4 className={'text-right'}>{title}</h4>
            </div>
            <div className="collapse-content peer-checked:pt-8 peer-checked:border-t border-border bg-transparent overflow-visible">
                {children}
            </div>
        </div>
    )
}
