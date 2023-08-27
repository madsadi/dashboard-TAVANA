import {jalali} from "../functions/common-funcions";
import React from "react";

export default function DateCell({date,hideTime}:{date:any,hideTime?:boolean}){
    let date_format = {date:'',time:''}
    if (date){
         date_format = jalali(date)
    }
    
    return(
        <>
            <span>{date ? date_format.date : '-'}</span>
            {hideTime ? null:<span className={'ml-4'}>{date ? date_format.time : '-'}</span>}
        </>
    )
}