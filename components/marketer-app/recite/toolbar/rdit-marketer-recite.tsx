import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useEffect, useState } from "react";
import { throwToast } from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import { ADMIN_GATEWAY, MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../common/functions/Module-Identifier";
import { RelationsContext } from "../../../../pages/marketer-app/relations";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import { jalali } from "../../../common/functions/common-funcions";
import { ReciteContext } from "../../../../pages/marketer-app/recite";

export default function EditMarketerRecite() {
    const { selectedRows, fetchData, searchQuery } = useContext<any>(ReciteContext)
    const { toolbar } = useSearchFilters(ModuleIdentifier.MARKETER_APP_recite, 'edit')
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/factor/modify-factor`, method: "PUT" })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    useEffect(() => {
        if (modal && selectedRows?.length) {
            let _initialValue: any = {};
            _initialValue['MarketerID'] = selectedRows[0][`MarketerID`]
            _initialValue['TotalPureVolume'] = selectedRows[0][`TotalPureVolume`]
            _initialValue['TotalFee'] = selectedRows[0][`TotalFee`]
            _initialValue['PureFee'] = selectedRows[0][`PureFee`]
            _initialValue['MarketerFee'] = selectedRows[0][`MarketerFee`]
            _initialValue['Plan'] = selectedRows[0][`Plan`]
            _initialValue['Tax'] = selectedRows[0][`Tax`]
            _initialValue['Collateral'] = selectedRows[0][`Collateral`]
            _initialValue['FinalFee'] = selectedRows[0][`FinalFee`]
            _initialValue['Payment'] = selectedRows[0][`Payment`]
            _initialValue['FactorStatus'] = selectedRows[0][`FactorStatus`]

            setQuery(_initialValue)
        }
    }, [modal])

    const openHandler = () => {
        if (selectedRows?.length === 1) {
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای تغییر انتخاب کنید' })
        }

    }
    const submitHandler = async (e: any) => {
        e.preventDefault()
        await mutate(query)
            .then((res) => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                setModal(false)
                setQuery(null)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }
    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <button className={'button bg-secondary'} onClick={openHandler}>
                اصلاح کردن صورت حساب
            </button>
            <Modal title={'اصلاح کردن صورت حساب'} setOpen={setModal}
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
                                        selectedDayRange={selectedDayRange}
                                        setSelectedDayRange={setSelectedDayRange}
                                    />
                                })
                            }
                        </div>
                        <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                            <button className="button bg-error"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}>لغو
                            </button>
                            <button type={"submit"} className="button bg-primary" >تایید</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}