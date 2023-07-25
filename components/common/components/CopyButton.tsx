import React, { useState } from 'react';
import { LinkIcon } from "@heroicons/react/20/solid";
import { getLink } from "../../../api/users-management.api";
import { throwToast } from "../functions/notification";
import usePageStructure from '../../../hooks/usePageStructure';
import { useSearchFilters } from '../../../hooks/useSearchFilters';
import { ModuleIdentifier } from '../functions/Module-Identifier';
import { isAllowed } from '../functions/permission-utils';
import { useSelector } from 'react-redux';
import { Button } from './button/button';

export const CopyButton = ({ entity, id, condition }: { entity: string, id: string, condition: boolean }) => {
    const { page } = usePageStructure()
    const { restriction, module, service } = useSearchFilters(ModuleIdentifier[`CUSTOMER_MANAGEMENT_${page?.api}`], 'modal')
    const { user_permissions: userPermissions } = useSelector((state: any) => state.appConfig)
    const [loading, setLoading] = useState(false)
    const getLinkReq = async (id: string) => {
        if (restriction ? isAllowed({ userPermissions, whoIsAllowed: [[service, module, 'Read'].join('.')] }) : true) {
            setLoading(true)
            await getLink({ marketerId: id })
                .then((res) => {
                    throwToast({ type: 'success', value: 'لینک کپی شد' })
                    navigator.clipboard.writeText(res?.result[entity])
                })
                .catch(() => throwToast({ type: 'customError', value: 'دوباره امتحان کنید' }))
                .finally(() => setLoading(false))
        } else {
            throwToast({ type: 'warning', value: 'دسترسی لازم ندارید' })
        }
    }

    return (<>
        {condition ? <Button label={'کپی'}
            icon={<LinkIcon className={'h-4 w-4'} />}
            className="flex mt-1 border border-border rounded-lg p-1 !text-black bg-white items-center h-6"
            onClick={() => getLinkReq(id)}
            loading={loading}
            allowed={restriction ? [[service, module, 'Read'].join('.')] : []}
        />
            : null}
    </>
    )
}