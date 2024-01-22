import React, { useContext, useState } from "react";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../../utils/notification";
import { Button } from "../common/components/button/button";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import useMutation from "../../hooks/useMutation";
import { CustomerManagementMarketer } from "pages/holding-management/marketer";

export const CreateRefCode = () => {
  const { selected } = useContext<any>(CustomerManagementMarketer);
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer
  );
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/marketer/CreateRefCode`,
  });
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    setLoading(true);
    mutate({ id: selected[0].id })
      .then((res) => {
        throwToast({ type: "success", value: `${res?.data.result.message}` });
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };

  const openModalHandler = () => {
    if (selected[0]) {
      submitHandler();
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  return (
    <Button
      label={"بروزرسانی لینک"}
      onClick={openModalHandler}
      loading={loading}
      allowed={
        restriction
          ? [[service?.[0], modules?.[0]?.[2], "Create"].join(".")]
          : []
      }
    />
  );
};
