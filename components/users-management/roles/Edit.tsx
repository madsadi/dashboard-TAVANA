import Modal from "../../common/layout/Modal";
import InputComponent from "../../common/components/InputComponent";
import React, {useContext, useEffect, useState} from "react";
import {RolesContext} from "../../../pages/users-management/roles";
import useMutation from "../../../hooks/useMutation";
import {IDP} from "../../../api/constants";
import {throwToast} from "../../common/functions/notification";

const roleInputs = [
    {title: 'name', name: 'عنوان', type: 'input'},
]
export default function Edit() {
    const {fetchData, query: searchQuery, selectedRows,setSelectedRows} = useContext<any>(RolesContext)
    const {mutate} = useMutation({url:`${IDP}/roles/update`})
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const editHandler = async (e: any) => {
        e.preventDefault()
        await mutate({id: selectedRows[0].id, ...query})
            .then(() => {
                throwToast({type:'success',value:'با موفقیت انجام شد'})
                setModal(false)
                setSelectedRows([])
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
            let _initialValue: any = {};
            _initialValue.name = selectedRows[0].name
            setQuery(_initialValue)
        }
    }, [modal])

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <button className="button bg-orange-500" onClick={openHandler}>ویرایش نقش</button>
            <Modal title={'ویرایش نقش'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'} onSubmit={editHandler}>
                        {
                            roleInputs.map((item: any) => {
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