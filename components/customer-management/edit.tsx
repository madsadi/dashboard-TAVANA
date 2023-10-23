import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/layout/modal";
import usePageStructure from "../../hooks/usePageStructure";
import InputComponent from "../common/components/input-generator";
import { CustomerManagement } from "../../pages/customer-management/[[...page]]";
import { throwToast } from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../api/constants";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";
import { Button } from "../common/components/button/button";

export default function Edit() {
    const { page } = usePageStructure()
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/${page.api}/Update`, method: "PUT" })
    const { toolbar, restriction, service, modules } = useSearchFilters(ModuleIdentifier[`CUSTOMER_MANAGEMENT_${page?.api}`], 'modal')

    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { fetchData, selectedRows, query: searchQuery } = useContext<any>(CustomerManagement)

    useEffect(() => {
        if (toolbar && selectedRows[0]) {
            let ToEdit = selectedRows[0]
            let initialValue: any = {};
            toolbar?.map((item: any) => {
                if (typeof ToEdit[item.title] == "string" || typeof ToEdit[item.title] == "number") {
                    initialValue[item.title] = ToEdit[item.title];
                }
                if (ToEdit.address?.[item.title] !== undefined) {
                    initialValue[item.title] = ToEdit.address[item.title];
                }
                if (ToEdit.region?.[item.title] !== undefined) {
                    initialValue[item.title] = ToEdit.region[item.title];
                }
                if (item.title === "address") { // due to database exception
                    initialValue[item.title] = ToEdit.address["remnantAddress"];
                }
            })
            setQuery(initialValue)
        }
    }, [toolbar, selectedRows[0]])

    const editHandler = async (e: any) => {
        setLoading(true)
        await mutate({ ...query, id: selectedRows[0]?.id, addressId: selectedRows[0]?.address?.id })
            .then((res) => {
                fetchData(searchQuery)
                setModal(false);
                setQuery(null)
            })
            .catch((err: any) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }

    const openModalHandler = () => {
        if (selectedRows.length === 1) {
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای تغییر انتخاب کنید' })
        }
    }
    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <Button label={'ویرایش'}
                className="bg-secondary "
                onClick={openModalHandler}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Edit'].join('.')] : []}
            />
            <Modal title={` ویرایش ${page?.searchFilter} `} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            toolbar?.map((item: any) => {
                                return <InputComponent key={item.title}
                                    query={query}
                                    item={item}
                                    onChange={onChange}
                                    setQuery={setQuery}
                                    dataHelper={selectedRows[0]}
                                />
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <Button label={'لغو'}
                            className="bg-error "
                            onClick={() => setModal(false)}
                        />
                        <Button label={'تایید'}
                            className="bg-primary "
                            loading={loading}
                            onClick={editHandler}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}