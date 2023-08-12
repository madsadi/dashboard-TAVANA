import Modal from "../../common/layout/modal";
import React, { useContext, useState } from "react";
import { throwToast } from "../../common/functions/notification";
import useMutation from "../../../hooks/useMutation";
import { COMMISSION_BASE_URL } from "../../../api/constants";
import { Button } from "../../common/components/button/button";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import { InstrumentTypeContext } from "pages/commission-management/instrument-type";

export default function Edit() {
    const { restriction, service, modules } = useSearchFilters(ModuleIdentifier.COMMISSION_MANAGEMENT_instrument)
    const [modal, setModal] = useState(false)
    const { mutate } = useMutation({ url: `${COMMISSION_BASE_URL}/api/CommissionInstrumentType/Update`, method: "PUT" })
    const { selectedRows } = useContext<any>(InstrumentTypeContext)
    const [query, setQuery] = useState<{ sectorCode: string, subSectorCode: string }>({ sectorCode: '', subSectorCode: '' });
    const [loading, setLoading] = useState<boolean>(false);

    const queryUpdate = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    const openUpdate = () => {
        if (selectedRows.length === 1) {
            setModal(true);
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه را انتخاب کنید' })
        }
    }
    const updateHandler = async () => {
        setLoading(true)
        await mutate({
            id: selectedRows[0]?.id,
            sectorCode: query.sectorCode,
            subSectorCode: query.subSectorCode
        })
            .then(res => {
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
                setModal(false)
                setQuery({ sectorCode: '', subSectorCode: '' })
            })
            .catch((err) => {
                throwToast({ type: 'error', value: err })
            })
            .finally(() => setLoading(false))
    }
    return (
        <>
            <Button label="ویرایش"
                onClick={() => setModal(true)}
                className="bg-lime-600"
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Edit'].join('.')] : []}
            />
            <button className="button bg-orange-400" onClick={openUpdate}>ویرایش</button>
            <Modal title={'ویرایش'} ModalWidth={'max-w-3xl'} open={modal} setOpen={setModal}>
                <form className={'grid grid-cols-3 gap-4'}>
                    <div>
                        <label className={'block'} htmlFor="subSectorCode">کد گروه صنعت</label>
                        <input id="subSectorCode"
                            value={query.subSectorCode}
                            onChange={(e) => queryUpdate('subSectorCode', e.target.value)} />
                    </div>
                    <div>
                        <label className={'block'} htmlFor="sectorCode">کد زیرگروه صنعت</label>
                        <input id="sectorCode"
                            value={query.sectorCode}
                            onChange={(e) => queryUpdate('sectorCode', e.target.value)} />
                    </div>
                </form>
                <div className={'flex justify-end space-x-reverse space-x-2'}>
                    <Button label="لغو"
                        onClick={() => setModal(false)}
                        className="bg-red-500"
                    />
                    <Button label="تایید"
                        onClick={updateHandler}
                        loading={loading}
                        className="bg-lime-600"
                    />
                </div>
            </Modal>
        </>
    )
}