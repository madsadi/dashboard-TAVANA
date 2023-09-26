import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/layout/modal";
import usePageStructure from "../../hooks/usePageStructure";
import InputComponent from "../common/components/input-generator";
import { DayRange } from "@amir04lm26/react-modern-calendar-date-picker";
import { CustomerManagement } from "../../pages/customer-management/[[...page]]";
import ExtraDateAndTimeInput from "./extra-date-time-input";
import { throwToast } from "../common/functions/notification";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../api/constants";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";
import { Button } from "../common/components/button/button";

export default function AddNew() {
    const [modal, setModal] = useState(false)
    const { page } = usePageStructure()
    const { fetchData, query: searchQuery } = useContext<any>(CustomerManagement)
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/${page?.api}/Add` })
    const { toolbar, restriction, modules, service } = useSearchFilters(ModuleIdentifier[`CUSTOMER_MANAGEMENT_${page?.api}`], 'modal')
    const [query, setQuery] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });
    let initialValue: any = {};

    useEffect(() => {
        if (modal) {
            setQuery(null)
        }
    }, [modal])

    const addNewHandler = async (e: any, query: any) => {
        e.preventDefault()
        let _body: any = {}
        Object.keys(query).map((item: any) => {
            if (typeof query[`${item}`] === 'object' && query[`${item}`]) {
                let value = '';
                Object.keys(query[`${item}`]).sort().map((child: any) => {
                    if (query[`${item}`][`${child}`] !== undefined && query[`${item}`][`${child}`] !== null && query[`${item}`][`${child}`] !== '') {
                        value = value + query[`${item}`][`${child}`]
                    }
                })
                _body[`${item}`] = value
            } else {
                if (query[`${item}`] !== undefined && query[`${item}`] !== null && query[`${item}`] !== '') {
                    _body[`${item}`] = query[`${item}`]
                }
            }
        })
        if (toolbar.filter((field: any) => field.isRequired)?.every((item: any) => query[item.title] !== undefined && query[item.title] !== null && query[item.title] !== '')) {
            setLoading(true)
            await mutate(_body)
                .then((res) => {
                    fetchData(searchQuery)
                    setQuery(initialValue)
                    setModal(false);
                })
                .catch((err) => {
                    throwToast({ type: 'error', value: err })
                })
                .finally(() => setLoading(false))
        } else {
            throwToast({ type: 'warning', value: ` ورودی های ${toolbar.filter((field: any) => field.isRequired).filter((item: any) => query[item.title] === undefined || query[item.title] === null || query[item.title] === '').map((item: any) => item.name).join(',')}  اجباری می باشد. ` })
        }
    }

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }

    return (
        <>
            <Button label={'جدید'}
                className="bg-primary "
                onClick={() => setModal(true)}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Create'].join('.')] : []}
            />
            <Modal title={` ایجاد${page?.searchFilter} جدید `} ModalWidth={'max-w-3xl'} setOpen={setModal} open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            toolbar?.map((item: any) => {
                                return <InputComponent key={item.title}
                                    query={query}
                                    item={item}
                                    setQuery={setQuery}
                                    onChange={onChange}
                                    selectedDayRange={selectedDayRange}
                                    setSelectedDayRange={setSelectedDayRange}
                                />
                            })
                        }
                    </form>
                    {page?.api === 'customerAgreement' && <ExtraDateAndTimeInput setQuery={setQuery} query={query} />}
                    <div className={'flex justify-end space-x-reverse space-x-2 mt-10'}>
                        <Button label={'لغو'}
                            className="bg-error "
                            onClick={() => setModal(false)}
                        />
                        <Button label={'تایید'}
                            className="bg-primary "
                            type={'submit'}
                            loading={loading}
                            onClick={(e) => addNewHandler(e, query)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}