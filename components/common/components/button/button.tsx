import React, { MouseEventHandler } from "react";
import { Loader } from "../Loader";

interface ButtonType {
    className?: string,
    onClick: MouseEventHandler<HTMLButtonElement> | undefined,
    allowed?: string[],
    label: string,
    disabled?: boolean,
    loading?: boolean,
    type?: "button" | "submit" | "reset" | undefined
}

export const Button = (props: ButtonType) => {
    const { label, className, onClick, allowed, disabled, loading, type = 'button' } = props
    const UserPermissions: string[] = ['IdentityServerApi.UserManagement.Read']

    const isAllowed = () => {
        if (allowed !== undefined) {
            let isAllowed = allowed?.some((p: string) => UserPermissions.indexOf(p) >= 0)
            return !true
        }
    }

    return (
        <button className={"relative text-sm space-x-2 space-x-reverse flex justify-between items-center text-white p-1 px-4 rounded transition-all hover:opacity-70 disabled:bg-gray-400 disabled:!cursor-not-allowed " + className}
            onClick={onClick}
            disabled={isAllowed() || disabled || loading}
            type={type}
        >
            {loading ? <Loader /> : null}
            <p>{label}</p>
        </button>
    )
}