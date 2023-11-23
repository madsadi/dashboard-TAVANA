import React, { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";
import { getLink } from "../../../api/users-management.api";
import { throwToast } from "../../../utils/notification";
import usePageStructure from "../../../hooks/usePageStructure";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { isAllowed } from "../../../utils/permission-utils";
import { useSelector } from "react-redux";
import { Button } from "./button/button";
import copy from "copy-to-clipboard";

interface CopyButtonProps {
  entity: string;
  id: string;
  condition: boolean;
  inputModule?: string;
}

export const CopyButton = (props: CopyButtonProps) => {
  const { entity, id, condition, inputModule } = props;
  const { page } = usePageStructure();
  const { restriction, modules, service } = useSearchFilters(
    inputModule || ModuleIdentifier[`CUSTOMER_MANAGEMENT_${page?.api}`]
  );
  const { user_permissions: userPermissions } = useSelector(
    (state: any) => state.appConfig
  );
  const [loading, setLoading] = useState(false);
  const getLinkReq = async (id: string) => {
    if (
      restriction
        ? isAllowed({
            userPermissions,
            whoIsAllowed: [[service?.[0], modules?.[0]?.[0], "Read"].join(".")],
          })
        : true
    ) {
      setLoading(true);
      await getLink({ marketerId: id })
        .then((res) => {
          throwToast({ type: "success", value: "لینک کپی شد" });
          copy(res?.result[entity]);
        })
        .catch(() =>
          throwToast({ type: "customError", value: "دوباره امتحان کنید" })
        )
        .finally(() => setLoading(false));
    } else {
      throwToast({ type: "warning", value: "دسترسی لازم ندارید" });
    }
  };

  return (
    <>
      {condition ? (
        <Button
          label={"کپی"}
          icon={<LinkIcon className={"h-4 w-4"} />}
          className="flex mt-1 border border-border rounded-lg p-1 !text-black bg-white items-center h-6"
          onClick={() => getLinkReq(id)}
          loading={loading}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Read"].join(".")]
              : []
          }
        />
      ) : null}
    </>
  );
};
