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
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import CustomerToPortfoToolbar from "components/portfo/customer-to-portfo/toolbar";
import { formatNumber } from "components/common/functions/common-funcions";

function CustomerToPortfo() {
  const columnDefStructure = [
    {
      field: "tradingCode",
      headerName: "کدمعاملاتی",
    },
    {
      field: "nationalId",
      headerName: "کد ملی ",
    },
    {
      field: "bourseCode",
      headerName: "کدبورسی ",
    },

    {
      field: "customerTitle",
      headerName: "عنوان مشتری",
    },
    {
      field: "portfolioValueByClosingPrice",
      headerName: "ارزش پورتفوی",
    },
    {
      field: "portfolioValueByLastPrice",
      headerName: "ارزش پورتفوی",
      hide: true,
    },
    {
      field: "portfolioWeightByClosingPrice",
      headerName: "وزن پورتفوی",
      valueFormatter: (rowData: any) => {
        return (
          formatNumber(
            { value: rowData.data.portfolioWeightByClosingPrice },
            2
          ) + " %"
        );
      },
      dir: "ltr",
    },
    {
      field: "portfolioWeightByLastPrice",
      headerName: "وزن پورتفوی",
      valueFormatter: (rowData: any) => {
        return (
          formatNumber({ value: rowData.data.portfolioWeightByLastPrice }, 2) +
          " %"
        );
      },
      dir: "ltr",
      hide: true,
    },
  ];
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetCustomerPortfolioComparedToBroker`,
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
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.PORTFO_customer_to_broker}
        />
      </AccordionComponent>
      <CustomerToPortfoToolbar toggleAction={findColId} data={data?.result} />
      <TableComponent
        ref={ref}
        data={data?.result?.pagedData}
        loading={loading}
        columnDefStructure={columnDefStructure}
        rowId={["customerId"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  CustomerToPortfo,
  ModuleIdentifier.PORTFO_customer_to_broker
);
