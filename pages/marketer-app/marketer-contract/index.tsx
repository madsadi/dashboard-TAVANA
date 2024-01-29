import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);
const AccordionComponent = dynamic(
  () => import("../../../components/common/components/accordion")
);
import useQuery from "../../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import MarketerContractToolbar from "components/marketer-app/marketer-contract/toolbar/marketer-contract-toolbar";

export const MarketerContractContext = createContext({});
function MarketerContract() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const {
    data,
    fetchData,
    query: searchQuery,
    loading,
  }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer-contract/search` });

  return (
    <MarketerContractContext.Provider
      value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.MARKETER_APP_marketerContract}
          />
        </AccordionComponent>
        <MarketerContractToolbar />
        <TableComponent
          loading={loading}
          data={data?.result?.pagedData}
          module={ModuleIdentifier.MARKETER_APP_marketerContract}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection={"single"}
          rowId={["ContractId"]}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={searchQuery}
        />
      </div>
    </MarketerContractContext.Provider>
  );
}

export default withPermission(
  MarketerContract,
  ModuleIdentifier.MARKETER_APP_marketerContract
);
