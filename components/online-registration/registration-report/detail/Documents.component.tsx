import UploadComponent from './Upload.compnent';
import {useEffect, useState} from "react";
import {getContent} from "../../../../api/users-management.api";
import DaisyAccordionComponent from "../../../common/components/DaisyAccordion.component";
import {useRouter} from "next/router";

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
        },
        {
            title: 'تصویر پشت کارت ملی',
            fileType:7,
            image: null
        }
    ]
    const [document,setDocuments] = useState<any>([])
    const router = useRouter()
    let dep:string|undefined = router.query?.detail?.[0]
    const queryData:string[]|undefined = dep?.split('&')
    let userId:any = queryData?.[0]?.split('=')[1]

    useEffect(()=>{
        const getDocument = async ()=>{
            await getContent(userId)
                .then((res)=> {
                    let _D = initialDocuments;
                    res?.result?.map((item:any)=>{
                        let _documentIndex = _D.findIndex((i:any)=>i.fileType===item.fileType)
                        if (_documentIndex>=0 && item?.content){
                            _D.splice(_documentIndex,1,{..._D[_documentIndex],...item,id:item.id,image:`data:image/${(item.extension).split('.')[1]};base64,`+item.content})
                        }
                    })
                    setDocuments(_D)
                })
        }
        getDocument()
    },[])

    return (
        <DaisyAccordionComponent title={'مدارک'}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white/50 backdrop-blur-md p-3 rounded-md">
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