import axios from "axios";
import {NETFLOW_BASE_URL} from "./constants";


export const clearedTradesReportSearch = async (api:string,body: any) => {
    let bodyToQuery = body.map((item:any)=> {
        if (Object.values(item)[0]) {
            return `&${Object.keys(item)[0]}=${Object.values(item)[0]}`
        }
    }).join('')

    const search = await axios.get(`${NETFLOW_BASE_URL}${api}?${bodyToQuery}`,
        {
            headers: {
                'Accept': '*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return search
}
