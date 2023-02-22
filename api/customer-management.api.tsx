import axios from "axios";
import {MARKET_RULES_MANAGEMENT} from "./constants";


export const customerManagement = async (api:string,body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==undefined && body[`${item}`]!==null && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const list = await axios.get(`${MARKET_RULES_MANAGEMENT}/request/${api}/Search?${bodyToQuery.join('&')}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return list
}

