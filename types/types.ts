import { Dispatch, ForwardedRef } from "react";

export interface SearchComponentTypes {
    onSubmit: Function,
    module: string,
    dynamicOptions?: any[],
    className?: string,
    loading?: boolean,
    extraClassName?: string,
    initialQuery?: { [key: string]: string | number | boolean },
    ref?: ForwardedRef<unknown>
}

export interface CategoryResultModalTypes {
    setOpen: Dispatch<boolean>,
    open: boolean,
    queryHandler: Function,
    data: any
}