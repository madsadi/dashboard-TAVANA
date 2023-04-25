import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, {useContext, useEffect, useState} from "react";
import {UsersContext} from "../../../pages/users-management/users";
import {toast} from "react-toastify";
import {updateUsers} from "../../../api/users-management.api";

const userInputs = [
    {title: 'userName', name: 'نام کاربری', type: 'input'},
    {title: 'phoneNumber', name: 'موبایل', type: 'input'},
    {title: 'firstName', name: 'نام', type: 'input'},
    {title: 'lastName', name: 'نام خانوادگی', type: 'input'},
    {title: 'email', name: 'ایمیل', type: 'input'},
    {title: 'nationalId', name: 'کدملی', type: 'input'},
]
export default function Edit() {
    const {onSubmit, query: searchQuery, selectedRows} = useContext<any>(UsersContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await updateUsers({userId: selectedRows[0].id, ...query})
            .then(() => {
                setModal(false)
                toast.success('با موفقیت انجام شد')
                setQuery({})
                onSubmit(e, searchQuery)
            })
            .catch((err) => {
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }

    const openHandler = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            toast.warning('لطفا یک گزینه برای تغییر انتخاب کنید')
        }
    }

    useEffect(() => {
        if (modal && selectedRows.length) {
            let _initialValue: any = {};
            Object.keys(selectedRows[0]).map((item: string) => {
                if (item === 'familyName'){
                    _initialValue['lastName'] = selectedRows[0][`${item}`]
                }else if (item === 'mobile'){
                    _initialValue['phoneNumber'] = selectedRows[0][`${item}`]
                }else if (item==='firstName' || item==='email' || item==='nationalId'){
                    _initialValue[`${item}`] = selectedRows[0][`${item}`]
                }
            })
            setQuery(_initialValue)
        }
    }, [modal])
    return (
        <>
            <button className="button bg-orange-500" onClick={openHandler}>ویرایش</button>
            <Modal title={'ویرایش اطلاعات کاربر'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            userInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       item={item}
                                                       setQuery={setQuery}
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