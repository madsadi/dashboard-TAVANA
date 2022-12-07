import {countFetch, lastTradeDate} from "../../api/dashboard";
import {lazy, useEffect, useState} from "react";
import {jalali} from "../commonFn/commonFn";
const AnimatedNumbers = lazy(()=>import('react-animated-numbers'))

export default function LastTradeDate(){
    const [date,setDate]=useState<any>({0:'',1:''})
    const [counts,setCounts]=useState<any>({buyCount:'',sellCount:''})

    const count = async (date:string,index:number)=>{
        let _counts = counts
        await countFetch(date,index>1 ? 'sell-declaration-count':'buy-declaration-count')
            .then(res=>{
                _counts[index>1 ? 'sellCount':'buyCount'] = res
                setCounts({...counts,..._counts})
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
        <div className={'absolute top-[51px] w-full right-0 border border-border bg-yellow-100 flex space-x-reverse space-x-5 p-1 text-sm divide-x divide-x-reverse'}>
            {Object.values(date).filter((item:any)=>item).map((item:any,index:number)=>{
                return (
                    <div key={index} className={`pr-3 ${index>0 ? 'text-red-600':'text-green-600'}`}>
                        <div className={'flex'}>
                            <span className={'flex'}>
                                <span className={'ml-2'}>{index>0 ? 'تعداد معامله فروش:':'تعداد معامله خرید:'}</span>
                                <AnimatedNumbers
                                    includeComma
                                    animateToNumber={index > 0 ? counts.sellCount : counts.buyCount}
                                    fontStyle={{fontSize: 14}}
                                    configs={[{"mass":1,"tension":130,"friction":40},{"mass":2,"tension":140,"friction":40},{"mass":3,"tension":130,"friction":40}]}
                                />
                            </span>
                            <span className={'mr-10'}>
                                <span className={'ml-2'}>{index>0 ? 'زمان آخرین معامله فروش:':'زمان آخرین معامله خرید:'}</span>
                                {jalali(item).date}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}