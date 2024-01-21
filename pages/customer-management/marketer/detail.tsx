import React, { createContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);
const DetailToolbar = dynamic(
  () =>
    import("../../../components/customer-management/marketer/detail-toolbar")
);
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { useRouter } from "next/router";

export const CustomerManagementMarketerDetail = createContext({});
function MarketerDetailPage() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/marketerSubordinate/Search`,
  });

  const router = useRouter();
  const marketerId = router.query.marketerId;
  useEffect(() => {
    if (marketerId) {
      fetchData({ marketerId: marketerId });
    }
  }, [marketerId]);

  return (
    <CustomerManagementMarketerDetail.Provider
      value={{
        fetchData: () => fetchData(query),
        selected: selectedRows,
        setSelectedRows,
        marketerId,
      }}
    >
      <div className={"flex flex-col h-full flex-1 "}>
        <DetailToolbar />
        <div className="flex flex-col h-full grow">
          <TableComponent
            data={data?.result?.pagedData}
            module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer_detail}
            loading={loading}
            sideBar={false}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            rowSelection="single"
            rowId={["id"]}
          />
        </div>
      </div>
    </CustomerManagementMarketerDetail.Provider>
  );
}

export default MarketerDetailPage;
