import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { OnlineRegContext } from "pages/online-registration/registration-report";
import { OnlineRegDetailContext } from "pages/online-registration/registration-report/[...detail]";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "components/common/functions/Module-Identifier";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { throwToast } from "components/common/functions/notification";
import { Button } from "components/common/components/button/button";
import Modal from "components/common/layout/Modal";
import InputComponent from "components/common/components/InputComponent";

export default function EditBourseCode() {
    const { selectedRows, fetchData, searchQuery } = useContext<any>(OnlineRegContext)
    const { fetchData: detailFetch } = useContext<any>(OnlineRegDetailContext)
    const { toolbar, modules, service, restriction } = useSearchFilters(ModuleIdentifier.ONLINE_REGISTRATION, 'bourseCode')
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/EditBourseCode` })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    let dep: string | undefined = router.query?.detail?.[0]
    const queryData: string[] | undefined = dep?.split('&')
    let userId = queryData?.[0]?.split('=')[1]

    useEffect(() => {
        if (modal && selectedRows?.length && !userId) {
            let _initialValue: any = {};
            _initialValue['refCode'] = selectedRows[0]['marketerRefCode']

            setQuery(_initialValue)
        }
    }, [modal])

    const openHandler = () => {
        if (selectedRows?.length === 1 || userId) {
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای تغییر انتخاب کنید' })
        }
    }

    const submitHandler = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        await mutate({
            userId: selectedRows?.[0].userId || userId,
            bourseCodes: [
                {
                    type: query.type,
                    code: [query.letter, query.digit].join('')
                }
            ]
        })
            .then((res) => {
                throwToast({ type: 'success', value: `${res?.data?.result?.message}` })
                setModal(false)
                setQuery(null)
                if (router.pathname === '/online-registration/registration-report') {
                    fetchData(searchQuery)
                } else {
                    detailFetch({ UserId: userId })
                }
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <Button label={'اصلاح کد بورسی'}
                className="bg-sky-500"
                onClick={openHandler}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Edit'].join('.')] : []}
            />
            <Modal title={'اصلاح کد بورسی'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <form onSubmit={submitHandler}>
                        <div className={'grid grid-cols-2 gap-4'} >
                            {
                                toolbar.map((item: any) => {
                                    return <InputComponent key={item.title}
                                        query={query}
                                        item={item}
                                        onChange={onChange}
                                    />
                                })
                            }
                        </div>
                        <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                            <Button label={'لغو'}
                                className="bg-red-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}
                            />
                            <Button label={'تایید'}
                                className="bg-lime-500"
                                loading={loading}
                                type={"submit"}
                            />

                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}