import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
import useQuery from "../../hooks/useQuery";
import { CREDIT_MANAGEMENT } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { CreditContractToolbar } from "components/credit/contract/credit-contract-toolbar";

export const CreditContractContext = createContext({});
function CreditContract() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${CREDIT_MANAGEMENT}/Contract/Search`,
  });

  return (
    <CreditContractContext.Provider
      value={{ selected: selectedRows[0], fetchData: () => fetchData(query) }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.CREDIT_contract}
          />
        </AccordionComponent>
        <CreditContractToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.CREDIT_contract}
          rowId={["contractId", "customerId"]}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </CreditContractContext.Provider>
  );
}

export default withPermission(CreditContract, ModuleIdentifier.CREDIT_contract);
