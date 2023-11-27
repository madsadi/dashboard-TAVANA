import React from "react";
import AddNew from "./add-new";
import EditActivationStatus from "./edti-acivation";
import Remove from "./remove";
import EditCustomerIdentity from "./edit-customer-identity";
import EditCustomerNationality from "./edit-customer-nationality";
import EditCustomerMarketer from "./edit-customer-marketer";
import EditCustomerReagent from "./edit-customer-reagnet";
import EditCustomerBranch from "./edit-customer-branch";
import { useRouter } from "next/router";

export default function CustomerToolbar() {
  const router = useRouter();
  const displayCondition = router.pathname.includes("[...userId]");

  return (
    <div className={"border-x border-border"}>
      <div className={"toolbar p-2"}>
        {!displayCondition ? <AddNew /> : null}
        <EditActivationStatus />
        <EditCustomerIdentity />
        <EditCustomerNationality />
        <EditCustomerMarketer />
        <EditCustomerReagent />
        <EditCustomerBranch />
        <Remove />
      </div>
    </div>
  );
}
