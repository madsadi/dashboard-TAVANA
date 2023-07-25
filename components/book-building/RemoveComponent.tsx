import React, { useContext, useState } from "react";
import Modal from "../common/layout/Modal";
import { BookBuildingContext } from "./BookBuilding";
import { throwToast } from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../api/constants";
import { Button } from "../common/components/button/button";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";

export default function RemoveModal() {
    const { selectedRows } = useContext<any>(BookBuildingContext)
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/DeleteBookBuilding`, method: "DELETE" })
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { restriction, modules, service } = useSearchFilters(ModuleIdentifier.BOOK_BUILDING)

    const confirmDeleteSelected = () => {
        if (selectedRows.length === 1) {
            setModal(true);
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه را انتخاب کنید' })
        }
    }

    const deleteHandler = async () => {
        setLoading(true)
        await mutate({}, { InstrumentId: selectedRows[0]?.instrumentId })
            .then(() => {
                setModal(false);
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
            })
            .catch(err => {
                throwToast({ type: 'error', value: err })
            })
            .finally(() => setLoading(false))
    }


    return (
        <>
            <Button label={'حذف'}
                className="bg-red-600"
                onClick={confirmDeleteSelected}
                allowed={restriction ? [[service[0], modules[0][0], 'Delete'].join('.')] : []}
            />
            <Modal title={'تایید حذف'} open={modal} setOpen={setModal}>
                <div className="flex flex-col">
                    <div className={'mx-auto'}>آیا از حذف ردیف مورد نظر اطمینان دارید؟</div>
                    <div className={'mr-auto space-x-reverse space-x-2 mt-10'}>
                        <Button label={'خیر'}
                            className="bg-red-500"
                            onClick={() => {
                                setModal(false)
                            }}
                        />
                        <Button label={'بله'}
                            className="bg-lime-500"
                            loading={loading}
                            onClick={deleteHandler}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}