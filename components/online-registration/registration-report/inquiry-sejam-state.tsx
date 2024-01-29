import React, { useContext, useState } from "react";
import { OnlineRegContext } from "../../../pages/online-registration/registration-report";
import { onlineRegistrationState } from "./enums";
import { useRouter } from "next/router";
import useQuery from "../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { throwToast } from "../../../utils/notification";
import { Button } from "../../common/components/button/button";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";

const InquirySejamStateComponent = () => {
  const { selectedRows } = useContext<any>(OnlineRegContext);
  const { service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.ONLINE_REGISTRATION
  );
  const [loading, setLoading] = useState(false);
  const { fetchAsyncData } = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/checkUserSejamState`,
  });
  const router = useRouter();
  let userId = router.query?.userId;

  const inquiryHandler = () => {
    if (selectedRows?.length || userId) {
      const checkState = async (user: any, index: number) => {
        setLoading(true);
        await fetchAsyncData({ userId: user.userId || userId })
          .then((res) => {
            if (userId) {
              throwToast({
                type: "success",
                value: ` وضعیت این کاربر ${
                  onlineRegistrationState.find(
                    (item: any) => item.id === res?.data?.result.sejamStatus
                  )?.title
                }  می باشد `,
              });
            } else {
              throwToast({
                type: "success",
                value: ` وضعیت کاربر با کد ملی ${user.uniqueId} ${
                  onlineRegistrationState.find(
                    (item: any) => item.id === res?.data?.result.sejamStatus
                  )?.title
                }  می باشد `,
              });
            }
            if (index + 1 < selectedRows?.length) {
              checkState(selectedRows[index + 1], index + 1);
            }
          })
          .catch((err) => {
            if (
              err?.response?.data?.error?.message === "کاربر سجامی نیست" &&
              !userId
            ) {
              throwToast({
                type: "customError",
                value: ` کاربر با کد ملی ${user.uniqueId} سجامی نمی باشد `,
              });
            } else {
              throwToast({ type: "error", value: err });
            }
            if (index + 1 < selectedRows?.length) {
              checkState(selectedRows[index + 1], index + 1);
            }
          })
          .finally(() => setLoading(false));
      };
      checkState(selectedRows?.[0] || userId, 0);
    } else {
      throwToast({ type: "warning", value: "لطفا یک ردیف را انتخاب کنید" });
    }
  };

  return (
    <Button
      label={"وضعیت سجام"}
      onClick={inquiryHandler}
      loading={loading}
      allowed={
        restriction ? [[service?.[0], modules?.[0]?.[0], "Read"].join(".")] : []
      }
    />
  );
};

export default InquirySejamStateComponent;
