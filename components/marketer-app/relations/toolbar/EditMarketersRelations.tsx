import InputComponent from "../../../common/components/InputComponent";
import Modal from "../../../common/layout/Modal";
import React, {useContext, useEffect, useState} from "react";
import {throwToast} from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import {ADMIN_GATEWAY, MARKETER_ADMIN} from "../../../../api/constants";
import {useSearchFilters} from "../../../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../../../common/functions/Module-Identifier";
import {RelationsContext} from "../../../../pages/marketer-app/relations";
import {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import {jalali} from "../../../common/functions/common-funcions";

export default function EditMarketersRelations() {
    const {selectedRows,fetchData,searchQuery} = useContext<any>(RelationsContext)
    const {toolbar} = useSearchFilters(ModuleIdentifier.MARKETER_APP_RELATIONS,'edit')
    const {mutate} = useMutation({url:`${MARKETER_ADMIN}/marketer/modify-marketers-relations`,method:"PUT"})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    useEffect(() => {
        if (modal && selectedRows?.length) {
            let _initialValue: any = {};
            _initialValue['LeaderMarketerID'] = selectedRows[0][`LeaderMarketerID`]
            _initialValue['FollowerMarketerID'] = selectedRows[0][`FollowerMarketerID`]
            _initialValue['CommissionCoefficient'] = selectedRows[0][`CommissionCoefficient`]
            _initialValue['StartDate'] = selectedRows[0]?.GStartDate
            _initialValue['EndDate'] = selectedRows[0]?.GEndDate
            if (selectedRows[0]?.GStartDate && selectedRows[0]?.GEndDate){
                let shamsi_from_date = jalali(selectedRows[0]?.GStartDate).date
                let from_date = shamsi_from_date.split('/')

                let shamsi_to_date = jalali(selectedRows[0]?.GEndDate).date
                let to_date = shamsi_to_date.split('/')

                setSelectedDayRange({from:{year:Number(from_date[0]),month:Number(from_date[1]),day:Number(from_date[2])},to:{year:Number(to_date[0]),month:Number(to_date[1]),day:Number(to_date[2])}})
            }else if (selectedRows[0]?.GStartDate && !selectedRows[0]?.GEndDate){
                let shamsi_from_date = jalali(selectedRows[0]?.GStartDate).date
                let from_date = shamsi_from_date.split('/')

                setSelectedDayRange({from:{year:Number(from_date[0]),month:Number(from_date[1]),day:Number(from_date[2])},to:selectedDayRange.to})
            }else if (!selectedRows[0]?.GStartDate && selectedRows[0]?.GEndDate){
                let shamsi_to_date = jalali(selectedRows[0]?.GEndDate).date
                let to_date = shamsi_to_date.split('/')

                setSelectedDayRange({from:selectedDayRange.from,to:{year:Number(to_date[0]),month:Number(to_date[1]),day:Number(to_date[2])}})
            }
            setQuery(_initialValue)
        }
    }, [modal])

    const openHandler = ()=>{
        if (selectedRows?.length===1){
            setModal(true)
        }else{
            throwToast({type:'warning',value:'لطفا یک گزینه برای تغییر انتخاب کنید'})
        }

    }
    const submitHandler = async (e:any)=>{
        e.preventDefault()
        await mutate(query)
            .then((res)=> {
                throwToast({type:'success',value:`با موفقیت انجام شد`})
                setModal(false)
                setQuery(null)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({type:'error',value:err}))
    }
    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <button className={'button bg-orange-500'} onClick={openHandler}>
                ویرایش رابطه بین دو بازاریاب
            </button>
            <Modal title={'ویرایش رابطه بین دو بازاریاب'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form onSubmit={submitHandler}>
                        <div className={'grid grid-cols-2 gap-4'} >
                            {
                                toolbar.map((item: any) => {
                                    return <InputComponent key={item.title}
                                                           query={query}
                                                           setQuery={setQuery}
                                                           item={item}
                                                           onChange={onChange}
                                                           selectedDayRange={selectedDayRange}
                                                           setSelectedDayRange={setSelectedDayRange}
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
                            <button type={"submit"} className="button bg-lime-600" >تایید</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}