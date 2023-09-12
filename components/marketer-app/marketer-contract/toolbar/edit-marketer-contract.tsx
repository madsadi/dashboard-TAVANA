import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useState, useEffect } from "react";
import { throwToast } from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../common/functions/Module-Identifier";
import { DayRange } from "react-modern-calendar-datepicker";
import { MarketerContractContext } from "pages/marketer-app/marketer-contract";
import { jalali } from "components/common/functions/common-funcions";

export default function EditMarketerContract() {
    const { fetchData, searchQuery, selectedRows } = useContext<any>(MarketerContractContext)
    const { toolbar } = useSearchFilters(ModuleIdentifier.MARKETER_APP_marketerContract, 'modal')
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/marketer-contract/modify`, method: "PUT" })
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
            .then(() => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                setModal(false)
                setQuery(null)
                fetchData(searchQuery)
            })
            .catch((err) => {
                throwToast({ type: 'error', value: err })
            })
    }


    useEffect(() => {
        if (modal && selectedRows?.length) {
            let _initialValue: any = {};
            toolbar.map((item: any) => {
                if (item.name !== 'date') {
                    _initialValue[`${item.name}`] = selectedRows[0][`${item.name}`]
                }
            })
            if (selectedRows[0]?.StartDate && selectedRows[0]?.EndDate) {
                let shamsi_from_date = jalali(selectedRows[0]?.StartDate).date
                let from_date = shamsi_from_date.split('/')

                let shamsi_to_date = jalali(selectedRows[0]?.EndDate).date
                let to_date = shamsi_to_date.split('/')

                setSelectedDayRange({ from: { year: Number(from_date[0]), month: Number(from_date[1]), day: Number(from_date[2]) }, to: { year: Number(to_date[0]), month: Number(to_date[1]), day: Number(to_date[2]) } })
            } else if (selectedRows[0]?.StartDate && !selectedRows[0]?.EndDate) {
                let shamsi_from_date = jalali(selectedRows[0]?.StartDate).date
                let from_date = shamsi_from_date.split('/')

                setSelectedDayRange({ from: { year: Number(from_date[0]), month: Number(from_date[1]), day: Number(from_date[2]) }, to: selectedDayRange.to })
            } else if (!selectedRows[0]?.StartDate && selectedRows[0]?.EndDate) {
                let shamsi_to_date = jalali(selectedRows[0]?.EndDate).date
                let to_date = shamsi_to_date.split('/')

                setSelectedDayRange({ from: selectedDayRange.from, to: { year: Number(to_date[0]), month: Number(to_date[1]), day: Number(to_date[2]) } })
            }
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
            <button className={'button bg-orange-500'} onClick={openHandler}>
                ویرایش قرارداد بازاریاب
            </button>
            <Modal title={'ویرایش قرارداد بازاریاب'} setOpen={setModal}
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
                            <button className="button bg-red-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}>لغو
                            </button>
                            <button type={"submit"} className="button bg-lime-600">تایید</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}