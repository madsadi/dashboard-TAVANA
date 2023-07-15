import React, {useContext, useEffect, useState} from "react";
import { jalali} from "../../../common/functions/common-funcions";
import {
    OnlineRegDetailContext
} from "../../../../pages/online-registration/registration-report/[...detail]";
import DaisyAccordionComponent from "../../../common/components/DaisyAccordion.component";
import useQuery from "../../../../hooks/useQuery";
import {FILE_SERVER, SEJAM_GATEWAY} from "../../../../api/constants";
import {useRouter} from "next/router";
import Modal from "../../../common/layout/Modal";

export default function AgreementComponent() {
    const [lists,setLists]=useState([])
    const [selected,setSelected]=useState('')
    const {data} = useContext<any>(OnlineRegDetailContext)
    const agreement = JSON.parse(data?.metaData)?.Agreement
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId:any = queryData?.[0]?.split('=')[1]
    const {data:agreements} = useQuery({url:`${FILE_SERVER}/api/admin-file-manager/get-content`,params:{UserId:userId,FileOwnerSoftware:1},revalidateOnMount:true})
    const {data:enums} = useQuery({url:`${SEJAM_GATEWAY}/api/request/AgreementFileTypeMapping`,revalidateOnMount:true})

    const structureAgreements=(contents:any,metaData:any)=>{
        let a = contents?.filter((item:any)=>item.extension==='.pdf').map((item:any)=>{
            let file = metaData?.find((x:any)=>enums?.result.find((i:any)=>i.agreementCode===x?.Code)?.fileType===item.fileType)
            if (file){
                return {...item,Name:file?.Name,IsRequired:file?.IsRequired,ApprovalDateTime:file?.ApprovalDateTime,Status:file?.Status}
            }else return
        })
        setLists(a)
    }

    useEffect(()=>{
        if (agreements?.result && enums?.result)
        structureAgreements(agreements?.result,agreement)
    },[agreements,enums])

    const modalHandler=(state:boolean)=>{
        if (!state){
            setSelected('')
        }
    }

    return (
        <>
            {
                lists?.length ? <DaisyAccordionComponent title={'قرار داد ها'}>
                    <div className={'grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4'}>
                        {lists?.map((item: any) => {
                            return (
                                <div
                                    className="border border-dashed border-gray-200 p-2"
                                    key={item?.id}>
                                    <div className={'flex space-x-2 space-x-reverse'}>
                                        <p>نام قرارداد:</p>
                                        <p className={'font-bold'}>{item?.Name || 'ثبت نشده'}</p>
                                    </div>
                                    <div className={'flex space-x-2 space-x-reverse'}>
                                        <p>اجباری:</p>
                                        <p className={'font-bold'}>{item?.IsRequired ? 'بله':'خیر'}</p>
                                    </div>
                                    <div className={'flex space-x-2 space-x-reverse'}>
                                        <p>تاریخ تایید:</p>
                                        <p className={'font-bold'}>{item?.ApprovalDateTime ? jalali(item?.ApprovalDateTime)?.date:''}</p>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <div className={'flex space-x-2 space-x-reverse mb-1'}>
                                            <a className={'text-white rounded text-center grow bg-lime-400 py-1'} href={`data:application/pdf;base64,${item?.content}`}
                                               download={item?.Name}>دانلود</a>
                                            <button className={'text-white rounded grow bg-red-400 py-1'} onClick={()=>setSelected(item?.id)}>نمایش</button>
                                        </div>
                                        {/*<object className={'grow'} data={`data:application/pdf;base64,${item?.content}`} type="application/pdf" width="100%" height="100%">*/}
                                        {/*    <p>{item?.Name}</p>*/}
                                        {/*</object>*/}
                                        <Modal title={item?.Name} open={selected===item?.id} setOpen={modalHandler} ModalWidth={'max-w-5xl max-h-[700px]'}>
                                            <object className={'grow h-[600px]'} data={`data:application/pdf;base64,${item?.content}`} width="100%" height="100%">
                                                <p>{item?.Name}</p>
                                            </object>
                                        </Modal>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </DaisyAccordionComponent> : null
            }
        </>)
}