import React,{useState} from "react";
import useMutation from "../../../hooks/useMutation";
import {USERS} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";

export default function RoleToggleButton(props: { data: { id: string,isActive:boolean } }) {
    const [isChecked,setIsChecked] = useState(props.data.isActive)
    const {mutate} = useMutation({url:`${USERS}/roles/${isChecked ? 'deactive':'active'}`})

    const changeStatus = async ()=>{
        await mutate({},{id:props.data.id})
            .then(()=> {
                setIsChecked(!isChecked);
                throwToast({type:'success',value:`وضعیت نقش عوض شد`})
            })
            .catch((err)=>throwToast({type:'error',value:err}))
    }

    return (
        <label className="relative inline-flex items-center cursor-pointer" >
            <input type="checkbox" value={''} className="sr-only peer" checked={isChecked} onChange={changeStatus}/>
            <div
                className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
        </label>
    )
}