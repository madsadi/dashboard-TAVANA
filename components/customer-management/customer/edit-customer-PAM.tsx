import React, { useState } from "react";
import { throwToast } from "../../../utils/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { SwitchToggle } from "components/common/components/button/switch-toggle";

export default function ToogleCustomerPAM(props: {
  data: { isActive: boolean; id: string };
}) {
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customer/EditPAMTrading`,
    method: "PATCH",
  });
  const { restriction, service, modules } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer,
    "edit-customer-identity"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(props.data.isActive);

  const changeStatus = async () => {
    setLoading(true);
    await mutate({ id: props.data.id, isPAMTrader: !isChecked })
      .then((res) => {
        setIsChecked(!isChecked);
      })
      .catch((err) => throwToast({ type: "error", value: err }))
      .finally(() => setLoading(false));
  };

  return (
    <SwitchToggle
      isChecked={isChecked}
      onChange={changeStatus}
      disabled={loading}
      allowed={
        restriction ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")] : []
      }
    />
  );
}
