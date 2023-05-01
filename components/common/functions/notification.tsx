import {toast} from "react-toastify";

export const throwToast = ({type='error',value=''}:{type:string,value:any})=>{
    switch (type){
        case 'success':
            toast.success(`${value}`)
            break;
        case 'error':
            toast.error(`${value?.response?.data?.error?.message}`)
            break;
        case 'customError':
            toast.error(`${value}`)
            break;
        case 'warning':
            toast.warning(`${value}`)
            break;
    }
}