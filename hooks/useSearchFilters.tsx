import filters from '../dictionary/filters'

export function useSearchFilters(module:string,feature?:string){
    const dictionary:any = filters;

    return{filters:dictionary[module]?.search?.filters,initialValue:dictionary[module]?.search?.initialValue,toolbar:feature ? dictionary[module]?.toolbar?.[feature]:null}
}