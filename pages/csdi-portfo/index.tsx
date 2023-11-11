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
import DateCell from "components/common/table/date-cell";
import { changeTypeEnums, customerTypeEnums } from "constants/Enums";
import CSDIPortfoToolbar from "components/csdi-portfo/csdi-portfo-toolbar";
import { withPermission } from "components/common/layout/with-permission";

function CSDIPortfo() {
  const columnDefStructure = [
    {
      field: "tradingCode",
      headerName: "کد معاملاتی",
    },
    {
      field: "nationalId",
      headerName: "کد ملی",
    },
    {
      field: "customerTitle",
      headerName: "عنوان مشتری",
    },
    {
      field: "bourseCode",
      headerName: "کد بورسی",
    },
    {
      field: "instrumentId",
      headerName: "شناسه نماد",
    },
    {
      field: "faInsCode",
      headerName: "نماد ",
    },
    {
      field: "faInsName",
      headerName: "نام کامل نماد",
    },
    {
      field: "customerType",
      headerName: "حقیقی/حقوقی ",
      valueFormatter: (rowData: any) => {
        return customerTypeEnums.find(
          (item) => item.id === rowData.data.customerType
        )?.title;
      },
    },
    {
      field: "shareCount",
      headerName: "تعداد مانده ",
    },
    {
      field: "lastPrice",
      headerName: "قیمت آخرین  معامله",
    },
    {
      field: "closingPrice",
      headerName: "قیمت پایانی",
      hide: true,
    },
    {
      field: "netValueByClosingPrice",
      headerName: "خالص ارزش فروش با قیمت پایانی",
      hide: true,
    },
    {
      field: "netValueByLastPrice",
      headerName: "خالص ارزش فروش با قیمت  آخرین معامله",
    },
    {
      field: "shareChange",
      headerName: "تعداد تغییر ",
    },

    {
      field: "changeType",
      headerName: "نوع تغییر",
      valueFormatter: (rowData: any) => {
        return changeTypeEnums.find(
          (item) => item.id === rowData.data.changeType
        )?.title;
      },
    },
    {
      field: "isFreezed",
      headerName: "سهم های فریز شده",
      valueFormatter: (rowData: any) => {
        return rowData.data.isFreezed ? "فریز" : "آزاد";
      },
    },
    {
      field: "effectiveDate",
      headerName: "تاریخ و زمان تغییر",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return <DateCell date={rowData.data.effectiveDate} hideTime={true} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
  ];
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

export default withPermission(CSDIPortfo, ModuleIdentifier.CSDI_PORTFO);
