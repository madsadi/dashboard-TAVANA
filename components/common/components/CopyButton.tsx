import React from 'react';
import {LinkIcon} from "@heroicons/react/20/solid";
import {getLink} from "../../../api/users-management.api";
import {throwToast} from "../functions/notification";

export const CopyButton=({entity,id,condition}:{entity:string,id:string,condition:boolean})=>{

    const getLinkReq = async (id:string)=>{
        await getLink({marketerId:id})
            .then((res)=>{
                throwToast({type:'success',value:'لینک کپی شد'})
                navigator.clipboard.writeText(res?.result[entity])
            })
            .catch(()=>throwToast({type:'customError',value:'دوباره امتحان کنید'}))
    }

    return(<>
        {condition ? <button className={'flex mt-1 border border-border rounded-lg p-1 bg-white items-center h-6'} onClick={()=>getLinkReq(id)}><LinkIcon className={'h-4 w-4'}/> کپی </button>:null}
    </>
    )
}