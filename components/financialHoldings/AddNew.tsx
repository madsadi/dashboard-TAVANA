import Modal from "../common/Modal";
import React, {useState} from "react";
import usePageStructure from "../../hooks/usePageStructure";
import {addNew} from "../../api/holdings";
import InputComponent from "../common/InputComponent";

type initialType = { subsidiaryId: string,
    code: number,
    type: number,
    title: string,
    countryId: number,
    provinceId: number,
    cityId: number,
    sectionId: number,
    tel: string,
    mobile: string,
    fax: string,
    address: string,
    alley: string,
    plaque: string,
    postalCode: string
}
const initialValue = {
    subsidiaryId: '',
    code: 0,
    type: 0,
    title: '',
    countryId: 0,
    provinceId: 0,
    cityId: 0,
    sectionId: 0,
    tel: '',
    mobile: '',
    fax: '',
    address: '',
    alley: '',
    plaque: '',
    postalCode: '',
}

export default function AddNew(){
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<initialType>(initialValue)
    const {page} = usePageStructure()

    const queryUpdate = (key: string, value: any) => {
        let _query: any = {...query};
        _query[key] = value
        setQuery(_query)
    }

    const addNewHandler = async ()=>{
        await addNew(page.api,query)
            .then(()=> {
                setModal(false);
                setQuery(initialValue)
            })
            .catch(()=> {
                setModal(false);
                setQuery(initialValue)
            })
    }

    return(
        <>
            <Modal title={` ایجاد${page?.searchFilter} جدید `} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            (page?.form)?.map((item: any) => {
                                return <InputComponent key={item.title} query={query} title={item?.title}
                                                       name={item?.name} queryUpdate={queryUpdate}
                                                       type={item?.type}/>
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-4'}>
                        <button className="p-1 px-3 rounded-full bg-red-500"
                                onClick={() => setModal(false)}>لغو
                        </button>
                        <button className="p-1 px-3 rounded-full bg-lime-600" onClick={addNewHandler}>تایید</button>
                    </div>
                </div>
            </Modal>
            <button className="p-1 px-2 rounded-full bg-lime-600 mx-2" onClick={() => setModal(true)}>جدید
            </button>
        </>
    )
}