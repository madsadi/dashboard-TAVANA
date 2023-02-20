import React, {useContext, useState} from "react";
import Modal from "../../common/layout/Modal";
import {addNewCommission} from "../../../api/commission.api";
import {toast} from "react-toastify";
import {InstrumentTypeContext} from "./ResultTable";
import InputComponent from "../../common/components/InputComponent";

const listOfFilters = [
    {title: 'bourseCode', name: 'کد بورس', type: 'input'},
    {title: 'instrumentTypeCode', name: 'کد نوع ابزار مالی', type: 'input'},
    {title: 'sectorCode', name: 'کد گروه صنعت', type: 'input'},
    {title: 'subSectorCode', name: 'کد زیرگروه صنعت', type: 'input'},
]

type initialType = {
    bourseCode: string,
    instrumentTypeCode: string,
    sectorCode: string,
    subSectorCode: string
}
const initialValue = {
    bourseCode: '',
    instrumentTypeCode: '',
    sectorCode: '',
    subSectorCode: ''
}
export default function AddNew() {
    const [modal, setModal] = useState(false)
    const {onSubmit, query: insQuery} = useContext<any>(InstrumentTypeContext)
    const [query, setQuery] = useState<initialType>(initialValue);

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const addNewHandler = async (e: any) => {
        e.preventDefault()
        await addNewCommission(query).then(res => {
            setModal(false);
            onSubmit(e, insQuery)
            toast.success('با موفقیت انجام شد')
        })
            .catch((err) => {
                toast.error(`${err?.response?.data?.error}`)
            })
    }

    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>جدید
            </button>
            <Modal title={'جزییات کارمزد جدید'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form onSubmit={(e) => onSubmit(e, query)}>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                listOfFilters?.map((item: any) => {
                                    return <InputComponent key={item.title}
                                                           query={query}
                                                           title={item?.title}
                                                           name={item?.name}
                                                           queryUpdate={queryUpdate}
                                                           valueType={item?.valueType}
                                                           type={item?.type}
                                    />
                                })
                            }
                        </div>
                        <div className={'flex space-x-3 space-x-reverse float-left my-4'}>
                            <button className={'button bg-red-600'} onClick={(e) => {
                                e.preventDefault()
                                setQuery(initialValue)
                                onSubmit(e, initialValue)
                            }}>
                                لغو فیلتر ها
                            </button>
                            <button className={'button bg-lime-600'} type={'submit'}>
                                جستجو
                            </button>
                        </div>
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2'}>
                        <button className="button bg-red-500"
                                onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="button bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>

        </>
    )
}