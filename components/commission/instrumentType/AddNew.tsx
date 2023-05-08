import React, {useContext, useState} from "react";
import Modal from "../../common/layout/Modal";
import {InstrumentTypeContext} from "./ResultTable";
import InputComponent from "../../common/components/InputComponent";
import {throwToast} from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import {COMMISSION_BASE_URL} from "../../../api/constants";
import {useSearchFilters} from "../../../hooks/useSearchFilters";
import {ModuleIdentifier} from "../../common/functions/Module-Identifier";

export default function AddNew() {
    const {toolbar} = useSearchFilters(ModuleIdentifier.COMMISSION_MANAGEMENT_instrument,'add')
    const [modal, setModal] = useState(false)
    const {fetchData, query: insQuery} = useContext<any>(InstrumentTypeContext)
    const [query, setQuery] = useState<any>(null);
    const {mutate} = useMutation({url:`${COMMISSION_BASE_URL}/CommissionInstrumentType/Add`})

    const addNewHandler = async (e: any) => {
        e?.preventDefault()
        await mutate(query).then(res => {
            setModal(false);
            fetchData(insQuery)
            throwToast({type:'success',value:'با موفقیت انجام شد'})
        })
            .catch((err) => {
                throwToast({type:'error',value:err})
            })
    }

    const onChange = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <button className="button bg-lime-600" onClick={() => setModal(true)}>جدید
            </button>
            <Modal title={'جزییات کارمزد جدید'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                   open={modal}>
                <div className="field mt-4">
                    <form >
                        <div className="grid grid-cols-2 gap-4">
                            {
                                toolbar?.map((item: any) => {
                                    return <InputComponent key={item.title}
                                                           query={query}
                                                           item={item}
                                                           onChange={onChange}
                                    />
                                })
                            }
                        </div>
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
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