import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(
  () => import("../../components/common/components/search")
);
const TableComponent = dynamic(
  () => import("../../components/common/table/table-component"),
  {
    loading: () => <p>در حال بارگزاری...</p>,
  }
);
const AccordionComponent = dynamic(
  () => import("../../components/common/components/accordion")
);
const UsersToolbar = dynamic(
  () => import("../../components/users-management/users/users-toolbar")
);
const UserDetailComponent = dynamic(
  () => import("../../components/users-management/users/user-detail")
);
import useQuery from "../../hooks/useQuery";
import { IDP } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

export const UsersContext = createContext({});
function Users() {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${IDP}/api/users/SearchUserAccount`,
  });

  return (
    <UsersContext.Provider value={{ fetchData, query, selectedRows }}>
      <div className={"flex flex-col h-full grow"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.USER_MANAGEMENT_users}
          />
        </AccordionComponent>
        <UsersToolbar />
        <TableComponent
          data={data?.result.pagedData}
          module={ModuleIdentifier.USER_MANAGEMENT_users}
          rowId={["id"]}
          rowSelection={"single"}
          masterDetail={true}
          detailComponent={UserDetailComponent}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          suppressRowClickSelection={true}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </UsersContext.Provider>
  );
}

export default withPermission(Users, ModuleIdentifier.USER_MANAGEMENT_users);
