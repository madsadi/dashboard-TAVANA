import { useContext } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import { Button } from "components/common/components/button/button";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import React, { useState } from "react";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerJobInfoContext } from "./customer-job-info";

export default function RemoveJob() {
  const { fetchHandler, customerId } = useContext<any>(CustomerJobInfoContext);
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/jobInfo/Delete`,
    method: "PATCH",
  });
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer
  );
  const [loading, setLoading] = useState<boolean>(false);

  const removeHandler = async () => {
    setLoading(true);
    await mutate({ customerId: customerId })
      .then(() => {
        throwToast({ type: "success", value: "اطلاعات شغلی با موفقیت حذف شد" });
        fetchHandler();
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button
      label={"حذف "}
      className="bg-error"
      onClick={removeHandler}
      loading={loading}
      allowed={
        restriction
          ? [[service?.[0], modules?.[0]?.[0], "Delete"].join(".")]
          : []
      }
    />
  );
}
