import { useState } from "react";
import { toast } from "react-toastify";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { throwToast } from "../../../utils/notification";
import { SwitchToggle } from "../../common/components/button/switch-toggle";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";

export default function ToggleButtonStation(props: {
  data: { isActive: boolean; id: string };
}) {
  const [isChecked, setIsChecked] = useState(props.data.isActive);
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer,
    "modal"
  );
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/station/EditActivationStatus`,
    method: "PATCH",
  });
  const changeStatus = async () => {
    await mutate({ id: props.data.id, isActive: !isChecked })
      .then((res) => {
        setIsChecked(!isChecked);
        toast.success(`${res?.data?.result?.message}`);
      })
      .catch((err) => throwToast({ type: "error", value: err }));
  };

  return (
    <SwitchToggle
      isChecked={isChecked}
      onChange={changeStatus}
      allowed={
        restriction ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")] : []
      }
    />
  );
}
