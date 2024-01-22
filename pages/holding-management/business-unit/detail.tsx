import React, { createContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const TableComponent = dynamic(
  () => import("../../../components/common/table/table-component")
);

import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { useRouter } from "next/router";
import LabelValue from "components/common/components/label-value";
import { jalali } from "utils/common-funcions";
import { BusinessUnitOwnerToolbar } from "components/customer-management/business-unit/owner-party/ownerparty-toolbar";
import { BusinessUnitRelatedToolbar } from "components/customer-management/business-unit/related-party/relatedparty-toolbar";

export const CustomerManagementBusinessUnitDetail = createContext({});
function BusinessUnitDetailPage() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, fetchData, loading, query }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/businessUnit/SearchRelation`,
  });
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    if (id) fetchData({ BusinessUnitId: id });
  }, [id]);

  return (
    <CustomerManagementBusinessUnitDetail.Provider
      value={{
        fetchData: () => fetchData(query),
        selected: selectedRows,
        setSelectedRows,
        businessUnitId: id,
      }}
    >
      <div className={"flex flex-col h-full flex-1 "}>
        <div className="border border-border rounded-t-lg px-5 py-2 flex items-center flex-wrap space-x-10 space-x-reverse">
          <LabelValue title="عنوان" value={data?.result?.pagedData[0].title} />
          <LabelValue
            title="زمان ایجاد"
            value={
              data?.result?.pagedData[0].createDateTime
                ? jalali(data?.result?.pagedData[0].createDateTime).date
                : "-"
            }
          />
          <LabelValue
            title="زمان ویرایش"
            value={
              data?.result?.pagedData[0].updateDateTime
                ? jalali(data?.result?.pagedData[0].updateDateTime).date
                : "-"
            }
          />
        </div>
        <div className="flex grow">
          <div className="flex flex-col h-full grow">
            <BusinessUnitOwnerToolbar />
            <TableComponent
              className="rounded-bl-none"
              data={data?.result?.pagedData[0]?.ownerParty}
              module={
                ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_owner_detail
              }
              loading={loading}
              sideBar={false}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              rowSelection="single"
              rowId={["id"]}
            />
          </div>
          <div className="flex flex-col h-full grow">
            <BusinessUnitRelatedToolbar />
            <TableComponent
              className="rounded-br-none"
              data={data?.result?.pagedData[0]?.relatedParty}
              module={
                ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_related_detail
              }
              loading={loading}
              sideBar={false}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              rowSelection="single"
              rowId={["id"]}
            />
          </div>
        </div>
      </div>
    </CustomerManagementBusinessUnitDetail.Provider>
  );
}

export default BusinessUnitDetailPage;
