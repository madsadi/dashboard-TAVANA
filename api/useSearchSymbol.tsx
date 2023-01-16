import useSWR from "swr"
import {BASE_URL} from "./constants";

export function useSearchSymbol(endPoint:string){
    const {data,mutate,error}=useSWR(`${BASE_URL}/request${endPoint}`,{revalidateOnMount:false})

    return{
        data:data,mutate:mutate,error:error,isLoading:!data && !error
    }
}