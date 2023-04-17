import React, {useContext, useState} from 'react';
import InputComponent from "../../common/components/InputComponent";
import Modal from "../../common/layout/Modal";
import {DayValue} from "react-modern-calendar-datepicker";
import {sendMessageToUncompletedUsers} from "../../../api/users-management.api";
import {toast} from "react-toastify";

export const SendMessageComponent = () => {
    const [modal, setModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState<DayValue>(null)
    const [query, setQuery] = useState({date:''})

    const sendMessage=async (e:any)=>{
        e.preventDefault()
        await sendMessageToUncompletedUsers(query.date.split('T')[0]+'T23:59:00')
            .then((res)=>toast.success(` برای ${res?.result?.totalCount} نفر پیامک با موفقیت ارسال شد `))
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    return (
        <>
            <button className={'button bg-lime-500'} onClick={()=>setModal(true)}>
                ارسال پیام
            </button>
            <Modal title={'ارسال پیام'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form onSubmit={sendMessage}>
                        <div className={'w-full md:w-3/5'}>
                            <InputComponent title={''}
                                            type={'singleDate'}
                                            name={'date'}
                                            query={query}
                                            setQuery={setQuery}
                                            valueType={'string'}
                                            setSelectedDay={setSelectedDay}
                                            selectedDay={selectedDay}
                            />
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