import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useState } from "react";
import { throwToast } from "../../../common/functions/notification";
import useMutation from "../../../../hooks/useMutation";
import { ADMIN_GATEWAY, MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../common/functions/Module-Identifier";
import { ReciteContext } from "../../../../pages/marketer-app/recite";

export default function AddMarketerRectie() {
    const { fetchData, searchQuery } = useContext<any>(ReciteContext)
    const { toolbar } = useSearchFilters(ModuleIdentifier.MARKETER_APP_recite, 'add')
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/factor/add-factor` })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})

    const openHandler = () => {
        setModal(true)
    }
    const submitHandler = async (e: any) => {
        e.preventDefault()
        await mutate(query)
            .then((res) => {
                throwToast({ type: 'success', value: `با موفقیت انجام شد` })
                setModal(false)
                setQuery(null)
                fetchData(searchQuery)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }
    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <button className={'button bg-green-500'} onClick={openHandler}>
                اضافه کردن صورت حساب
            </button>
            <Modal title={'ااضافه کردن صورت حساب'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <form onSubmit={submitHandler}>
                        <div className={'grid grid-cols-2 gap-4'} >
                            {
                                toolbar.map((item: any) => {
                                    return <InputComponent key={item.title}
                                        query={query}
                                        item={item}
                                        onChange={onChange}
                                    />
                                })
                            }
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