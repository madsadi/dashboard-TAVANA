import React, { createContext, useMemo, useState } from "react";
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
const ReciteToolbar = dynamic(
  () => import("../../../components/marketer-app/recite/toolbar/recite-toolbar")
);

import useQuery from "../../../hooks/useQuery";
import { MARKETER_ADMIN } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

export const ReciteContext = createContext({});
function Recite() {
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const {
    data,
    fetchData,
    query: searchQuery,
    loading,
  }: any = useQuery({ url: `${MARKETER_ADMIN}/factor/search` });

  const fetchHandler = (query: any) => {
    const { month, year, ...rest } = query;

    fetchData({ ...rest, period: year && month ? year + month : null });
  };

  return (
    <ReciteContext.Provider
      value={{ selectedRows, setSelectedRows, fetchData, searchQuery, data }}
    >
      <div className={"flex flex-col h-full flex-1"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchHandler}
            loading={loading}
            module={ModuleIdentifier.MARKETER_APP_recite}
          />
        </AccordionComponent>
        <ReciteToolbar />
        <TableComponent
          loading={loading}
          module={ModuleIdentifier.MARKETER_APP_recite}
          data={data?.result.pagedData}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          rowSelection={"single"}
          rowId={["FactorID"]}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={searchQuery}
        />
      </div>
    </ReciteContext.Provider>
  );
}

export default withPermission(Recite, ModuleIdentifier.MARKETER_APP_recite);
