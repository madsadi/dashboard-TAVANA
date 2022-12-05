import axios from "axios";
import {NETFLOW_BASE_URL} from "./constants";


export const fetchData = async (api:string,body: any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })

    const search = await axios.get(`${api}?${bodyToQuery.join('&')}`,
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
