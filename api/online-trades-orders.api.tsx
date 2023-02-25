import axios from "axios";
import {MARKET_RULES_MANAGEMENT} from "./constants";

export const getTrade = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const trades = await axios.get(`${MARKET_RULES_MANAGEMENT}/request/SearchTrades?${bodyToQuery.join('&')}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return trades;
}

export const getOrders = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]!== undefined && body[`${item}`]!== null && body[`${item}`]!== ''){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const orders = await axios.get(`${MARKET_RULES_MANAGEMENT}/request/SearchOrders?${bodyToQuery.join('&')}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return orders;
}
export const apiCallToGetData = async (api:string,body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const orders = await axios.get(`${api}${bodyToQuery.join('&')}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return orders;
}

export const groupCancel = async (body:any) => {
    const create = await axios.post(`${MARKET_RULES_MANAGEMENT}/GlobalCancel/CancelAllOrderForInstrumentGroup`,
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
export const cancelOrder = async (body:any) => {
    const create = await axios.post(`${MARKET_RULES_MANAGEMENT}/request/Cancel`,
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
export const insCancel = async (body:any) => {
    const create = await axios.post(`${MARKET_RULES_MANAGEMENT}/GlobalCancel/CancelAllOrderForInstrument`,
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
export const getCanceledOrders = async (query:any) => {
    let bodyToQuery:any=[];
    Object.keys(query).map((item:any)=>{
        if (query[`${item}`]){
            bodyToQuery.push(`${item}=`+query[`${item}`])
        }
    })
    const orders = await axios.get(`${MARKET_RULES_MANAGEMENT}/GlobalCancel/SearchGlobalCancelOrder?${bodyToQuery.join('&')}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return orders
}

