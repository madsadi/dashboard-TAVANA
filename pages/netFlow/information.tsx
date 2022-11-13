import React from "react";
import ClearingDateRange from "../../components/newFlow/information/ClearingDateRange";
import Box from "../../components/newFlow/information/Box";
import NoDateBox from "../../components/newFlow/information/NoDateBox";

export default function GetInformation() {

    return (
        <div className="flex flex-col h-full grow">
            <div className={'grid grid-cols-3 gap-4'}>
                <div className={'text-center z-10'}>
                    <Box api={'/Trade/buy-declaration'} title={'دریافت معاملات خرید'}/>
                </div>
                <div className={'text-center z-[9]'}>
                    <Box api={'/Trade/sell-declaration'} title={'دریافت معاملات فروش'}/>
                </div>
                <div className={'text-center z-[8]'}>
                    <Box api={'/Trade/rolling-clearing'} title={'دریافت تسویه های تهاتری'}/>
                </div>
                <div className={'text-center z-[7]'}>
                    <Box api={'/Trade/cleared-trade'} title={'دریافت معاملات تسویه شده'}/>
                </div>
                <div className={'text-center'}>
                    <NoDateBox api={'/Trade/rules'} title={'دریافت ضرایب کارمزد'}/>
                </div>
                <div className={'text-center'}>
                    <NoDateBox api={'/Trade/operation'} title={'دریافت استثنا ضرایب کارمزد'}/>
                </div>
                <div className={'text-center z-[6]'}>
                    <ClearingDateRange/>
                </div>
            </div>
        </div>
    )
}