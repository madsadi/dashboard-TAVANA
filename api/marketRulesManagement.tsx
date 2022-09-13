import axios from "axios";
import {MARKET_RULES_MANAGEMENT} from "./constants";

export const filedList = async () => {
    const create = await axios.get(`${MARKET_RULES_MANAGEMENT}/GetFieldsList`,
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
    const create = await axios.get(`http://cluster.tech1a.co:9020/${api}`,
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
    const add = await axios.post(`${MARKET_RULES_MANAGEMENT}/AddRule`,
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
    const update = await axios.put(`${MARKET_RULES_MANAGEMENT}/UpdateRule`,
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
    let bodyToQuery = body.map((item:any)=> {
        if (Object.values(item)[0]) {
            return `&${Object.keys(item)[0]}=${Object.values(item)[0]}`
        }
    }).join('')

    const list = await axios.get(`${MARKET_RULES_MANAGEMENT}/GetRules?${bodyToQuery}`,
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
