import Image from "next/image";
import {jalali} from "../../common/functions/common-funcions";

export default function UserDetailComponent({data}:{data:any}){
    console.log(data)

    return(
        <div className={'m-5'}>
            <div className={'mb-3 p-2 flex align-items-center bg-black-alpha-10 border-round-sm'}>
                <div className={'h-6 w-6'}>
                    <Image width={48} height={48} src="/icons/avatar.svg" alt="avatar"/>
                </div>
                <div className={'mr-4'}>
                    <div className={'flex space-x-5 space-x-reverse'}>
                        <div>
                            تاریخ تغییر رمز عبور: <span className={'font-semibold'}>{jalali(data?.passwordSetDate).date}</span>
                        </div>
                        <div>
                            تاریخ ایجاد:<span className={'font-semibold'}>{jalali(data?.insertDateTime).date}</span>
                        </div>
                        <div>
                            تاریخ ویرایش: <span className={'font-semibold'}>{jalali(data?.updateDateTime).date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}