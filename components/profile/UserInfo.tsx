import React,{useState} from "react";
import {
    DevicePhoneMobileIcon,
    EnvelopeIcon,
    QrCodeIcon,
    UserIcon,
    IdentificationIcon,
    CalendarDaysIcon,
    FingerPrintIcon
} from "@heroicons/react/24/outline";
import {jalali} from "../common/functions/common-funcions";
import {EditInfoModal} from "./EditInfoModal";
import {useSelector} from "react-redux";
import useMutation from "../../hooks/useMutation";
import {IDP} from "../../api/constants";
import {throwToast} from "../common/functions/notification";
import {PasswordModal} from "./Password.modal";
import {ChangeMobileNumber} from "./ChangeMobileNumber";
import useSWR from "swr";

export default function UserInfo() {
    const {data} = useSWR(`${IDP}/api/users/GetCurrentUserInfo`,{revalidateOnMount:true})
    const [open,setOpen]=useState(false)
    const [passwordModal,setPasswordModal]=useState(false)
    const fields: any = [
        {
            id: 0,
            title: 'نام و نام خانوادگی:',
            icon: <UserIcon className={'h-4 min-w-4'}/>,
            info: data?.result?.firstName + " " + data?.result?.lastName
        },
        {
            id: 1,
            title: 'نام کاربری:',
            icon: <FingerPrintIcon className={'h-4 min-w-4'}/>,
            info: data?.result?.userName
        },
        {
            id: 2,
            title: 'ایمیل:',
            icon: <EnvelopeIcon className={'h-4 min-w-4'}/>,
            info: data?.result?.email
        },
        {
            id: 3,
            title: 'تلفن همراه:',
            icon: <DevicePhoneMobileIcon className={'h-4 min-w-4'}/>,
            info: data?.result?.phoneNumber,
            utility:<ChangeMobileNumber/>
        },
        {
            id: 4,
            title: 'کدملی:',
            icon: <IdentificationIcon className={'h-4 min-w-4'}/>,
            info: data?.result?.nationalId
        },
        {
            id: 5,
            title: 'تاریخ تولد:',
            icon: <CalendarDaysIcon className={'h-4 min-w-4'}/>,
            info: data?.result?.birthdate ? jalali(data?.result?.birthdate).date : '-'
        },
        {
            id: 6,
            title: 'ورود دو عاملی:',
            icon: <QrCodeIcon className={'h-4 min-w-4'}/>,
            info: <ToggleButton/>
        }
    ]

    return (
        <div className={'lg:w-1/3 w-full border border-border rounded-lg overflow-hidden'}>
            <div>
                {fields.map((field: any) => {
                    return (
                        <div className={'flex even:bg-gray-200 p-2'} key={field.id}>
                            <div className={'flex flex-1 px-2'}>
                                <div className={'bg-gray-400 rounded-full p-1 ml-3'}>
                                    {field.icon}
                                </div>
                                <span className={'min-w-fit'}>{field.title}</span>
                            </div>
                            <div className={'min-w-fit flex items-center'}>
                                {field?.utility ? field?.utility:null}
                                <div>
                                    {data && field.info}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className={'button bg-orange-500 m-2 mx-4'} onClick={()=>setOpen(true)}>
                ویرایش حساب کاربری
            </button>
            <button className={'button bg-green-500'} onClick={()=>setPasswordModal(true)}>
               تغییر رمز عبور
            </button>
            <PasswordModal setOpen={setPasswordModal} open={passwordModal}/>
            <EditInfoModal setOpen={setOpen} open={open}/>
        </div>
    )
}

const ToggleButton = ()=>{
    const {userInfo:data} = useSelector((state:any)=>state.userManagementConfig)
    const {mutate} = useMutation({url:`${IDP}/api/account/2fa`,method:"PUT"})
    const [enable,isEnable] = useState(data?.twoFactorEnabled)

    const twoFactorHandler = async ()=>{
        await mutate({}, {enabled:!enable})
            .then(()=>isEnable(!enable))
            .catch((err)=>throwToast({type:'error',value:err}))
    }

    return(
        <button className={'relative w-[50px] h-[24px] flex bg-white p-1 rounded-full h-full border-2 border-white shadow-[0_0_0_1px_#eee] mr-2 overflow-hidden'} onClick={twoFactorHandler}>
            <div className={`rounded-full w-1/2 h-[90%] z-0 absolute right-0 top-1/2 -translate-y-1/2 transition-all ${!enable ? '-translate-x-full bg-red-500':'translate-x-0 bg-green-600 '}`}/>
        </button>
    )
}