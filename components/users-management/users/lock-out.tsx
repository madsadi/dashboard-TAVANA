import React, { useContext, useEffect, useState } from "react";
import Modal from "../../common/layout/modal";
import InputComponent from "../../common/components/input-generator";
import { UsersContext } from "../../../pages/users-management/users";
import { DayValue } from "react-modern-calendar-datepicker";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";
import { Button } from "../../common/components/button/button";

export default function LockOut() {
    const { toolbar, modules, service, restriction } = useSearchFilters(ModuleIdentifier.USER_MANAGEMENT_users, 'lock-out')
    const { selectedRows } = useContext<any>(UsersContext)
    const { mutate } = useMutation({ url: `${IDP}/api/users/set-lockout-end-date` })
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false);

    const lockHandler = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        await mutate({ userId: selectedRows[0].id, lockoutEndDateTime: query.lockoutEndDateTime })
            .then(() => {
                throwToast({ type: 'success', value: 'با موفقیت انجام شد' })
                setModal(false)
                setQuery({})
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
            .finally(() => setLoading(false))
    }
    const openHandler = () => {
        if (selectedRows.length) {
            setModal(true)
        } else {
            throwToast({ type: 'warning', value: 'لطفا یک گزینه برای تغییر انتخاب کنید' })
        }
    }

    useEffect(() => {
        if (!modal) {
            let _initialValue: any = {};
            _initialValue.lockoutEndDateTime = null
            setQuery(_initialValue)
        }
    }, [modal])

    const onChange = (key: string, value: any) => {
        let _query: any = { ...query };
        _query[key] = value
        setQuery(_query)
    }
    return (
        <>
            <Button label={'قفل/باز کردن حساب کاربری'}
                onClick={openHandler}
                allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'SetLockoutEndDate'].join('.')] : []}
            />
            <Modal title={'قفل/باز کردن حساب کاربری'} setOpen={setModal}
                open={modal}>
                <div className="field mt-4">
                    <form className={'grid grid-cols-2 gap-4'}>
                        {
                            toolbar.map((item: any) => {
                                return <InputComponent key={item.title}
                                    query={query}
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
                            onClick={lockHandler}
                            type={"submit"}
                            loading={loading}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}