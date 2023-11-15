import React, { useMemo } from "react";
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
const CancelOrdersToolbar = dynamic(
  () =>
    import("../../components/online-orders/cancel-orders/cancel-orders-toolbar")
);
import {
  formatNumber,
  jalali,
} from "../../components/common/functions/common-funcions";
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../components/common/functions/Module-Identifier";
import DateCell from "../../components/common/table/date-cell";
import { withPermission } from "components/common/layout/with-permission";

function CancelOrders() {
  const columnDefStructure = [
    {
      field: "id",
      cellRenderer: "agGroupCellRenderer",
      flex: 0,
      minWidth: 40,
      maxWidth: 40,
    },
    {
      field: "instrumentGroupIdentification",
      headerName: "کد گروه نمادها",
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
      field: "orderSideTitle",
      headerName: "سمت سفارش",
    },
    {
      field: "idOfTheBrokersOrderEntryServer",
      headerName: "شناسه سرور سفارش",
    },
    {
      field: "orderOriginTitle",
      headerName: "نوع مشتری",
    },
    {
      field: "orderTechnicalOriginTitle",
      headerName: "مرجع تکنیکال سفارش",
    },
    {
      field: "userRequestDateTime",
      headerName: "زمان درخواست",
      cellRendererSelector: () => {
        const ColourCellRenderer = (props: any) => {
          return <DateCell date={props.data?.userRequestDateTime} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
    {
      field: "errorText",
      headerName: "خطا",
    },
  ];
  const { data, loading, query, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/GlobalCancel/SearchGlobalCancelOrder`,
  });

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        enableRtl: true,
        columnDefs: [
          { field: "id", headerName: "شناسه درخواست" },
          { field: "idOfBrokerIssuingTheOrder", headerName: "کد کارگزاری" },
          {
            field: "userId",
            headerName: "شناسه کاربر",
          },
          {
            field: "userIP",
            headerName: "IP کاربر",
          },
          { field: "sourceOfRequestTitle", headerName: "نرم افزار" },
          {
            field: "tradingDateTime",
            headerName: "زمان اجرا",
            cellRendererSelector: () => {
              const ColourCellRenderer = (props: any) => {
                return (
                  <>
                    <span>{jalali(props.data.tradingDateTime).date}</span>
                    <span>{jalali(props.data.tradingDateTime).time}</span>
                  </>
                );
              };
              const moodDetails = {
                component: ColourCellRenderer,
              };
              return moodDetails;
            },
          },
          { field: "errorCode", headerName: "کد خطای" },
        ],
        defaultColDef: {
          resizable: true,
          sortable: true,
          flex: 1,
          valueFormatter: formatNumber,
        },
      },
      getDetailRowData: async (params: any) => {
        params.successCallback([params.data]);
      },
    };
  }, []);

  return (
    <div className="flex flex-col h-full flex-1">
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.ONLINE_CANCEL}
        />
      </AccordionComponent>
      <CancelOrdersToolbar />
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.ONLINE_CANCEL}
        loading={loading}
        columnDefStructure={columnDefStructure}
        rowId={["id", "userRequestDateTime"]}
        masterDetail={true}
        detailCellRendererParams={detailCellRendererParams}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(CancelOrders, ModuleIdentifier.ONLINE_CANCEL);
