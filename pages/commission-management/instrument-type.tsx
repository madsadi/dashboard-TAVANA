import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const InstrumentTypeToolbar = dynamic(
  () =>
    import("../../components/commission/instrumentType/instrument-type-toolbar")
);
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
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

export const InstrumentTypeContext = createContext({});
function InstrumentType() {
  const { fetchData, query, loading, data } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/CommissionInstrumentType/Search`,
  });
  const [selectedRows, setSelectedRows] = useState<any>([]);

  return (
    <InstrumentTypeContext.Provider value={{ fetchData, query, selectedRows }}>
      <div className={"relative flex flex-col grow overflow-hidden"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.COMMISSION_MANAGEMENT_instrument}
          />
        </AccordionComponent>
        <InstrumentTypeToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.COMMISSION_MANAGEMENT_instrument}
          loading={loading}
          rowId={["id"]}
          rowSelection={"single"}
          setSelectedRows={setSelectedRows}
          masterDetail={true}
          pagination={true}
          totalCount={data?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </InstrumentTypeContext.Provider>
  );
}

export default withPermission(
  InstrumentType,
  ModuleIdentifier.COMMISSION_MANAGEMENT_instrument
);
