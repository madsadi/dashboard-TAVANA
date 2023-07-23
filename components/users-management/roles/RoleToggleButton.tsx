import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";
import { SwitchToggle } from "../../common/components/button/switch-toggle";
import filters from "../../../constants/filters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";

export default function RoleToggleButton(props: { data: { id: string, isActive: boolean } }) {
    const [isChecked, setIsChecked] = useState(props.data.isActive)
    const { mutate } = useMutation({ url: `${IDP}/api/roles/${isChecked ? 'deactive' : 'active'}` })

    const changeStatus = async () => {
        await mutate({}, { id: props.data.id })
            .then(() => {
                setIsChecked(!isChecked);
                throwToast({ type: 'success', value: `وضعیت نقش عوض شد` })
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    let whoIsAllowed = ['DeActive', 'Active'].map((p: string) => [filters[ModuleIdentifier.USER_MANAGEMENT_roles]?.service, filters[ModuleIdentifier.USER_MANAGEMENT_roles]?.module, p].join('.'))
    return (
        <SwitchToggle isChecked={isChecked} onChange={changeStatus} allowed={whoIsAllowed}
        />
    )
}