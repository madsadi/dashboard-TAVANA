import React, { useEffect, useState } from "react";
import Modal from "../common/layout/modal";
import moment from "jalali-moment";
import InputComponent from "../common/components/input-generator";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../common/functions/notification";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";
import { Button } from "../common/components/button/button";

export default function AddModal() {
    const { toolbar, restriction, modules, service } = useSearchFilters(ModuleIdentifier.BOOK_BUILDING, 'add')
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/addBookBuilding` })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const addNewHandler = async () => {
        if (query?.InstrumentId && query?.maxQuantity) {
            setLoading(true)
            await mutate({
                instrumentId: query.InstrumentId,
                maxQuantity: query.maxQuantity,
                minPrice: query.minPrice,
                maxPrice: query.maxPrice,
                fromActiveDateTime: moment(query.StartDate).locale('en').format('YYYY-MM-DD') + `${query?.startHour ? 'T' + query?.startHour + ':' : ''}` + `${query?.startMinute ? query?.startMinute + ':00.000Z' : ''}`,
                toActiveDateTime: moment(query.EndDate).locale('en').format('YYYY-MM-DD') + `${query?.endHour ? 'T' + query?.endHour + ':' : ''}` + `${query?.endMinute ? query?.endMinute + ':00.000Z' : ''}`,
            })
                .then(() => {
                    setModal(false)
                    throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
                    setQuery(null)
                })
                .catch((err) => throwToast({ type: 'error', value: err }))
                .finally(() => setLoading(false))
        } else {
            if (!query.maxQuantity) {
                throwToast({ type: 'warning', value: 'بیشینه حجم سفارش را لطفا وارد کنید' })
            } else if (!query.instrumentId) {
                throwToast({ type: 'warning', value: 'کد نماد را لطفا وارد کنید' })
            }
        }
    }

    useEffect(() => {
        if (!modal) {
            setQuery(null)
        }
    }, [modal])

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <Button label={'جدید'}
                className="bg-primary"
                onClick={() => setModal(true)}
                allowed={restriction ? [[service[0], modules[0][0], 'Create'].join('.')] : []}
            />
            <Modal title={'عرضه اولیه جدید'} ModalWidth={'max-w-3xl'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            toolbar.map((item: any) => {
                                return <InputComponent key={item.title}
                                    query={query}
                                    setQuery={setQuery}
                                    item={item}
                                    onChange={onChange}
                                />
                            })
                        }
                    </form>
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <Button label={'لغو'}
                            className="bg-error"
                            onClick={(e) => {
                                e.preventDefault()
                                setModal(false)
                            }}
                        />
                        <Button label={'تایید'}
                            className="bg-primary"
                            type={"submit"}
                            loading={loading}
                            onClick={addNewHandler}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}