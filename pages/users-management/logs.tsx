import React from "react";
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
import { IDP } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { throwToast } from "../../utils/notification";
import { withPermission } from "components/common/layout/with-permission";

function Users() {
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${IDP}/api/users/SearchUserActivityLogs`,
  });

  const fetchDataHandler = (searchQuery: any) => {
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        searchQuery.UserId
      ) ||
      !searchQuery.UserId
    ) {
      fetchData(searchQuery);
    } else {
      throwToast({
        type: "warning",
        value: "فرمت شناسه کاربری باید UUID/GUID باشد.",
      });
    }
  };

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <AccordionComponent>
        <SearchComponent
          onSubmit={fetchDataHandler}
          loading={loading}
          module={ModuleIdentifier.USER_MANAGEMENT_logs}
        />
      </AccordionComponent>
      <TableComponent
        data={data?.result?.pagedData}
        module={ModuleIdentifier.USER_MANAGEMENT_logs}
        rowId={["id"]}
        loading={loading}
        pagination={true}
        totalCount={data?.result?.totalCount}
        fetcher={fetchData}
        query={query}
      />
    </div>
  );
}

export default withPermission(Users, ModuleIdentifier.USER_MANAGEMENT_logs);
