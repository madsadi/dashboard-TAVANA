import InputComponent from "../../common/components/input-generator";
import Modal from "../../common/layout/modal";
import React, { useContext, useEffect, useState } from "react";
import { OnlineRegContext } from "../../../pages/online-registration/registration-report";
import { useRouter } from "next/router";
import { throwToast } from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import { OnlineRegDetailContext } from "../../../pages/online-registration/registration-report/[...detail]";
import { Button } from "../../common/components/button/button";

export default function EditRegStateComponent() {
    const { selectedRows, fetchData, searchQuery } = useContext<any>(OnlineRegContext)
    const { fetchData: detailFetch } = useContext<any>(OnlineRegDetailContext)
    const { toolbar, service, modules, restriction } = useSearchFilters(ModuleIdentifier.ONLINE_REGISTRATION, 'edit')
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/EditRegistrationState` })
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
            Object.keys(selectedRows[0]).map((item: string) => {
                if (item === 'registrationState' || item === 'changeReasonDescription') {
                    _initialValue[item] = selectedRows[0][`${item}`]
                }
            })
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
        await mutate({ ...query, userId: selectedRows?.[0].userId || userId })
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
            <Button label={'تغییر وضعیت ثبت نام'}
                className="bg-orange-500"
                onClick={openHandler}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Edit'].join('.')] : []}
            />
            <Modal title={'ویرایش اطلاعات کاربر'} setOpen={setModal}
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