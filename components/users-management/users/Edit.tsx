import React, {useContext, useEffect, useState} from "react";
import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import {UsersContext} from "../../../pages/users-management/users";
import useMutation from "../../../hooks/useMutation";
import {IDP} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";

const userInputs = [
    {title: 'username', name: 'نام کاربری', type: 'input'},
    {title: 'phoneNumber', name: 'موبایل', type: 'input'},
    {title: 'firstName', name: 'نام', type: 'input'},
    {title: 'lastName', name: 'نام خانوادگی', type: 'input'},
    {title: 'email', name: 'ایمیل', type: 'input'},
    {title: 'nationalId', name: 'کدملی', type: 'input'},
]
export default function Edit() {
    const {fetchData, query: searchQuery, selectedRows} = useContext<any>(UsersContext)
    const {mutate} = useMutation({url:`${IDP}/users/update`})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const editHandler = async (e: any) => {
        e.preventDefault()
        await mutate({userId: selectedRows[0].id, ...query})
            .then(() => {
                throwToast({type:'success',value:'با موفقیت انجام شد'})
                setModal(false)
                setQuery({})
                fetchData(searchQuery)
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

    useEffect(() => {
        if (modal && selectedRows.length) {
            let {firstName,email,nationalId,phoneNumber,lastName,username} = selectedRows[0]
            setQuery({firstName,email,nationalId,phoneNumber,lastName,username})
        }
    }, [modal])

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
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