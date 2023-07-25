import { useState } from "react";
import { toast } from "react-toastify";
import useMutation from "../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../common/functions/notification";
import { SwitchToggle } from "../common/components/button/switch-toggle";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../common/functions/Module-Identifier";

export default function ToggleButton(props: { api: string, data: { isActive: boolean, id: string } }) {
    const [isChecked, setIsChecked] = useState(props.data.isActive)
    const { restriction, module, service } = useSearchFilters(ModuleIdentifier[`CUSTOMER_MANAGEMENT_${props?.api}`], 'modal')
    const { mutate } = useMutation({ url: `${ADMIN_GATEWAY}/api/request/${props.api}/UpdateActivationStatus`, method: "PUT" })
    const changeStatus = async () => {
        await mutate({ id: props.data.id, isActive: !isChecked })
            .then((res) => {
                setIsChecked(!isChecked);
                toast.success(`${res?.data?.result?.message}`)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <SwitchToggle isChecked={isChecked} onChange={changeStatus} allowed={restriction ? [[service, module, 'Edit'].join('.')] : []} />
    )
}