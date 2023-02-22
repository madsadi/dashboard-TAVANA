import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {UsersContext} from "../../../pages/users-management/users";
import {changeLockOut} from "../../../api/users.api";
import {DayValue} from "react-modern-calendar-datepicker";

const userInputs = [
    {title: 'lockoutEndDateTime', name: 'تاریخ', type: 'singleDate'},
]
export default function LockOut(){
    const {selectedRows} = useContext<any>(UsersContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await changeLockOut({userId:selectedRows[0].userId,lockoutEndDateTime:query.date})
            .then(() => {
                setModal(false)
                toast.success('با موفقیت انجام شد')
                setQuery({})
            })
            .catch((err) => {
                toast.error(err?.response?.data?.error?.message)
            })
    }
    const openHandler = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
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
    return(
        <>
            <button className="button bg-yellow-500" onClick={openHandler}>قفل/باز کردن حساب کاربری</button>
            <Modal title={'قفل/باز کردن حساب کاربری'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            userInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       setQuery={setQuery}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
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
                        <button type={"submit"} className="button bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}