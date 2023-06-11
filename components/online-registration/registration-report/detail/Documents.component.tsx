import React,{useEffect, useState} from "react";
import UploadComponent from './Upload.compnent';
import DaisyAccordionComponent from "../../../common/components/DaisyAccordion.component";
import {useRouter} from "next/router";
import useQuery from "../../../../hooks/useQuery";
import {FILE_SERVER} from "../../../../api/constants";

export default function DocumentsComponent() {

    let initialDocuments: any = [
        {
            title: 'تصویر امضاء دریافت شده از سجام',
            fileType:1,
            image: null
        },
        {
            title: 'تصویر صفحه اول شناسنامه',
            fileType:3,
            image: null
        },
        {
            title: 'تصویر صفحه توضیحات شناسنامه',
            fileType:4,
            image: null
        },
        {
            title: 'تصویر روی کارت ملی',
            fileType:6,
            image: null
        }
    ]
    const [document,setDocuments] = useState<any>([])
    const {fetchAsyncData} = useQuery({url:`${FILE_SERVER}/api/admin-file-manager/get-content`})
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId:any = queryData?.[0]?.split('=')[1]

    useEffect(()=>{
        const getDocument = async ()=>{
            await fetchAsyncData({userId:userId,fileOwnerSoftware:1})
                .then((res)=> {
                    let _D = initialDocuments;
                    res?.data?.result?.map((item:any)=>{
                        let _documentIndex = _D.findIndex((i:any)=>i.fileType===item.fileType)
                        if (_documentIndex>=0 && item?.content){
                            _D.splice(_documentIndex,1,{..._D[_documentIndex],...item,id:item.id,image:`data:image/${(item.extension).split('.')[1]};base64,`+item.content})
                        }
                    })
                    setDocuments(_D)
                })
                .catch((err)=>console.log(err.message,'err'))
        }
        getDocument()
    },[])

    return (
        <DaisyAccordionComponent title={'مدارک'}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/50 backdrop-blur-md p-3 rounded-md">
                {
                    document.map((item: any) => {
                        return (
                            <UploadComponent item={item} documents={document} setDocs={setDocuments} key={item.fileType} />
                        )
                    })
                }
            </div>
        </DaisyAccordionComponent>
    )
}