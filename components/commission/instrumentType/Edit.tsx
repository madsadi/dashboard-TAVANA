import Modal from "../../common/layout/Modal";
import React, {useContext, useState} from "react";
import {updateCommission} from "../../../api/commission.api";
import {toast} from "react-toastify";
import {InstrumentTypeContext} from "./ResultTable";

export default function Edit(){
    const  [modal,setModal] = useState(false)
    const {selectedRows} = useContext<any>(InstrumentTypeContext)
    const [query, setQuery] = useState<{sectorCode:string,subSectorCode:string}>({sectorCode:'',subSectorCode:''});

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const openUpdate = () => {
        if (selectedRows.length ===1) {
            setModal(true);
        } else {
            toast.warning('لطفا یک گزینه را انتخاب کنید')
        }
    }
    const updateHandler = async () => {
        await updateCommission({
            id: selectedRows[0]?.id,
            sectorCode: query.sectorCode,
            subSectorCode: query.subSectorCode
        })
            .then(res => {
                toast.success('با موفقیت انجام شد')
                setModal(false)
                setQuery({sectorCode:'',subSectorCode:''})
            })
            .catch(err => toast.error(`${err?.response?.data?.title}`))
    }
    return(
        <>
            <button className="button bg-orange-400" onClick={openUpdate}>ویرایش</button>
            <Modal title={'ویرایش'} ModalWidth={'max-w-3xl'} open={modal} setOpen={setModal}>
                <form className={'grid grid-cols-3 gap-4'}>
                    <div>
                        <label className={'block'} htmlFor="subSectorCode">کد گروه صنعت</label>
                        <input id="subSectorCode"
                               value={query.subSectorCode}
                               onChange={(e) => queryUpdate('subSectorCode',e.target.value)}/>
                    </div>
                    <div>
                        <label className={'block'} htmlFor="sectorCode">کد زیرگروه صنعت</label>
                        <input id="sectorCode"
                               value={query.sectorCode}
                               onChange={(e) => queryUpdate('sectorCode',e.target.value)}/>
                    </div>
                </form>
                <div className={'flex justify-end space-x-reverse space-x-2'}>
                    <button className="button bg-red-500" onClick={()=>setModal(false)}>لغو</button>
                    <button className="button bg-lime-500" onClick={updateHandler}>تایید</button>
                </div>
            </Modal>
        </>
    )
}