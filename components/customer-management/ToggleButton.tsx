import {useState} from "react";
import {toast} from "react-toastify";
import useMutation from "../../hooks/useMutation";
import {ADMIN_GATEWAY} from "../../api/constants";
import {throwToast} from "../common/functions/notification";

export default function ToggleButton(props: { api:string,data: { isActive: boolean,id:string } }) {
    const [isChecked,setIsChecked] = useState(props.data.isActive)
    const {mutate} = useMutation({url:`${ADMIN_GATEWAY}/api/request/${props.api}/UpdateActivationStatus`,method:"PUT"})
    const changeStatus = async ()=>{
        await mutate({id:props.data.id,isActive:!isChecked})
            .then((res)=> {
                setIsChecked(!isChecked);
                toast.success(`${res?.data?.result?.message}`)
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