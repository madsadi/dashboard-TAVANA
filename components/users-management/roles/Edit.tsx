import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {RolesContext} from "../../../pages/users-management/roles";
import {updateRole} from "../../../api/roles.api";

const roleInputs = [
    {title: 'name', name: 'عنوان', type: 'input'},
]
export default function Edit() {
    const {onSubmit, query: searchQuery, selectedRows,setSelectedRows} = useContext<any>(RolesContext)
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await updateRole({id: selectedRows[0].id, ...query})
            .then(() => {
                setModal(false)
                setSelectedRows([])
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
            _initialValue.name = selectedRows[0].name
            setQuery(_initialValue)
        }
    }, [modal])
    return (
        <>
            <button className="button bg-orange-500" onClick={openHandler}>ویرایش نقش</button>
            <Modal title={'ویرایش نقش'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'} onSubmit={addNewHandler}>
                        {
                            roleInputs.map((item: any) => {
                                return <InputComponent key={item.title}
                                                       query={query}
                                                       title={item?.title}
                                                       name={item?.name}
                                                       setQuery={setQuery}
                                                       valueType={item?.valueType}
                                                       type={item?.type}
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