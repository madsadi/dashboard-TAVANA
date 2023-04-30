import React, {useState} from 'react';
import InputComponent from "../../common/components/InputComponent";
import Modal from "../../common/layout/Modal";
import {DayValue} from "react-modern-calendar-datepicker";
import useQuery from "../../../hooks/useQuery";
import {BOOKBUILDING_BASE_URL} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";

export const SendMessageComponent = () => {
    const [modal, setModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState<DayValue>(null)
    const [query, setQuery] = useState({date:''})
    const {fetchAsyncData} = useQuery({url:`${BOOKBUILDING_BASE_URL}/SendMessageToUncompletedUsers`})

    const sendMessage=async (e:any)=>{
        e.preventDefault()
        await fetchAsyncData({registrationDateTime:query.date.split('T')[0] + 'T23:59:00'})
            .then((res)=>throwToast({type:'success',value:` برای ${res?.data?.result?.totalCount} نفر پیامک با موفقیت ارسال شد `}))
            .catch((err) => throwToast({type:'error',value:err}))
    }

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
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
                            <InputComponent item={{title:'',type:'singleDate',name:'date',valueType:'string'}}
                                            query={query}
                                            onChange={onChange}
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