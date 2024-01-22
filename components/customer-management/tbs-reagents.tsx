import React, { useContext, useState } from "react";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../../utils/notification";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { Button } from "../common/components/button/button";
import useQuery from "hooks/useQuery";
import { CustomerManagementMarketer } from "pages/holding-management/marketer";

export const TBSReagents = () => {
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer,
    "modal"
  );
  const { fetchAsyncData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetAndSaveReagents`,
  });
  const { fetchData } = useContext<any>(CustomerManagementMarketer);
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    setLoading(true);
    fetchAsyncData()
      .then((res) => {
        fetchData();
        throwToast({ type: "success", value: `${res?.data.result.message}` });
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };
  return (
    <Button
      label={"دریافت معرف TBS"}
      onClick={submitHandler}
      loading={loading}
      allowed={
        restriction ? [[service?.[0], modules?.[0]?.[1], "Read"].join(".")] : []
      }
    />
  );
};
