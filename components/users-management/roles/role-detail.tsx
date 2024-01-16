import React, { useEffect, useState } from "react";
import TableComponent from "../../common/table/table-component";
import { useSelector } from "react-redux";
import useQuery from "../../../hooks/useQuery";
import { IDP } from "../../../api/constants";
import { ModuleIdentifier } from "utils/Module-Identifier";

export default function RoleDetailComponent({ data }: { data: any }) {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userDetail } = useSelector(
    (state: any) => state.userManagementConfig
  );
  const { fetchAsyncData: getRolePermission } = useQuery({
    url: `${IDP}/api/roles/get-role-permission`,
  });

  useEffect(() => {
    const fetchUserPermission = async () => {
      setLoading(true);
      await getRolePermission({ id: data.id })
        .then((res) => setRowData(res?.data?.result))
        .catch(() => setRowData([]))
        .finally(() => setLoading(false));
    };
    fetchUserPermission();
  }, [userDetail]);

  return (
    <div className={"m-5 flex flex-col h-full pb-16"}>
      <TableComponent
        sideBar={false}
        loading={loading}
        data={rowData}
        module={ModuleIdentifier.USER_MANAGEMENT_roles_detail}
        rowId={["id"]}
      />
    </div>
  );
}
