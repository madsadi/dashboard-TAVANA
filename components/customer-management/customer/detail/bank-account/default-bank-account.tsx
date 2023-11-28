import { useContext } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import { Button } from "components/common/components/button/button";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import React, { useState } from "react";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerBankAccountContext } from "./customer-bank-account-info";

export default function DefaultBankAccount() {
  const { fetchHandler, selected } = useContext<any>(
    CustomerBankAccountContext
  );
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/bankAccount/EditDefault`,
    method: "PATCH",
  });
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer
  );
  const [loading, setLoading] = useState<boolean>(false);

  const makeDefaultHandler = async () => {
    setLoading(true);
    await mutate({ id: selected.id })
      .then(() => {
        throwToast({ type: "success", value: "حساب پیش فرض با موفقیت عوض شد" });
        fetchHandler();
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };

  const openModalHandler = () => {
    if (selected) {
      makeDefaultHandler();
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  return (
    <Button
      label={" پیش فرض"}
      className="bg-secondary"
      onClick={openModalHandler}
      loading={loading}
      allowed={
        restriction ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")] : []
      }
    />
  );
}
