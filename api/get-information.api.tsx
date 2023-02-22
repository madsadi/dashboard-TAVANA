import axios from "axios";
import {NETFLOW_BASE_URL} from "./constants";

export const activation = async (api:string,body:any) => {
    const create = await axios.post(`${NETFLOW_BASE_URL}${api}`,
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
    return create
}
export const activationWithOUtBody = async (api:string) => {
    return await axios.post(`${NETFLOW_BASE_URL}${api}`,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
}

