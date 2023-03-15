import {useState} from "react";
import {toast} from "react-toastify";
import {changeRoleStatus} from "../../../api/users-management.api";

export default function RoleToggleButton(props: { data: { id: string,isActive:boolean } }) {
    const [isChecked,setIsChecked] = useState(props.data.isActive)

    const changeStatus = async ()=>{
        await changeRoleStatus(isChecked ? 'deactive':'active',props.data.id)
            .then(()=> {
                setIsChecked(!isChecked);
                toast.success(`وضعیت نقش عوض شد`)
            })
            .catch((err)=>toast.error(`${err?.response?.data?.error?.message}`))
    }

    return (
        <label className="relative inline-flex items-center cursor-pointer" >
            <input type="checkbox" value={''} className="sr-only peer" checked={isChecked} onChange={changeStatus}/>
            <div
                className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
        </label>
    )
}