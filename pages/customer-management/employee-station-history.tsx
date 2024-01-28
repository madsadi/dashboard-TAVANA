import React from "react";
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
import { ADMIN_GATEWAY } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

function EmployeeStationHistory() {
  const { data, loading, fetchData, query } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/history/SearchEmployeeStation`,
  });

  return (
    <div className="flex flex-col h-full grow">
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchData}
          loading={loading}
          module={ModuleIdentifier.CUSTOMER_MANAGEMENT_employee_station_history}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_employee_station_history}
        loading={loading}
        rowId={["id"]}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(
  EmployeeStationHistory,
  ModuleIdentifier.CUSTOMER_MANAGEMENT_employee_station_history
);
