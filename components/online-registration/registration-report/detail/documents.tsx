import React, { useContext, useEffect, useState } from "react";
import UploadComponent from './upload';
import DaisyAccordionComponent from "../../../common/components/daisy-accordion";
import { useRouter } from "next/router";
import useQuery from "../../../../hooks/useQuery";
import { FILE_SERVER } from "../../../../api/constants";
import { OnlineRegDetailContext } from "../../../../pages/online-registration/registration-report/[...detail]";
import { useSelector } from "react-redux";
import { isAllowed } from "../../../common/functions/permission-utils";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "components/common/functions/Module-Identifier";

export default function DocumentsComponent() {
    const { user_permissions: userPermissions } = useSelector((state: any) => state.appConfig);
    const { service, modules, restriction } = useSearchFilters(ModuleIdentifier.ONLINE_REGISTRATION)

    let initialDocuments: any = [
        {
            title: 'تصویر امضاء دریافت شده از سجام',
            fileType: 1,
            image: null
        },
        {
            title: 'تصویر صفحه اول شناسنامه',
            fileType: 3,
            image: null
        },
        {
            title: 'تصویر صفحه توضیحات شناسنامه',
            fileType: 4,
            image: null
        },
        {
            title: 'تصویر روی کارت ملی',
            fileType: 6,
            image: null
        }
    ]
    let agentDocuments: any = [
        {
            title: 'تصویر امضاء دریافت شده از سجام',
            fileType: 1,
            image: null
        },
        {
            title: 'تصویر صفحه اول شناسنامه',
            fileType: 3,
            image: null
        },
        {
            title: 'تصویر صفحه توضیحات شناسنامه',
            fileType: 4,
            image: null
        },
        {
            title: 'تصویر روی کارت ملی',
            fileType: 6,
            image: null
        },
        {
            fileType: 8,
            title: "تصویر صفحه اول شناسنامه وکیل",
            image: null
        },
        {
            fileType: 10,
            title: "تصویر روی کارت ملی وکیل",
            image: null
        },
        {
            fileType: 11,
            title: "تصویر وکالت نامه",
            image: null
        },
    ]
    let legalDocuments: any = [
        {
            fileType: 8,
            title: "تصویر صفحه اول شناسنامه وکیل",
            image: null
        },
        {
            fileType: 9,
            title: "تصویر صفحه توضیحات شناسنامه وکیل",
            image: null
        },
        {
            fileType: 10,
            title: "تصویر روی کارت ملی وکیل",
            image: null
        },
        {
            fileType: 12,
            title: "تصویر آخرین روزنامه رسمی اعضای هیات مدیره",
            image: null
        },
        {
            fileType: 13,
            title: "تصویر امضاء رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 14,
            title: "تصویر صفحه اول شناسنامه رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 15,
            title: "تصویر صفحه توضیحات شناسنامه رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 16,
            title: "تصویر روی کارت ملی رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 17,
            title: "تصویر امضاء مدیر عامل",
            image: null
        },
        {
            fileType: 18,
            title: "تصویر صفحه اول شناسنامه مدیر عامل",
            image: null
        },
        {
            fileType: 19,
            title: "تصویر صفحه توضیحات شناسنامه مدیر عامل",
            image: null
        },
        {
            fileType: 20,
            title: "تصویر روی کارت ملی مدیر عامل",
            image: null
        },
        {
            fileType: 21,
            title: "تصویر امضاء عضو هیئت مدیره",
            image: null
        },
        {
            fileType: 22,
            title: "تصویر صفحه اول شناسنامه عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
        {
            fileType: 23,
            title: "تصویر صفحه توضیحات شناسنامه عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
        {
            fileType: 24,
            title: "تصویر روی کارت ملی عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
    ]
    const { data } = useContext<any>(OnlineRegDetailContext)
    const [loading, setLoading] = useState(false)
    const [document, setDocuments] = useState<any>([])
    const { fetchAsyncData } = useQuery({ url: `${FILE_SERVER}/api/admin-file-manager/get-content` })
    const router = useRouter()
    let dep: string | undefined = router.query?.detail?.[0]
    const queryData: string[] | undefined = dep?.split('&')
    let userId: any = queryData?.[0]?.split('=')[1]

    let firstDeck = [
        {
            fileType: 8,
            title: "تصویر صفحه توضیحات شناسنامه وکیل",
            image: null
        },
        {
            fileType: 10,
            title: "تصویر روی کارت ملی وکیل",
            image: null
        },
        {
            fileType: 11,
            title: "تصویر وکالت نامه",
            image: null
        }
    ]
    let secondDeck = [
        {
            fileType: 12,
            title: "تصویر آخرین روزنامه رسمی اعضای هیات مدیره",
            image: null
        },
        {
            fileType: 13,
            title: "تصویر امضاء رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 14,
            title: "تصویر صفحه اول شناسنامه رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 15,
            title: "تصویر صفحه توضیحات شناسنامه رئیس هیات مدیره",
            image: null
        },
        {
            fileType: 16,
            title: "تصویر روی کارت ملی رئیس هیات مدیره",
            image: null
        }
    ]
    let thirdDeck = [
        {
            fileType: 17,
            title: "تصویر امضاء مدیر عامل",
            image: null
        },
        {
            fileType: 18,
            title: "تصویر صفحه اول شناسنامه مدیر عامل",
            image: null
        },
        {
            fileType: 19,
            title: "تصویر صفحه توضیحات شناسنامه مدیر عامل",
            image: null
        },
        {
            fileType: 20,
            title: "تصویر روی کارت ملی مدیر عامل",
            image: null
        }
    ]
    let forthDeck = [
        {
            fileType: 21,
            title: "تصویر امضاء عضو هیئت مدیره",
            image: null
        },
        {
            fileType: 22,
            title: "تصویر صفحه اول شناسنامه عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
        {
            fileType: 23,
            title: "تصویر صفحه توضیحات شناسنامه عضو هیات مدیره (صاحب امضاء)",
            image: null
        },
        {
            fileType: 24,
            title: "تصویر روی کارت ملی عضو هیات مدیره (صاحب امضاء)",
            image: null
        }
    ]
    console.log(service, modules);

    useEffect(() => {
        const getDocument = async () => {
            setLoading(true)
            await fetchAsyncData({ userId: userId, fileOwnerSoftware: 1 })
                .then((res) => {
                    let _D: any
                    if (data?.hasAgent) {
                        _D = agentDocuments;
                    } else if (data?.personType === 2) {
                        _D = legalDocuments;
                    } else {
                        _D = initialDocuments;
                    }
                    res?.data?.result?.map((item: any) => {
                        let _documentIndex = _D.findIndex((i: any) => i.fileType === item.fileType)
                        if (_documentIndex >= 0 && item?.content) {
                            _D.splice(_documentIndex, 1, {
                                ..._D[_documentIndex], ...item,
                                id: item.id,
                                image: `data:image/${(item.extension).split('.')[1]};base64,` + item.content
                            })
                        }
                    })
                    setDocuments(_D)
                })
                .catch((err) => console.log(err.message, 'err'))
                .finally(() => setLoading(false))
        }
        if (restriction ? isAllowed({ userPermissions, whoIsAllowed: [[service?.[1], modules?.[1]?.[0], 'Read'].join('.')] }) : true) {
            getDocument()
        }
    }, [])

    return (
        <>
            {document.length ? <DaisyAccordionComponent title={'مدارک'}>
                {data?.personType === 2 ? <div>
                    <DaisyAccordionComponent title={'مدارک وکیل'}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {firstDeck.map((item: any) => {
                                return (
                                    <UploadComponent item={item} loading={loading} documents={document}
                                        setDocs={setDocuments}
                                        key={item.fileType} />
                                )
                            })}
                        </div>
                    </DaisyAccordionComponent>
                    <DaisyAccordionComponent title={'مدارک مدیر عامل'}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {secondDeck.map((item: any) => {
                                return (
                                    <UploadComponent item={item} loading={loading} documents={document}
                                        setDocs={setDocuments}
                                        key={item.fileType} />
                                )
                            })}
                        </div>
                    </DaisyAccordionComponent>
                    <DaisyAccordionComponent title={'مدارک مدیر عامل'}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {thirdDeck.map((item: any) => {
                                return (
                                    <UploadComponent item={item} loading={loading} documents={document}
                                        setDocs={setDocuments}
                                        key={item.fileType} />
                                )
                            })}
                        </div>
                    </DaisyAccordionComponent>
                    <DaisyAccordionComponent title={'مدارک عضو هیئت مدیره'}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {forthDeck.map((item: any) => {
                                return (
                                    <UploadComponent item={item} loading={loading} documents={document}
                                        setDocs={setDocuments}
                                        key={item.fileType} />
                                )
                            })}
                        </div>
                    </DaisyAccordionComponent>
                </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/50 backdrop-blur-md p-3 rounded-md">
                        {
                            document.map((item: any) => {
                                return (
                                    <UploadComponent item={item} documents={document} loading={loading}
                                        setDocs={setDocuments} key={item.fileType} />
                                )
                            })
                        }
                    </div>}
            </DaisyAccordionComponent>
                : null}
        </>
    )
}