import React, { MouseEventHandler, ReactNode } from "react";
import { useSelector } from "react-redux";
import { isAllowed } from "../../functions/permission-utils";
import { Loader } from "../loader";

interface BaseType {
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined,
    allowed?: string[],
    disabled?: boolean,
    loading?: boolean,
    type?: "button" | "submit" | "reset" | undefined,
    icon?: ReactNode,
    isDefaultStyle?: boolean,
}

interface WithLabel extends BaseType {
    label: string,
    children?: never
}

interface WithChildren extends BaseType {
    label?: never,
    children: ReactNode
}

type ButtonType = WithLabel | WithChildren

export const Button = (props: ButtonType) => {
    const { label, children, className, onClick, allowed, disabled, loading, type = 'button', icon, isDefaultStyle = true } = props
    const { user_permissions: userPermissions } = useSelector((state: any) => state.appConfig)
    const defaultStyle = 'text-current border border-border'
    return (
        <button className={`relative text-sm space-x-2 shadow space-x-reverse flex justify-between items-center p-1 px-4 rounded transition-all hover:opacity-70 disabled:bg-gray-400 disabled:!cursor-not-allowed ${isDefaultStyle ? defaultStyle : null} ${className ? className + ' text-white' : null}`}
            onClick={onClick}
            disabled={!isAllowed({ userPermissions, whoIsAllowed: allowed }) || disabled || loading}
            type={type}
        >
            {loading ? <Loader /> : icon}
            {children || <p>{label}</p>}
        </button>
    )
}