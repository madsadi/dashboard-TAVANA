import React, { useContext, useState } from "react";
import Modal from "../../common/layout/modal";
import InputComponent from "../../common/components/input-generator";
import { throwToast } from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import { Button } from "../../common/components/button/button";
import { InstrumentTypeContext } from "pages/commission-management/instrument-type";

export default function AddNew() {
    const { toolbar, restriction, service, modules } = useSearchFilters(ModuleIdentifier.COMMISSION_MANAGEMENT_instrument, 'add')
    const [modal, setModal] = useState(false)
    const { fetchData, query: insQuery } = useContext<any>(InstrumentTypeContext)
    const [query, setQuery] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/CommissionInstrumentType/Add` })

    const addNewHandler = async (e: any) => {
        e?.preventDefault()
        setLoading(true)
        await mutate(query)
            .then(res => {
                setModal(false);
                fetchData(insQuery)
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
            })
            .catch((err) => {
                throwToast({ type: 'error', value: err })
            })
            .finally(() => setLoading(false))
    }

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <Button label="جدید"
                onClick={() => setModal(true)}
                className="bg-lime-600"
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Create'].join('.')] : []}
            />
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
                        <Button label="لغو"
                            onClick={() => setModal(false)}
                            className="bg-red-500"
                        />
                        <Button label="تایید"
                            onClick={addNewHandler}
                            loading={loading}
                            className="bg-lime-600"
                        />
                    </div>
                </div>
            </Modal>

        </>
    )
}