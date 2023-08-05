import useSWR from "swr"
import { ONLINE_TRADING } from "../api/constants";

export function useSearchSymbol(endPoint: string) {
    const { data, mutate, error } = useSWR(`${ONLINE_TRADING}/api/request${endPoint}`, { revalidateOnMount: false })

    return {
        data: data, mutate: mutate, error: error, isLoading: !data && !error
    }
}