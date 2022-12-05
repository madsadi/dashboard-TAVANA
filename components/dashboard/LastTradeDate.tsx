import {countFetch, lastTradeDate} from "../../api/dashboard";
import {useEffect, useState} from "react";
import {jalali} from "../commonFn/commonFn";

export default function LastTradeDate(){
    const [date,setDate]=useState<any>({1:'',2:''})
    const [counts,setCounts]=useState<any>({buyCount:'',sellCount:''})

    const count = async (date:string,index:number)=>{
        let _counts = counts
        await countFetch(date,index>1 ? 'sell-declaration-count':'buy-declaration-count')
            .then(res=>{
                _counts[index>1 ? 'sell':'buy'] = res
                setCounts(_counts)
            })
    }
    const fetchLastTradeDate=async (index:number)=>{
        let _date:any = date
        await lastTradeDate(index)
            .then(res=> {
                _date[index] = res
                setDate({...date,..._date})
                count((jalali(res).date).replaceAll('/',''),index)
                if (index===1){
                    fetchLastTradeDate(index+1)
                }
            })
    }

    useEffect(()=>{
        fetchLastTradeDate(1)
    },[])

    return(
        <div className={'border border-border bg-yellow-100 rounded-2xl flex space-x-reverse space-x-5 p-2'}>
            {Object.values(date).filter((item:any)=>item).map((item:any,index:number)=>{
                return (
                    <div key={index} className={index>0 ? 'text-red-600':'text-green-600'}>
                        <label className={'block'}>{index>0 ? 'زمان آخرین معامله فروش:':'زمان آخرین معامله خرید:'}</label>
                        {jalali(item).date}
                    </div>
                )
            })}
        </div>
    )
}