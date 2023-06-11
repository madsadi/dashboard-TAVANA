import React, {Dispatch, useEffect, useState} from 'react';
import ImageUploading, {ImageType} from 'react-images-uploading';
import {
    CloudArrowUpIcon,
    LockOpenIcon,
    LockClosedIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image';
import {toast} from "react-toastify";
import {uploadPhoto} from "../../../../api/users-management.api";
import {useRouter} from "next/router";
import {throwToast} from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import {FILE_SERVER} from "../../../../api/constants";
import Modal from "../../../common/layout/Modal";
import InnerImageZoom from 'react-inner-image-zoom'

export default function UploadComponent({
                                            item,
                                            documents,
                                            setDocs
                                        }: { item: any, documents: any, setDocs: Dispatch<any> }) {
    const {mutate: upload} = useMutation({url: `${FILE_SERVER}/api/admin-file-manager/upload`})
    const {mutate: unlockFile} = useMutation({url: `${FILE_SERVER}/api/admin-file-manager/unlock-file`})
    const {mutate: lockFile} = useMutation({url: `${FILE_SERVER}/api/admin-file-manager/lock-file`})
    const [lock, setLock] = useState<boolean>(false);
    const [images, setImages] = useState<ImageType[]>([]);
    const [selected,setSelected]=useState('')


    let _documents = [...documents];
    const target = _documents.findIndex((i: any) => i.fileType === item.fileType)
    const router = useRouter()
    let dep: string | undefined = router.query?.detail?.[0]
    const queryData: string[] | undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    const onChange = async (imageList: any, addUpdateIndex: any) => {
        if (item.fileType === 1) {
            throwToast({type: 'warning', value: 'تصویر امضا قابل بارگزاری نمی باشد.'})
        } else {
            let formData: any = new FormData()
            formData.append('userId', userId)
            formData.append('file', imageList[0].file)
            formData.append('fileOwnerSoftware', 1)
            formData.append('fileType', item.fileType)
            await uploadPhoto(formData)
                .then(() => {
                    throwToast({type: 'success', value: 'با موفقیت مدرک جدید بارگذاری شد'})
                    setImages(imageList);
                    let index = _documents.findIndex((i: any) => i.fileType === item.fileType)
                    _documents.splice(index, 1, {...item, image: imageList[0].data_url})
                    setDocs(_documents)
                })
                .catch((err) => throwToast({type: 'error', value: err}))
        }
    };

    useEffect(() => {
        if (_documents[target]?.image) {
            setImages([{data_url: _documents[target].image}])
            if (_documents[target]?.id) {
                setLock(item.locked)
            }
        }
    }, [_documents[target]?.image])

    const lockHandler = async () => {
        if (lock) {
            await unlockFile({userId: userId, fileType: item.fileType})
                .then(() => {
                    throwToast({type: 'success', value: 'با موفقیت قفل برداشته شد'});
                    setLock(false)
                })
                .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
        } else {
            await lockFile({userId: userId, fileType: item.fileType})
                .then(() => {
                    throwToast({type: 'success', value: 'با موفقیت قفل شد'});
                    setLock(true)
                })
                .catch((err) => throwToast({type: 'error', value: err}))
        }
    }
    const modalHandler=(state:boolean)=>{
        if (!state){
            setSelected('')
        }
    }

    return (
        <div className={'pb-5'}>
            <div className='flex items-center text-xs mb-2'>
                {item.title}
                <span className={'mr-2 cursor-pointer tooltip'} data-tip={lock ? 'قفل را باز کن' : 'قفل کن'}
                      onClick={lockHandler}>
                    {lock ? <LockClosedIcon className={'h-5 w-5'}/> : <LockOpenIcon className={'h-5 w-5'}/>}
                </span>
            </div>
            <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                dataURLKey="data_url"
                acceptType={['Jpg', 'Jpeg', 'BMP', 'PNG']}
                maxFileSize={2000000}
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageUpdate,
                      isDragging,
                      dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper max-h-[150px] h-[150px] aspect-video">
                        {imageList.length > 0 ? imageList.map((image, index) => {
                                return (
                                    <>
                                        <div role={'button'} key={index} className="image-item w-full h-full relative"
                                             onClick={() => item.fileType === 1 ? toast.warning('تصویر امضا قابل بارگزاری نمی باشد.') : onImageUpdate(index)}>
                                            <Image src={image['data_url']} alt="" fill/>
                                        </div>
                                        <div className={'flex space-x-2 space-x-reverse mt-1'}>
                                            <a className={'button bg-lime-400 py-1'} href={image['data_url']}
                                               download={item.title}>دانلود</a>
                                            <button className={'text-white rounded grow bg-red-400 py-1'} onClick={()=>setSelected(image['data_url'])}>نمایش</button>
                                        </div>
                                        <Modal title={item?.Name} open={selected===image['data_url']} setOpen={modalHandler} ModalWidth={'max-w-5xl max-h-[700px] min-h-[400px]'}>
                                                <img src={image['data_url']} alt="" className={'object-contain max-h-[500px] aspect-auto mx-auto'}/>
                                        </Modal>
                                    </>
                                )
                            }) :
                            <button
                                className='border border-gray-200 w-full h-full flex'
                                style={isDragging ? {color: 'red'} : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <CloudArrowUpIcon className='h-8 w-8 text-gray-300 m-auto'/>
                            </button>}
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}