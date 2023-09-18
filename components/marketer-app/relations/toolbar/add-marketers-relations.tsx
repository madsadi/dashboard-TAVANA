import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useEffect, useState } from "react";
import { throwToast } from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import { ADMIN_GATEWAY, MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../common/functions/Module-Identifier";
import { RelationsContext } from "../../../../pages/marketer-app/relations";
import { DayRange } from "react-modern-calendar-datepicker";

export default function AddMarketersRelations() {
    const { fetchData, searchQuery } = useContext<any>(RelationsContext)
    const { toolbar } = useSearchFilters(ModuleIdentifier.MARKETER_APP_RELATIONS, 'add')
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/marketerrelation/add` })
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
            <button className={'button bg-green-500'} onClick={openHandler}>
                ایجاد رابطه بین دو بازاریاب
            </button>
            <Modal title={'ایجاد رابطه بین دو بازاریاب'} setOpen={setModal}
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