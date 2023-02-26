import React from "react";
import dynamic from "next/dynamic";
const ClearingDateRange = dynamic(() => import('../../components/newFlow/information/ClearingDateRange'))
const Box = dynamic(() => import('../../components/newFlow/information/Box'))
const NoDateBox = dynamic(() => import('../../components/newFlow/information/NoDateBox'))

export default function GetInformation() {

    const info = [
        {
            title:'دریافت معاملات خرید',
            api:'/Trade/buy-declaration',
            date:true
        },
        {
            title:'دریافت معاملات فروش',
            api:'/Trade/sell-declaration',
            date:true
        },
        {
            title:'دریافت تسویه های تهاتری',
            api:'/Trade/rolling-clearing',
            date:true
        },
        {
            title:'دریافت معاملات تسویه شده',
            api:'/Trade/cleared-trade',
            date:true
        },
        {
            title:'دریافت ضرایب کارمزد',
            api:'/Trade/rules',
            date:false
        },
        {
            title:'دریافت استثنا ضرایب کارمزد',
            api:'/Trade/operation',
            date:false
        },
    ]
    return (
        <div className="flex flex-col h-full grow">
            <div className={'grid grid-cols-3 gap-4'}>
                {
                    info.map((item:{api:string,title:string,date:boolean})=>{
                        return(
                            <div key={item.title} className={`text-center`}>
                                {item.date ? <Box api={item.api} title={item.title}/>:<NoDateBox api={item.api} title={item.title}/>}
                            </div>
                        )
                    })
                }
                <div className={'text-center z-[6]'}>
                    <ClearingDateRange/>
                </div>
            </div>
        </div>
    )
}