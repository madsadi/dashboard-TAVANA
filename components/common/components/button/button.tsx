import React, {MouseEventHandler} from "react";

interface ButtonType{
    className?:string,
    onClick: MouseEventHandler<HTMLButtonElement> | undefined,
    allowed?:string[],
    label:string
}
export const Button=(props:ButtonType)=>{
    const {label,className,onClick,allowed}=props
    const UserPermissions:string[] = ['IdentityServerApi.UserManagement.Read']

    const notAllowed = ()=>{
        let hide = allowed?.some((p:string)=>UserPermissions.indexOf(p)>=0)
        return !hide
    }

    return(
        <button className={"text-sm text-white p-1 px-2 rounded md:px-10 transition-all hover:opacity-70 disabled:bg-gray-400 disabled:!cursor-not-allowed "+className}
                onClick={onClick}
                disabled={notAllowed()}
        >
            {label}
        </button>
    )
}