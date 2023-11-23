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
const OrdersToolbar = dynamic(
  () => import("../../components/online-orders/orders/orders-toolbar")
);
const CustomDetailComponent = dynamic(
  () => import("../../components/online-orders/orders/custom-detail")
);
import useQuery from "../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { throwToast } from "../../utils/notification";
import DateCell from "../../components/common/table/date-cell";
import { withPermission } from "components/common/layout/with-permission";

export const OrdersContext = createContext({});
function Orders() {
  const columnDefStructure = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      headerCheckboxSelectionFilteredOnly: true,
      resizable: false,
      minWidth: 40,
      maxWidth: 40,
    },
    {
      field: "customerTitle",
      headerName: "عنوان مشتری",
      cellRenderer: "agGroupCellRenderer",
    },
    {
      field: "faInsCode",
      headerName: "نماد",
    },
    {
      field: "orderSideTitle",
      headerName: "طرف سفارش",
      cellRendererSelector: () => {
        const ColourCellRenderer = (rowData: any) => {
          return (
            <span
              className={`${
                rowData?.data?.orderSideTitle === "خرید"
                  ? "text-green-400"
                  : "text-red-500"
              }`}
            >
              {rowData?.data?.orderSideTitle}
            </span>
          );
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
    {
      field: "price",
      headerName: "قیمت",
    },
    {
      field: "quantity",
      headerName: "حجم",
    },
    {
      field: "exequtedQuantity",
      headerName: "حجم انجام شده",
    },
    {
      field: "remainingQuantity",
      headerName: "حجم باقی مانده",
    },
    {
      field: "orderStatusTitle",
      headerName: "وضعیت سفارش",
    },
    {
      field: "orderTypeTitle",
      headerName: "نوع سفارش",
    },
    {
      field: "validityTypeTitle",
      headerName: "اعتبار سفارش",
    },
    {
      field: "userRequestDateTime",
      headerName: "زمان درخواست کاربر",
      cellRendererSelector: () => {
        const ColourCellRenderer = (props: any) => {
          return <DateCell date={props?.data?.userRequestDateTime} />;
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
    {
      field: "receiveResponseFromCapServerDateTime",
      headerName: "زمان ثبت در هسته",
      cellRendererSelector: () => {
        const ColourCellRenderer = (props: any) => {
          return (
            <DateCell
              date={props?.data?.receiveResponseFromCapServerDateTime}
            />
          );
        };
        const moodDetails = {
          component: ColourCellRenderer,
        };
        return moodDetails;
      },
    },
  ];

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, loading, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchOrders`,
  });

  const isRowSelectable = useMemo(() => {
    return (rowNode: any) => {
      return rowNode.data?.orderStatus < 4 && rowNode.data?.orderStatus > 1;
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
    <OrdersContext.Provider
      value={{ selectedRows, setSelectedRows, fetchData, query }}
    >
      <div className="flex flex-col h-full grow">
        <AccordionComponent>
          <SearchComponent
            module={ModuleIdentifier.ONLINE_ORDERS}
            onSubmit={submitHandler}
            loading={loading}
          />
        </AccordionComponent>
        <OrdersToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.ONLINE_ORDERS}
          loading={loading}
          columnDefStructure={columnDefStructure}
          rowId={["orderId"]}
          detailComponent={CustomDetailComponent}
          masterDetail={true}
          rowSelection={"multiple"}
          isRowSelectable={isRowSelectable}
          setSelectedRows={setSelectedRows}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </OrdersContext.Provider>
  );
}

export default withPermission(Orders, ModuleIdentifier.ONLINE_ORDERS);
