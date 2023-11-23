import React, { useState } from "react";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../../utils/notification";
import { SwitchToggle } from "../../common/components/button/switch-toggle";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { useSearchFilters } from "hooks/useSearchFilters";

export default function RoleToggleButton(props: {
  data: { id: string; isActive: boolean };
}) {
  const [isChecked, setIsChecked] = useState(props.data.isActive);
  const { mutate } = useMutation({
    url: `${IDP}/api/roles/${isChecked ? "deactive" : "active"}`,
  });
  const { service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.USER_MANAGEMENT_roles
  );
  const changeStatus = async () => {
    await mutate({}, { id: props.data.id })
      .then(() => {
        setIsChecked(!isChecked);
        throwToast({ type: "success", value: `وضعیت نقش عوض شد` });
      })
      .catch((err) => throwToast({ type: "error", value: err }));
  };

  let whoIsAllowed = ["DeActive", "Active"].map((p: string) =>
    [service?.[0], modules?.[0]?.[0], p].join(".")
  );
  return (
    <SwitchToggle
      isChecked={isChecked}
      onChange={changeStatus}
      allowed={restriction ? whoIsAllowed : []}
    />
  );
}
