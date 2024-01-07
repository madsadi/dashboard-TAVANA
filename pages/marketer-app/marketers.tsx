import React, { createContext } from "react";
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
import { MARKETER_ADMIN } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import MarketerToolbar from "components/marketer-app/marketer/marketer-toolbar";

export const MarketerContext = createContext({});
function MarketerContract() {
  const {
    data,
    fetchData,
    query: searchQuery,
    loading,
  }: any = useQuery({ url: `${MARKETER_ADMIN}/marketer/search` });

  return (
    <MarketerContext.Provider value={{ fetchData, searchQuery, data }}>
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.MARKETER_APP_marketers}
          />
        </AccordionComponent>
        <MarketerToolbar />
        <TableComponent
          data={data?.result.pagedData}
          module={ModuleIdentifier.MARKETER_APP_marketers}
          rowId={["MarketerId"]}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={searchQuery}
        />
      </div>
    </MarketerContext.Provider>
  );
}

export default withPermission(
  MarketerContract,
  ModuleIdentifier.MARKETER_APP_marketers
);
