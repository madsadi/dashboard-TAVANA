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
import { withPermission } from "components/common/layout/with-permission";

export const OrdersContext = createContext({});
function Orders() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, loading, fetchData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/SearchOrders`,
  });

  const isRowSelectable = useMemo(() => {
    return (rowNode: any) => {
      return rowNode.data?.orderStatus < 4 && rowNode.data?.orderStatus > 1;
    };
  }, []);

  return (
    <OrdersContext.Provider
      value={{ selectedRows, setSelectedRows, fetchData, query }}
    >
      <div className="flex flex-col h-full grow">
        <AccordionComponent>
          <SearchComponent
            module={ModuleIdentifier.ONLINE_ORDERS}
            onSubmit={fetchData}
            loading={loading}
          />
        </AccordionComponent>
        <OrdersToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.ONLINE_ORDERS}
          loading={loading}
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
