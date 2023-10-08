import InputComponent from "../../../../common/components/input-generator";
import Modal from "../../../../common/layout/modal";
import React, { useContext, useState, useEffect } from "react";
import { throwToast } from "../../../../common/functions/notification";
import useMutation from "../../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../../api/constants";
import { useSearchFilters } from "../../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../common/functions/Module-Identifier";
import { MarketerContractDetailContext } from "pages/marketer-app/marketer-contract/[...contractId]";
import { Button } from "components/common/components/button/button";

export default function EditMarketerContractDetail() {
    const { deductionFetch, deductionSearchQuery, deductionData, contractId } = useContext<any>(MarketerContractDetailContext)
    const { toolbar } = useSearchFilters(ModuleIdentifier.MARKETER_APP_marketerContract_detail, 'edit')
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/marketer-contract-deduction/modify`, method: "PUT" })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const openHandler = () => {
        setQuery({})
        setModal(true)
    }

    const submitHandler = async (e: any) => {
        e.preventDefault()
        await mutate({ ContractID: contractId, ...query })
            .then(() => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                setModal(false)
                setQuery(null)
                deductionFetch(deductionSearchQuery)
            })
            .catch((err) => {
                throwToast({ type: 'error', value: err })
            })
    }

    console.log(query);

    useEffect(() => {
        if (modal && deductionData?.length) {
            let _initialValue: any = {};
            toolbar.map((item: any) => {
                _initialValue[`${item.title}`] = deductionData[0][`${item.title}`]
            })

            setQuery(_initialValue)
        }
    }, [modal])

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <Button label="ویرایش کسورات قرارداد بازاریاب" className={'bg-secondary'} onClick={openHandler} />
            <Modal title={'ویرایش کسورات قرارداد بازاریاب'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <form onSubmit={submitHandler}>
                        <div className={'grid grid-cols-2 gap-4'}>
                            {
                                toolbar.map((item: any) => {
                                    return <InputComponent key={item.title}
                                        query={query}
                                        setQuery={setQuery}
                                        item={item}
                                        onChange={onChange}
                                    />
                                })
                            }
                        </div>
                        <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                            <Button className="bg-error"
                                label="لغو"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }} />
                            <Button type={"submit"} className="bg-primary" label="تایید" />
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}