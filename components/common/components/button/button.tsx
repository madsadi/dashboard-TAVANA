import React, { MouseEventHandler, ReactNode } from "react";
import { useSelector } from "react-redux";
import { isAllowed } from "../../functions/permission-utils";
import { Loader } from "../Loader";

interface ButtonType {
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined,
    allowed?: string[],
    label: string,
    disabled?: boolean,
    loading?: boolean,
    type?: "button" | "submit" | "reset" | undefined,
    icon?: ReactNode
}

export const Button = (props: ButtonType) => {
    const { label, className, onClick, allowed, disabled, loading, type = 'button', icon } = props
    const { user_permissions: userPermissions } = useSelector((state: any) => state.appConfig)

    return (
        <button className={"relative text-sm space-x-2 space-x-reverse flex justify-between items-center text-white p-1 px-4 rounded transition-all hover:opacity-70 disabled:bg-gray-400 disabled:!cursor-not-allowed " + className}
            onClick={onClick}
            disabled={!isAllowed({ userPermissions, whoIsAllowed: allowed }) || disabled || loading}
            type={type}
        >
            {loading ? <Loader /> : icon}
            <p>{label}</p>
        </button>
    )
}