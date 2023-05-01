import React, {useContext, useEffect, useState} from "react";
import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import {UsersContext} from "../../../pages/users-management/users";
import {DayValue} from "react-modern-calendar-datepicker";
import useMutation from "../../../hooks/useMutation";
import {IDP} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";

const userInputs = [
    {title: 'lockoutEndDateTime', name: 'تاریخ', type: 'singleDate'},
]
export default function LockOut(){
    const {selectedRows} = useContext<any>(UsersContext)
    const {mutate} = useMutation({url:`${IDP}/users/set-lockout-end-date`})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);

    const lockHandler = async (e: any) => {
        e.preventDefault()
        await mutate({userId:selectedRows[0].id,lockoutEndDateTime:query.date})
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
            throwToast({type:'warning',value:'لطفا یک گزینه برای تغییر انتخاب کنید'})
        }
    }

    useEffect(()=>{
        if (!modal){
            let _initialValue:any = {};
            _initialValue.lockoutEndDateTime = null
            setSelectedDay(null)
            setQuery(_initialValue)
        }
    },[modal])

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    return(
        <>
            <button className="button bg-yellow-500" onClick={openHandler}>قفل/باز کردن حساب کاربری</button>
            <Modal title={'قفل/باز کردن حساب کاربری'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            userInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       onChange={onChange}
                                                       setSelectedDay={setSelectedDay}
                                                       selectedDay={selectedDay}
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
                        <button type={"submit"} className="button bg-lime-600" onClick={lockHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}