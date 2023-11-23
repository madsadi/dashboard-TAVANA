import React, { useState, useMemo } from "react";
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
import { formatNumber, jalali } from "../../utils/common-funcions";
import { enTierNameEnum } from "../../constants/Enums";
import useQuery from "../../hooks/useQuery";
import { NETFLOW } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { throwToast } from "../../utils/notification";
import { withPermission } from "components/common/layout/with-permission";
import DateCell from "components/common/table/date-cell";

function ClearingDateRange() {
  const columnDefStructure = [
    {
      field: "georgianTradeDate",
      headerName: "تاریخ معامله",
      cellRendererSelector: () => {
        const ColourCellRenderer = (props: any) => {
          return <DateCell date={props?.data?.georgianTradeDate} hideTime />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
      flex: 0,
      width: 120,
    },
    {
      field: "enTierName",
      headerName: "نام گروه",
      cellRendererSelector: () => {
        const ColourCellRenderer = (props: any) => {
          return (
            <span>
              {
                enTierNameEnum.find(
                  (item: any) => props.data?.enTierName === item.enTitle
                )?.faTitle
              }
            </span>
          );
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
      flex: 0,
      width: 250,
    },
    {
      field: "brokerCode",
      headerName: "کد کارگزار",
    },
    {
      cellRenderer: "agGroupCellRenderer",
      field: "brokerName",
      headerName: "نام کارگزار",
    },
    {
      field: "settlementDelay",
      headerName: "تاخیر",
    },
    {
      field: "buy",
      headerName: "مبلغ خرید",
    },
    {
      field: "sell",
      headerName: "مبلغ فروش",
    },
    {
      field: "sellerInterest",
      headerName: "سود فروشنده",
    },
    {
      field: "buyerInterest",
      headerName: "سود خریدار",
    },
    {
      field: "credit",
      headerName: "بستانکار",
    },
    {
      field: "debit",
      headerName: "بدهکار",
    },
    {
      field: "sellerBalance",
      headerName: "مانده فروشنده",
    },
    {
      field: "buyerBalance",
      headerName: "مانده خریدار",
    },
  ];
  const { data, query, loading, fetchData }: any = useQuery({
    url: `${NETFLOW}/Report/clearing-date-range-T`,
  });

  const getRowStyle = (params: any) => {
    if (params?.node?.rowIndex === 0) {
      return { borderRight: "2px solid rgba(5,122,85,1)" };
    } else {
      return { borderRight: "2px solid rgba(225,29,72,1)" };
    }
  };
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        rowStyle: {},
        getRowStyle: getRowStyle,
        columnDefs: [
          {
            field: "type",
            headerName: "سمت معامله",
            cellRendererSelector: () => {
              const ColourCellRenderer = (props: any) => {
                return (
                  <span className={`my-auto`}>
                    {props.node.rowIndex === 0 ? "کارمزد خرید" : "کارمزد فروش"}
                  </span>
                );
              };
              const moodDetails = {
                component: ColourCellRenderer,
              };
              return moodDetails;
            },
          },
          { field: "brokerCommission", headerName: "کارگزار" },
          { field: "brfCommission", headerName: "سهم صندوق توسعه" },
          { field: "accessCommission", headerName: "کارمزد دسترسی" },
          {
            field: "seoCommission",
            headerName: "کارمزد سازمان",
          },
          { field: "tmcCommission", headerName: "کارمزد فناوری" },
          { field: "csdCommission", headerName: "کارمزد سپرده گزاری" },
          { field: "rayanBourseCommission", headerName: "کارمزد رایان" },
          { field: "bourseCommisison", headerName: "بورس مربوطه" },
          { field: "inventoryCommission", headerName: "هزینه انبارداری" },
          { field: "farCommission", headerName: "کارمزد فراوری" },
          { field: "tax", headerName: "مالیات" },
          { field: "vatCommission", headerName: "مالیات ارزش افزوده" },
          {
            field: "vtsCommission",
            headerName: "مالیات ارزض افزوده هزینه انبارداری",
          },
        ],
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([
          params.data?.buyCommission,
          params.data?.sellCommission,
        ]);
      },
    };
  }, []);
  const submitHandler = (query: any) => {
    if (query?.StartDate && query?.EndDate) {
      fetchData(query);
    } else {
      throwToast({ type: "warning", value: "ورودی تاریخ الزامی می باشد" });
    }
  };
  return (
    <div className={"relative flex flex-col grow overflow-hidden"}>
      <AccordionComponent>
        <SearchComponent
          module={ModuleIdentifier.NETFLOW_clearing_Range}
          onSubmit={submitHandler}
          loading={loading}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result}
        loading={loading}
        columnDefStructure={columnDefStructure}
        rowId={["sell", "settlementDelay", "enTierName", "georgianTradeDate"]}
        masterDetail={true}
        detailCellRendererParams={detailCellRendererParams}
        pagination={true}
        totalCount={data?.totalRecord}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  ClearingDateRange,
  ModuleIdentifier.NETFLOW_clearing_Range
);
