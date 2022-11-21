import axios from "axios";
import {MARKET_RULES_MANAGEMENT} from "./constants";

export const tradingSession = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const trades = await axios.get(`${MARKET_RULES_MANAGEMENT}/request/GetTradingSessionStatus?${bodyToQuery.join('&')}`,
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
export const tradingDayTimeTable = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const trades = await axios.get(`${MARKET_RULES_MANAGEMENT}/request/GetTradingDayTimetable?${bodyToQuery.join('&')}`,
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
