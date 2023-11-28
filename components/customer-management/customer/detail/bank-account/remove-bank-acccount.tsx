import { useContext } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import { Button } from "components/common/components/button/button";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import React, { useState } from "react";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerBankAccountContext } from "./customer-bank-account-info";

export default function RemoveBankAccount() {
  const { fetchHandler, selected } = useContext<any>(
    CustomerBankAccountContext
  );
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/bankAccount/Delete`,
    method: "PATCH",
  });
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer
  );
  const [loading, setLoading] = useState<boolean>(false);

  const removeHandler = async () => {
    setLoading(true);
    await mutate({ id: selected.id })
      .then(() => {
        throwToast({ type: "success", value: "حساب بانکی با موفقیت حذف شد" });
        fetchHandler();
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };

  const openModalHandler = () => {
    if (selected) {
      removeHandler();
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای حذف انتخاب کنید",
      });
    }
  };

  return (
    <Button
      label={"حذف "}
      className="bg-error"
      onClick={openModalHandler}
      loading={loading}
      allowed={
        restriction
          ? [[service?.[0], modules?.[0]?.[0], "Delete"].join(".")]
          : []
      }
    />
  );
}
