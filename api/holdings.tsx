import axios from "axios";
import {MARKET_RULES_MANAGEMENT} from "./constants";

export const addNew = async (api:string,body:any) => {
    const add = await axios.post(`${MARKET_RULES_MANAGEMENT}/request/${api}/Add`,
        body,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return add;
}
export const edit = async (api:string,body:any) => {
    const edit = await axios.put(`${MARKET_RULES_MANAGEMENT}/request/${api}/Update`,
        body,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return edit;
}
export const remove = async (api:string,id:any) => {
    const remove = await axios.delete(`${MARKET_RULES_MANAGEMENT}/request/${api}/Delete`,
        {
            headers: {
                'Accept':'*/*'
            },
            data:{Id:id}
        }
    )
        .then(({data}) => {
            return data
        })
    return remove;
}
