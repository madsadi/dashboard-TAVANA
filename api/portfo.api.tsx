import axios from "axios";
import {MARKET_RULES_MANAGEMENT} from "./constants";

export const getPortfolioBook = async (body:any) => {
    let bodyToQuery:any=[];
    Object.keys(body).map((item:any)=>{
        if (body[`${item}`]){
            bodyToQuery.push(`${item}=`+body[`${item}`])
        }
    })
    const portfolioBook = await axios.get(`${MARKET_RULES_MANAGEMENT}/request/SearchIntradayPortfolioBook?${bodyToQuery.join('&')}`,
        {
            headers: {
                'Accept':'*/*'
            }
        }
    )
        .then(({data}) => {
            return data
        })
    return portfolioBook;
}
