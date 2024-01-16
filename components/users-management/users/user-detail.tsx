import React, { useEffect } from "react";
import Image from "next/image";
import { jalali } from "../../../utils/common-funcions";
import TableComponent from "../../common/table/table-component";
import { useSelector } from "react-redux";
import useQuery from "../../../hooks/useQuery";
import { IDP } from "../../../api/constants";
import { ModuleIdentifier } from "utils/Module-Identifier";

export default function UserDetailComponent({ data }: { data: any }) {
  const { userDetail } = useSelector(
    (state: any) => state.userManagementConfig
  );
  const {
    data: userRoles,
    fetchData,
    loading,
  }: any = useQuery({
    url: `${IDP}/api/users/get-user-roles`,
  });

  useEffect(() => {
    fetchData({ userId: data.id });
  }, [userDetail]);

  return (
    <div className={"m-5 flex flex-col h-full pb-16"}>
      <div
        className={
          "mb-3 p-2 flex align-items-center bg-black-alpha-10 border-round-sm"
        }
      >
        <div className={"h-6 w-6"}>
          <Image width={48} height={48} src="/icons/avatar.svg" alt="avatar" />
        </div>
        <div className={"mr-4"}>
          <div className={"flex space-x-5 space-x-reverse"}>
            <div>
              ایمیل: <span className={"font-semibold"}>{data?.email}</span>
            </div>
            <div>
              دفعات ورود ناموفق:{" "}
              <span className={"font-semibold"}>{data?.accessFailedCount}</span>
            </div>
            <div>
              پایان قفل حساب:{" "}
              <span className={"font-semibold"}>{data?.lockOutEnd}</span>
            </div>
            <div>
              تاریخ تولد:{" "}
              <span className={"font-semibold"}>
                {data?.birthdate ? jalali(data?.birthdate).date : ""}
              </span>
            </div>
            <div>
              تاریخ تغییر رمز عبور:{" "}
              <span className={"font-semibold"}>
                {data?.passwordSetDate
                  ? jalali(data?.passwordSetDate).date
                  : ""}
              </span>
            </div>
            <div>
              تاریخ ایجاد:
              <span className={"font-semibold"}>
                {data?.insertDateTime ? jalali(data?.insertDateTime).date : ""}
              </span>
            </div>
            <div>
              تاریخ ویرایش:{" "}
              <span className={"font-semibold"}>
                {data?.updateDateTime ? jalali(data?.updateDateTime).date : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      <TableComponent
        sideBar={false}
        loading={loading}
        module={ModuleIdentifier.USER_MANAGEMENT_users_detail}
        data={userRoles?.result?.roles}
        rowId={["id"]}
      />
    </div>
  );
}
