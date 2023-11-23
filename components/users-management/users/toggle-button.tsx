import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../../utils/notification";
import { SwitchToggle } from "../../common/components/button/switch-toggle";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { useSearchFilters } from "hooks/useSearchFilters";

export default function ToggleButton(props: {
  data: { isActive: boolean; id: string };
}) {
  const [isChecked, setIsChecked] = useState(props.data.isActive);
  const { mutate } = useMutation({
    url: `${IDP}/api/users/change-user-active-status`,
  });
  const { service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.USER_MANAGEMENT_users
  );

  const changeStatus = async () => {
    await mutate({ userId: props.data.id, isActive: !isChecked })
      .then(() => {
        setIsChecked(!isChecked);
        throwToast({ type: "success", value: "وضعیت کاربر عوض شد" });
      })
      .catch((err) => throwToast({ type: "error", value: err }));
  };

  return (
    <SwitchToggle
      isChecked={isChecked}
      onChange={changeStatus}
      allowed={
        restriction
          ? [
              [service?.[0], modules?.[0]?.[0], "ChangeUserActiveStatus"].join(
                "."
              ),
            ]
          : []
      }
    />
  );
}
