import axios from "axios";
import {NETFLOW_BASE_URL} from "./constants";

export const lastTradeDate = async (side:number) => {
    const last = await axios.get(`${NETFLOW_BASE_URL}/Report/last-trade-date?Side=${side}`,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return last
}
export const countFetch = async (date:string,api:string) => {
    const buy = await axios.post(`${NETFLOW_BASE_URL}/Trade/${api}`,
        {
            date:date
        },
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return buy
}
