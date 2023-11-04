import { Dispatch, ForwardedRef } from "react";
import { FilterItemType } from "./constant-filters.types";

export interface CategoryResultModalTypes {
    setOpen: Dispatch<boolean>,
    open: boolean,
    queryHandler: Function,
    data: any
}


export interface QueryType {
    [key: string]: any
}

interface ServicePropertyType {
    [key: string]: {
        module: string,
        permissions: string[]
    }[]
}

interface SearchPropertyType {
    filters: FilterItemType[],
    initialValue: {
        [key: string]: any
    },
}

type child = FilterItemType | { name: string, children: FilterItemType[] }
interface ToolbarPropertyType {
    [key: string]: child[]
}

export interface FilterTreeType {
    [key: string]: {
        services: ServicePropertyType,
        search?: SearchPropertyType,
        toolbar?: ToolbarPropertyType
    }
}

export interface EnumType {
    id: number,
    code: number,
    enTitle?: string,
    title: string
}
