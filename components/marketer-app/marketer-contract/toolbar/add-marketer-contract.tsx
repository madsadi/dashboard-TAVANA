import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useState } from "react";
import { throwToast } from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../common/functions/Module-Identifier";
import { DayRange } from "react-modern-calendar-datepicker";
import { MarketerContractContext } from "pages/marketer-app/marketer-contract";

export default function AddMarketerContract() {
    const { fetchData, searchQuery } = useContext<any>(MarketerContractContext)
    const { toolbar } = useSearchFilters(ModuleIdentifier.MARKETER_APP_marketerContract, 'modal')
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/marketer-contract/add` })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({ from: null, to: null })

    const openHandler = () => {
        setQuery({})
        setSelectedDayRange({ from: null, to: null })
        setModal(true)
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
            .catch((err) => {
                throwToast({ type: 'error', value: err })
            })
    }
    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <button className={'button bg-primary'} onClick={openHandler}>
                ایجاد قرارداد جدید بازاریاب
            </button>
            <Modal title={'ایجاد قرارداد جدید بازاریاب'} setOpen={setModal}
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
                                        setSelectedDayRange={setSelectedDayRange}
                                        selectedDayRange={selectedDayRange}
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
                            <button type={"submit"} className="button bg-primary">تایید</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}