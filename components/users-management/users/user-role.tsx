import React, { useContext, useEffect, useState } from "react";
import Modal from "../../common/layout/modal";
import { UsersContext } from "../../../pages/users-management/users";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../../store/user-management.config";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import useQuery from "../../../hooks/useQuery";
import { throwToast } from "../../../utils/notification";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "../../common/components/button/button";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { useSearchFilters } from "../../../hooks/useSearchFilters";

export default function UserRole() {
  const { service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.USER_MANAGEMENT_users
  );
  const { userDetail: userDetailValue } = useSelector(
    (state: any) => state.userManagementConfig
  );
  const { mutate: addUserToRole } = useMutation({
    url: `${IDP}/api/users/add-user-to-role`,
  });
  const { mutate: removeUserFromRole } = useMutation({
    url: `${IDP}/api/users/remove-user-from-role`,
  });
  const { fetchAsyncData: getUserRoles } = useQuery({
    url: `${IDP}/api/users/get-user-roles`,
  });
  const { fetchAsyncData: searchRoles } = useQuery({
    url: `${IDP}/api/roles/search`,
  });
  const { selectedRows } = useContext<any>(UsersContext);
  const [modal, setModal] = useState(false);
  const [roles, setRoles] = useState<any>([]);
  const [userRoles, setUserRoles] = useState<any>([]);
  const [rolesCount, setRolesCount] = useState<any>(0);
  const [rolesPage, setRolesPage] = useState<any>(1);

  const PageSize = 100;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserRoles = async () => {
      await getUserRoles({ UserId: selectedRows[0].id }).then((res: any) => {
        setUserRoles(res?.data?.result?.roles);
      });
    };
    if (selectedRows[0]) {
      fetchUserRoles();
    }
  }, [selectedRows[0]]);

  useEffect(() => {
    const fetchAllRoles = async () => {
      await searchRoles({ PageNumber: rolesPage, PageSize: PageSize }).then(
        (res: any) => {
          setRoles(res?.data?.result?.pagedData);
          setRolesPage(rolesPage + 1);
          if (rolesPage === 1) {
            setRolesCount(res?.data?.result.totalCount);
          }
        }
      );
    };
    fetchAllRoles();
  }, []);

  const openHandler = () => {
    if (selectedRows.length) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  const actionOfTransfer = (id: string) => {
    let index = userRoles.findIndex((role: any) => role.id === id);
    if (index >= 0) {
      let _userRoles = [...userRoles];
      _userRoles.splice(index, 1);
      setUserRoles(_userRoles);
    } else {
      let roleObject = roles.find((role: any) => role.id === id);
      setUserRoles([roleObject, ...userRoles]);
    }
  };

  const addRole = async (roleId: string) => {
    await addUserToRole({ userId: selectedRows[0].id, roleId: roleId })
      .then(() => actionOfTransfer(roleId))
      .catch((err) => throwToast({ type: "error", value: err }));
  };

  const removeRole = async (roleId: string) => {
    await removeUserFromRole({ userId: selectedRows[0].id, roleId: roleId })
      .then(() => actionOfTransfer(roleId))
      .catch((err) => throwToast({ type: "error", value: err }));
  };

  useEffect(() => {
    if (!modal) {
      dispatch(userDetail(!userDetailValue));
    }
  }, [modal]);

  const searchHandler = async (page: number) => {
    await searchRoles({ PageNumber: page, PageSize: PageSize })
      .then((res) => setRoles([...roles, ...res?.data?.result?.pagedData]))
      .finally(() => setRolesPage(page + 1));
  };

  return (
    <>
      <Button
        label={"مدریت نقش کاربر"}
        onClick={openHandler}
        allowed={
          restriction
            ? [
                [
                  service?.[0],
                  modules?.[0]?.[0],
                  "RollAndPermissionManagment",
                ].join("."),
              ]
            : []
        }
      />
      <Modal
        title={"مدیریت نقش کاربر"}
        ModalWidth={"max-w-3xl"}
        setOpen={setModal}
        open={modal}
      >
        <div className="mt-4">
          <div className={"grid grid-cols-2 gap-3"}>
            <div>
              <h1 className={"text-center"}>نقش های کاربر</h1>
              <div className={"border border-gray-400 rounded-md p-3 "}>
                <div
                  className={
                    "h-[300px] overflow-y-auto space-y-2 custom-scrollbar"
                  }
                >
                  {userRoles?.map((role: any) => {
                    return (
                      <Button
                        key={role?.name}
                        label={role?.name}
                        className={`flex w-full text-center px-3 py-1 bg-gray-300 text-black text-sm disabled:opacity-50 h-fit space-x-reverse space-x-5`}
                        onClick={() => removeRole(role?.id)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={"flex flex-col"}>
              <h1 className={"text-center"}>کل نقش ها</h1>
              <div
                className={
                  "border border-gray-400 rounded-md p-3 grow overflow-y-auto space-y-2 custom-scrollbar"
                }
              >
                <InfiniteScroll
                  dataLength={roles.length}
                  next={() => searchHandler(rolesPage)}
                  hasMore={roles.length < rolesCount}
                  loader={<h4>در حال بارگزاری...</h4>}
                  height={300}
                  className={
                    "custom-scrollbar h-full overflow-y-auto space-y-2"
                  }
                >
                  {roles.length ? (
                    roles?.map((role: any) => {
                      return (
                        <Button
                          key={role?.name}
                          label={role?.name}
                          className={`flex w-full text-center px-3 py-1 bg-gray-300 text-black text-sm disabled:opacity-50 h-fit space-x-reverse space-x-5`}
                          onClick={() => addRole(role.id)}
                        />
                      );
                    })
                  ) : (
                    <div>نتیجه ای یافت نشد</div>
                  )}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
