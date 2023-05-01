import useSWR from "swr"
import {BASE_URL} from "../api/constants";

export function useSearchSymbol(endPoint:string){
    const {data,mutate,error}=useSWR({url:`${BASE_URL}/request${endPoint}`},{revalidateOnMount:false})

    return{
        data:data,mutate:mutate,error:error,isLoading:!data && !error
    }
}