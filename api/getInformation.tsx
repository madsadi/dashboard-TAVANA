import axios from "axios";
import {BASE_URL} from "./constants";

export const activattion = async (api:string,body:any) => {
    const create = await axios.post(`${BASE_URL}${api}`,
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
