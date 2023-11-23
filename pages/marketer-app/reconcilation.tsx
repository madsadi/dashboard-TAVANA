import React, { createContext, useMemo, useState } from "react";
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
import DateCell from "../../components/common/table/date-cell";
import { withPermission } from "components/common/layout/with-permission";

function Reconcilation() {
  const columnDefStructure: any = [
    {
      field: "MarketerFirstName",
      headerName: "نام بازاریاب",
      cellRenderer: "agGroupCellRenderer",
    },
    {
      field: "MarketerLastNAme",
      headerName: "نام خانوادگی بازاریاب",
    },
    {
      field: "TradeSide",
      headerName: "سمت معامله",
    },
    {
      field: "TradeCount",
      headerName: "تعداد معاملات نرم افزار بازاریاب",
    },
    {
      field: "TradeDate",
      headerName: "تاریخ معامله",
    },
  ];

  const {
    data,
    fetchData,
    query: searchQuery,
    loading,
  }: any = useQuery({ url: `${MARKETER_ADMIN}/reconciliation` });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        // getRowId:(params:any)=>params.data.orderId,
        columnDefs: [
          {
            field: "FollowerMarketerID",
            headerName: "شناسه کاربری بازاریاب",
          },
          {
            field: "CommissionCoefficient",
            headerName: "ضریب کارمزد",
          },
          {
            field: "StartDate",
            headerName: "تاریخ شروع ارتباط",
            cellRendererSelector: () => {
              const moodDetails = {
                component: (rowData: any) => (
                  <DateCell date={rowData.data.StartDate} hideTime={true} />
                ),
              };
              return moodDetails;
            },
          },
          {
            field: "EndDate",
            headerName: "تاریخ پایان ارتباط",
            cellRendererSelector: () => {
              const moodDetails = {
                component: (rowData: any) => (
                  <DateCell date={rowData.data.EndDate} hideTime={true} />
                ),
              };
              return moodDetails;
            },
          },
          {
            field: "GCreateDate",
            headerName: "زمان ایجاد",
            cellRendererSelector: () => {
              const moodDetails = {
                component: (rowData: any) => (
                  <DateCell date={rowData.data.GCreateDate} />
                ),
              };
              return moodDetails;
            },
          },
          {
            field: "GUpdateDate",
            headerName: "زمان بروزرسانی",
            cellRendererSelector: () => {
              const moodDetails = {
                component: (rowData: any) => (
                  <DateCell date={rowData.data.GUpdateDate} />
                ),
              };
              return moodDetails;
            },
          },
        ],
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          // valueFormatter: formatNumber
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([params.data]);
      },
    };
  }, []);

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.MARKETER_APP_reconcilation}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        columnDefStructure={columnDefStructure}
        rowId={["MarketerID"]}
        detailCellRendererParams={detailCellRendererParams}
        masterDetail={true}
      />
    </div>
  );
}

export default withPermission(
  Reconcilation,
  ModuleIdentifier.MARKETER_APP_reconcilation
);
