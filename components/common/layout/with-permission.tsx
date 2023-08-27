import filters from "constants/filters";
import NotAllowed from "pages/not-allowed";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAllowed, prepare } from "../functions/permission-utils";

export function withPermission(Component:any,module:'string'){
    return function WithPermissionWrapper(props:any){
        const [mounted,setMounted]=useState(false)
        const {user_permissions}=useSelector((state:any)=>state.appConfig)
        const hasPermission = isAllowed({userPermissions:user_permissions,whoIsAllowed:prepare(filters[module]?.services)})

        useEffect(() => {
            setMounted(true)
        }, [])
    
    
        if (!mounted) {
            return null
        }

        if(hasPermission){
            return <Component {...props}/>
        }else{
            return <NotAllowed />
        }
    }
}