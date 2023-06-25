import {ForwardedRef} from "react";

export interface SearchComponentTypes {
    onSubmit:Function,
    module:string,
    dynamicOptions?:any[],
    className?:string,
    extraClassName?:string,
    ref?:ForwardedRef<unknown>
}