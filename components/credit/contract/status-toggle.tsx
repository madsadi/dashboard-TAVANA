import { CREDIT_MANAGEMENT } from "api/constants";
import { SwitchToggle } from "components/common/components/button/switch-toggle";
import { ModuleIdentifier } from "utils/Module-Identifier";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { useState } from "react";
import { toast } from "react-toastify";

export default function StatusToggle(props: {
  data: { isActive: boolean; id: string; creditContractCode: string };
}) {
  const [isChecked, setIsChecked] = useState(props.data.isActive);
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CREDIT_contract
  );
  const { mutate } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Contract/Status/Edit`,
    method: "PUT",
    onSuccess: () => {
      setIsChecked(!isChecked);
      toast.success(`با موفقیت انجام شد`);
    },
  });

  return (
    <SwitchToggle
      isChecked={isChecked}
      onChange={() =>
        mutate({
          contractId: props.data.id,
          creditContractCode: props.data.creditContractCode,
          status: isChecked ? "1" : "2",
        })
      }
      allowed={
        restriction ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")] : []
      }
    />
  );
}
