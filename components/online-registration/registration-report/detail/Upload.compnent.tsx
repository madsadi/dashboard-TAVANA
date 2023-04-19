import React, {Dispatch, useEffect, useState} from 'react';
import ImageUploading, {ImageType} from 'react-images-uploading';
import {
    CloudArrowUpIcon,
    LockOpenIcon,
    LockClosedIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image';
import {toast} from "react-toastify";
import {downloadContent, lockFile, unlockFile, uploadPhoto} from "../../../../api/users-management.api";
import {useRouter} from "next/router";

export default function UploadComponent({
                                            item,
                                            documents,
                                            setDocs
                                        }: { item: any, documents: any, setDocs: Dispatch<any> }) {
    const [lock, setLock] = useState<boolean>(false);
    const [images, setImages] = useState<ImageType[]>([]);
    let _documents = [...documents];
    const target = _documents.findIndex((i: any) => i.fileType === item.fileType)
    const router = useRouter()
    let dep: string | undefined = router.query?.detail?.[0]
    const queryData: string[] | undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    const onChange = async (imageList: any, addUpdateIndex: any) => {
        if (item.fileType === 1) {
            toast.warning('تصویر امضا قابل بارگزاری نمی باشد.')
        } else {
            let formData: any = new FormData()
            formData.append('userId', userId)
            formData.append('file', imageList[0].file)
            formData.append('fileOwnerSoftware', 1)
            formData.append('fileType', item.fileType)
            await uploadPhoto(formData)
                .then(() => {
                    toast.success('با موفقیت مدرک جدید بارگذاری شد')
                    setImages(imageList);
                    let index = _documents.findIndex((i: any) => i.fileType === item.fileType)
                    _documents.splice(index, 1, {...item, image: imageList[0].data_url})
                    setDocs(_documents)
                })
                .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
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
                    toast.success('با موفقیت قفل برداشته شد');
                    setLock(false)
                })
                .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
        } else {
            await lockFile({userId: userId, fileType: item.fileType})
                .then(() => {
                    toast.success('با موفقیت قفل شد');
                    setLock(true)
                })
                .catch((err) => toast.error(`${err?.response?.data?.error?.message}`))
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
                                        <div className={'mt-1'}>
                                            <a className={'button bg-lime-400 py-1 w-full '} href={image['data_url']}
                                               download={item.title}>دانلود</a>
                                        </div>
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