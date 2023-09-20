import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/layout/modal";
import usePageStructure from "../../hooks/usePageStructure";
import { CustomerManagement } from "../../pages/customer-management/[[...page]]";
import { throwToast } from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../api/constants";
import { Button } from "../common/components/button/button";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";

export default function Remove() {
    const [modal, setModal] = useState(false)
    const [targetToEdit, setTargetToEdit] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { page } = usePageStructure()
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/${page.api}/Delete`, method: "DELETE" })
    const { fetchData, query, selectedRows, setSelectedRows } = useContext<any>(CustomerManagement)
    const { restriction, modules, service } = useSearchFilters(ModuleIdentifier[`CUSTOMER_MANAGEMENT_${page?.api}`], 'modal')

    useEffect(() => {
        if (!modal) {
            setSelectedRows([])
        }
    }, [modal])

    const removeHandler = async () => {
        setLoading(true)
        await mutate({}, { Id: targetToEdit.id })
            .then(() => {
                setModal(false);
                fetchData(query)
            })
            .catch(() => {
                setModal(false);
            })
            .finally(() => setLoading(false))
    }

    const openModalHandler = () => {
        if (selectedRows.length === 1) {
            setTargetToEdit(selectedRows[0])
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای حذف انتخاب کنید' })
        }
    }


    return (
        <>
            <Button label={'حذف'}
                className="bg-error"
                onClick={openModalHandler}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Delete'].join('.')] : []}
            />
            <Modal title={` حذف ${page?.searchFilter} `} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <div>{
                        "آیا از حذف"
                        + " " +
                        page?.searchFilter + " " +
                        targetToEdit?.title + " " +
                        "اطمینان دارید؟"
                    }
                    </div>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <Button label={'لغو'}
                            className="bg-error"
                            onClick={() => setModal(false)}
                        />
                        <Button label={'تایید'}
                            className="bg-primary"
                            loading={loading}
                            onClick={removeHandler}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}