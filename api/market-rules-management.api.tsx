import axios from "axios";
import {MARKET_RULES_MANAGEMENT} from "./constants";

export const filedList = async () => {
    const create = await axios.get(`${MARKET_RULES_MANAGEMENT}/request/GetFieldsList`,
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
export const remoteUrl = async (api:string) => {
    const create = await axios.get(api,
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
export const addRule = async (body:any) => {
    const add = await axios.post(`${MARKET_RULES_MANAGEMENT}/request/AddRule`,
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
    return add
}
export const updateRule = async (body:any) => {
    const update = await axios.put(`${MARKET_RULES_MANAGEMENT}/request/UpdateRule`,
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
    return update
}
export const rulesList = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!==undefined && body[`${item}`]!==null && body[`${item}`]!==''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const list = await axios.get(`${MARKET_RULES_MANAGEMENT}/request/GetRules?${bodyToQuery.join('&')}`,
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
