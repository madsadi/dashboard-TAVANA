import React, { createContext, useState } from "react";
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
const RolesToolbar = dynamic(
  () => import("../../components/users-management/roles/roles-toolbar")
);
const RoleDetailComponent = dynamic(
  () => import("../../components/users-management/roles/role-detail")
);
import useQuery from "../../hooks/useQuery";
import { IDP } from "../../api/constants";
import { ModuleIdentifier } from "../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";

export const RolesContext = createContext({});
function Roles() {
  const { data, query, fetchData, loading }: any = useQuery({
    url: `${IDP}/api/roles/search`,
  });
  const [selectedRows, setSelectedRows] = useState<any>([]);

  return (
    <RolesContext.Provider
      value={{ fetchData, query, selectedRows, setSelectedRows }}
    >
      <div className={"flex flex-col h-full grow"}>
        <AccordionComponent>
          <SearchComponent
            onSubmit={fetchData}
            loading={loading}
            module={ModuleIdentifier.USER_MANAGEMENT_roles}
          />
        </AccordionComponent>
        <RolesToolbar />
        <TableComponent
          data={data?.result?.pagedData}
          module={ModuleIdentifier.USER_MANAGEMENT_roles}
          rowId={["id"]}
          loading={loading}
          rowSelection={"single"}
          masterDetail={true}
          detailComponent={RoleDetailComponent}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          suppressRowClickSelection={true}
          pagination={true}
          totalCount={data?.result?.totalCount}
          fetcher={fetchData}
          query={query}
        />
      </div>
    </RolesContext.Provider>
  );
}

export default withPermission(Roles, ModuleIdentifier.USER_MANAGEMENT_roles);
