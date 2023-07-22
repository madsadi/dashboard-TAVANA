import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../common/functions/notification";
import { SwitchToggle } from "../../common/components/button/switch-toggle";
import filters from "../../../dictionary/filters";
import { ModuleIdentifier } from "../../common/functions/Module-Identifier";

export default function ToggleButton(props: { data: { isActive: boolean, id: string } }) {
    const [isChecked, setIsChecked] = useState(props.data.isActive)
    const { mutate } = useMutation({ url: `${IDP}/api/users/change-user-active-status` })

    const changeStatus = async () => {
        await mutate({ userId: props.data.id, isActive: !isChecked })
            .then(() => {
                setIsChecked(!isChecked);
                throwToast({ type: 'success', value: 'وضعیت کاربر عوض شد' })
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <SwitchToggle isChecked={isChecked}
            onChange={changeStatus}
            allowed={[[filters[ModuleIdentifier.USER_MANAGEMENT_users].service, filters[ModuleIdentifier.USER_MANAGEMENT_users].module, 'ChangeUserActiveStatus'].join('.')]}
        />
    )
}