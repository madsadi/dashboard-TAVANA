import React, { useContext, useState } from "react";
import { ADMIN_GATEWAY } from "../../api/constants";
import { throwToast } from "../../utils/notification";
import { CustomerManagement } from "../../pages/customer-management/[[...page]]";
import useQuery from "../../hooks/useQuery";
import { Button } from "../common/components/button/button";
import usePageStructure from "../../hooks/usePageStructure";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../utils/Module-Identifier";

export const TBSBranches = () => {
  const { fetchAsyncData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetAndSaveBranches`,
  });
  const { page } = usePageStructure();
  const { restriction, modules, service } = useSearchFilters(
    //@ts-ignore
    ModuleIdentifier[`CUSTOMER_MANAGEMENT_${page?.api}`],
    "modal"
  );
  const { fetchData, query: searchQuery } = useContext<any>(CustomerManagement);
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
