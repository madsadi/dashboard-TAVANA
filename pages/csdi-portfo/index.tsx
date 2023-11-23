import React, { useRef } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
import TableComponent from "../../components/common/table/table-component";
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import CSDIPortfoToolbar from "components/csdi-portfo/csdi-portfo-toolbar";
import { withPermission } from "components/common/layout/with-permission";

function CSDIPortfo() {
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetHistoricalCustomerPortfolio`,
  });
  const ref: any = useRef();

  const findColId = (keyword: string, visible: boolean) => {
    const colsss = ref.current?.getTableColumns();

    ref.current?.tableColumnVisibility(
      colsss
        .filter((item: any) =>
          item.colId.toLowerCase().includes(keyword.toLowerCase())
        )
        .map((col: any) => col.colId),
      visible
    );
  };

  return (
    <div className={"flex flex-col h-full flex-1 "}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CSDI_PORTFO}
        />
      </AccordionComponent>
      <CSDIPortfoToolbar toggleAction={findColId} />
      <TableComponent
        data={data?.result?.pagedData}
        ref={ref}
        module={ModuleIdentifier.CSDI_PORTFO}
        loading={loading}
        rowId={["id"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(CSDIPortfo, ModuleIdentifier.CSDI_PORTFO);
