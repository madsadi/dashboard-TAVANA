import {jalali} from "../functions/common-funcions";
import React from "react";

export default function DateCell({date}:{date:any}){
    let date_format = {date:'',time:''}
    if (date){
         date_format = jalali(date)
    }
    return(
        <>
            <span>{date ? date_format.date : '-'}</span>
            <span className={'ml-4'}>{date ? date_format.time : '-'}</span>
        </>
    )
}