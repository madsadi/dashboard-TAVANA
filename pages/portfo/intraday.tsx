import React from "react";
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
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import DateCell from "components/common/table/date-cell";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

function LivePortfo() {
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
      field: "instrumentId",
      headerName: "شناسه نماد",
    },
    {
      field: "faInsCode",
      headerName: "نماد",
    },
    {
      field: "faInsName",
      headerName: "نام کامل نماد",
    },
    {
      field: "currentShareCount",
      headerName: "مانده سپرده گذاری",
    },
    {
      field: "openBuyOrder",
      headerName: "حجم سفارش های باز خرید",
    },
    {
      field: "openSellOrder",
      headerName: "حجم سفارش های باز فروش",
    },
    {
      field: "intradayBuy",
      headerName: "حجم خرید",
    },
    {
      field: "intradaySell",
      headerName: "حجم فروش",
    },
    {
      field: "sellableShareCount",
      headerName: "حجم قابل فروش",
    },
    {
      field: "remainAssetCount",
      headerName: "مانده دارایی",
    },
    {
      field: "effectiveDate",
      headerName: "تاریخ",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return (
            <DateCell date={rowData?.data?.effectiveDate} hideTime={true} />
          );
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
    {
      field: "detail",
      headerName: "جزییات",
      flex: 0,
      width: 90,
      cellStyle: {
        cursor: "pointer",
        display: "flex",
      },
      cellRendererSelector: () => {
        return {
          component: (rowData: any) => {
            return (
              <a
                className={"flex h-full w-full"}
                target="_blank"
                rel="noreferrer"
                href={`/portfo/${rowData?.data?.customerId}&${rowData?.data?.instrumentId}&${rowData?.data?.effectiveDate}`}
              >
                <EllipsisHorizontalCircleIcon className={"h-5 w-5 m-auto"} />
              </a>
            );
          },
        };
      },
    },
  ];
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchIntradayPortfolio`,
  });

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.PORTFO_intraday}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        loading={loading}
        columnDefStructure={columnDefStructure}
        rowId={["id"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(LivePortfo, ModuleIdentifier.PORTFO_intraday);
