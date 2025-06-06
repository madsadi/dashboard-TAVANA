import React, { useContext, useState } from "react";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../../utils/notification";
import useQuery from "../../hooks/useQuery";
import { Button } from "../common/components/button/button";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { CustomerManagementBranch } from "pages/holding-management/branch";

export const TBSBranches = () => {
  const { fetchAsyncData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetAndSaveBranches`,
  });
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_branch,
    "modal"
  );
  const { fetchData, query: searchQuery } = useContext<any>(
    CustomerManagementBranch
  );
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    setLoading(true);
    fetchAsyncData()
      .then((res) => {
        fetchData(searchQuery);
        throwToast({ type: "success", value: `${res?.data.result.message}` });
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };
  return (
    <Button
      label={"دریافت شعب TBS"}
      onClick={submitHandler}
      loading={loading}
      allowed={
        restriction ? [[service?.[0], modules?.[0]?.[1], "Read"].join(".")] : []
      }
    />
  );
};
