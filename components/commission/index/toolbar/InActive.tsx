import React, {useContext, useEffect, useState} from "react";
import {CommissionContext} from "../../../../pages/commission-management/commission";
import {COMMISSION_BASE_URL} from "../../../../api/constants";
import useMutation from "../../../../hooks/useMutation";
import {throwToast} from "../../../common/functions/notification";
import InputComponent from "../../../common/components/InputComponent";
import {useSearchFilters} from "../../../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../../../common/functions/Module-Identifier";
import Modal from "../../../common/layout/Modal";
import {DayValue} from "react-modern-calendar-datepicker";

export default function InActive() {
    const {toolbar} = useSearchFilters(ModuleIdentifier.COMMISSION_MANAGEMENT_detail,'delete')
    const {selectedRows} = useContext<any>(CommissionContext)
    const {mutate} = useMutation({url:`${COMMISSION_BASE_URL}/api/CommissionDetail/InActive`,method:"PUT"})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [selectedDay, setSelectedDay] = useState<DayValue>(null)

    const editHandler = async (e: any) => {
        e.preventDefault()
        await mutate({id: selectedRows[0].id, ...query})
            .then(() => {
                throwToast({type:'success',value:'با موفقیت انجام شد'})
                setModal(false)
                setQuery({})
            })
            .catch((err) => throwToast({type:'error',value:err}))
    }

    const openHandler = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            throwToast({type:'warning',value:'لطفا یک گزینه برای غیر فعال کردن انتخاب کنید'})
        }
    }

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <button className="button bg-orange-500" onClick={openHandler}>غیرفعال کردن جزئیات ضرایب کارمزد</button>
            <Modal title={'غیرفعال کردن جزئیات ضرایب کارمزد'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            toolbar.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       setQuery={setQuery}
                                                       setSelectedDay={setSelectedDay}
                                                       selectedDay={selectedDay}
                                                       item={item}
                                                       onChange={onChange}
                                />

                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <button className="button bg-red-500"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModal(false)
                                }}>لغو
                        </button>
                        <button type={"submit"} className="button bg-lime-600" onClick={editHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}