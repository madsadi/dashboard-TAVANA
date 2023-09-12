import { MARKETER_ADMIN } from "api/constants";
import { SwitchToggle } from "components/common/components/button/switch-toggle";
import { ModuleIdentifier } from "components/common/functions/Module-Identifier";
import { throwToast } from "components/common/functions/notification";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ToggleButton(props: { data: { isActive: boolean, id: string } }) {
    const [isChecked, setIsChecked] = useState(props.data.isActive)
    const { restriction, modules, service } = useSearchFilters(ModuleIdentifier.MARKETER_APP_marketerContract, 'modal')
    const { mutate } = useMutation({ url: `${MARKETER_ADMIN}/marketer-contract/modify-status`, method: "PUT" })

    const changeStatus = async () => {
        await mutate({ id: props.data.id })
            .then((res) => {
                setIsChecked(!isChecked);
                toast.success(`${res?.data?.result?.message}`)
            })
            .catch((err) => throwToast({ type: 'error', value: err }))
    }

    return (
        <SwitchToggle isChecked={isChecked} onChange={changeStatus} allowed={restriction ? [[service?.[0], modules?.[0]?.[0], 'Edit'].join('.')] : []} />
    )
}