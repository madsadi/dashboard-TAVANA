import axios from "axios";
import {COMMISSION_BASE_URL} from "./constants";

export const commissionSearch = async (body: any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==undefined && body[`${item}`]!==null && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const search = await axios.get(`${COMMISSION_BASE_URL}/CommissionInstrumentType/Search?${bodyToQuery.join('&')}`,
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
