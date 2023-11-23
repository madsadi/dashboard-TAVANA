import { ModuleIdentifier } from "utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import React from "react";
import RulesList from "../../components/market-rules-management/rules-list";

function Index() {
  return (
    <div className="flex flex-col h-full grow">
      <RulesList />
    </div>
  );
}

export default withPermission(Index, ModuleIdentifier.MARKET_RULES_MANAGEMENT);
