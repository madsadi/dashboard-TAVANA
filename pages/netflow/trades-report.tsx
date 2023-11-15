import React, { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component")
);
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
import useQuery from "../../hooks/useQuery";
import { NETFLOW } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import { SettlementDelayEnums, sides } from "constants/Enums";
import { EnumType } from "types/types";
import {
  formatNumber,
  jalali,
} from "components/common/functions/common-funcions";

function TradesReportPivot() {
  const columnDefStructure = [
    {
      field: "fullName",
      headerName: "نام",
      cellRenderer: "agGroupCellRenderer",
      flex: 0,
      width: 260,
    },
    {
      field: "side",
      headerName: "سمت",
      cellClassRules: {
        "text-emerald-500": (params: any) => params?.data?.side === "خرید",
        "text-rose-500": (params: any) => params?.data?.side === "فروش",
      },
      flex: 0,
      width: 180,
    },
    {
      field: "symbol",
      headerName: "نماد",
      flex: 0,
      width: 180,
    },
    {
      field: "settlementValue",
      headerName: "مبلغ تسویه",
      flex: 0,
      width: 180,
    },
    {
      field: "price",
      headerName: "قیمت",
      flex: 0,
      width: 180,
    },
    {
      field: "shares",
      headerName: "سهم",
      flex: 0,
      width: 180,
    },
    {
      field: "bourseCode",
      headerName: "کد بورسی",
      flex: 0,
      width: 180,
    },
    {
      field: "tradeCode",
      headerName: "کد معاملاتی",
    },
    {
      field: "settlementDelay",
      headerName: "تاخیر",
    },
    {
      field: "stationName",
      headerName: "نام ایستگاه",
    },
    {
      field: "tradeDate",
      headerName: "تاریخ معامله ",
      flex: 0,
      width: 180,
    },
    {
      field: "bourseCommission",
      valueGetter: "data.feeDetail.bourseCommission",
      headerName: "بورس مربوطه ",
      hide: true,
    },
    {
      field: "seoCommission",
      headerName: "کارمزد سازمان",
      hide: true,
      valueGetter: "data.feeDetail.seoCommission",
    },
    {
      field: "tmcCommission",
      headerName: "کارمزد فناوری",
      hide: true,
      valueGetter: "data.feeDetail.tmcCommission",
    },
    {
      field: "accessCommission",
      headerName: "کارمزد دسترسی",
      hide: true,
      valueGetter: "data.feeDetail.accessCommission",
    },
    {
      field: "csdCommission",
      headerName: "کارمزد سپرده گزاری",
      hide: true,
      valueGetter: "data.feeDetail.csdCommission",
    },
    {
      field: "vatCommission",
      headerName: "مالیات ارزش افزوده",
      hide: true,
      valueGetter: "data.feeDetail.vatCommission",
    },
    {
      field: "brokerCommission",
      headerName: "کارگزار",
      hide: true,
      valueGetter: "data.feeDetail.brokerCommission",
    },

    {
      field: "rayanBourseCommission",
      headerName: "کارمزد رایان",
      hide: true,
      valueGetter: "data.feeDetail.rayanBourseCommission",
    },
    {
      field: "brfCommission",
      headerName: "مالیت ارزش افزوده انبارداری",
      hide: true,
      valueGetter: "data.feeDetail.brfCommission",
    },
    {
      field: "inventoryCommission",
      headerName: "کارمزد انبارداری",
      hide: true,
      valueGetter: "data.feeDetail.inventoryCommission",
    },
    {
      field: "tax",
      headerName: "مالیات",
      hide: true,
      valueGetter: "data.feeDetail.tax",
    },
    {
      field: "vtsCommission",
      headerName: "مالیات ارزش افزوده هزینه انبارداری",
      hide: true,
      valueGetter: "data.feeDetail.vtsCommission",
    },
    {
      field: "farCommission",
      headerName: "کارمزد فراوری",
      hide: true,
      valueGetter: "data.feeDetail.farCommission",
    },
  ];
  const [rowData, setRowData] = useState<any>(null);
  const { fetchData, loading, data, query } = useQuery({
    url: `${NETFLOW}/Report/trades`,
  });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        rowStyle: {},
        suppressRowTransform: true,
        columnDefs: [
          { field: "bourseCommission", headerName: "بورس مربوطه" },
          {
            field: "seoCommission",
            headerName: "کارمزد سازمان",
          },
          { field: "tmcCommission", headerName: "کارمزد فناوری" },
          { field: "accessCommission", headerName: "کارمزد دسترسی" },
          { field: "csdCommission", headerName: "کارمزد سپرده گزاری" },
          { field: "vatCommission", headerName: "مالیات ارزش افزوده" },
          { field: "brokerCommission", headerName: "کارگزار" },

          { field: "rayanBourseCommission", headerName: "کارمزد رایان" },
          { field: "brfCommission", headerName: "مالیت ارزش افزوده انبارداری" },
          { field: "inventoryCommission", headerName: "کارمزد انبارداری" },
          { field: "tax", headerName: "مالیات" },
          {
            field: "vtsCommission",
            headerName: "مالیات ارزش افزوده هزینه انبارداری",
          },
          {
            field: "farCommission",
            headerName: "کارمزد فراوری",
          },
        ],
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: (params: any) => {
        params.successCallback([params.data?.feeDetail]);
      },
    };
  }, []);

  useEffect(() => {
    if (data?.result) {
      const _data = data?.result.map((item: any) => {
        return {
          ...item,
          side: sides.find((e: EnumType) => e.id === item.side)?.title,
          tradeDate: jalali(item?.georgianTradeDate).date,
          settlementDelay: SettlementDelayEnums.find(
            (e: EnumType) => e.id === item.settlementDelay
          )?.title,
        };
      });
      setRowData({ ...data, result: _data });
    }
  }, [data]);

  return (
    <div className={"relative flex flex-col grow overflow-hidden"}>
      <AccordionComponent>
        <SearchComponent
          module={ModuleIdentifier.NETFLOW_trades_report}
          onSubmit={fetchData}
          loading={loading}
        />
      </AccordionComponent>
      <TableComponent
        data={rowData?.result}
        loading={loading}
        columnDefStructure={columnDefStructure}
        rowId={["ticket", "tradeDate"]}
        detailCellRendererParams={detailCellRendererParams}
        masterDetail={true}
        pagination={true}
        totalCount={data?.totalRecord}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  TradesReportPivot,
  ModuleIdentifier.NETFLOW_trades_report
);
