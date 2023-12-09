import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import AddPrivateInfo from "./add-private-info";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { CustomerPrivatePersonInfoContext } from "./customer-private-person";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";

export const PrivatePersonToolbar = ({ isMainPage = false }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: mutatePrivateInfo } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/privatePerson/Edit`,
    method: "PATCH",
  });
  const { mutate: mutateDeseasedDate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/privatePerson/EditDeceasedDate`,
    method: "PATCH",
  });
  const { fetchHandler, customerId, info } = useContext<any>(
    CustomerPrivatePersonInfoContext
  );
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer,
    "add-private-person"
  );
  const editPrivateInfoRef: any = useRef();
  const editDeseacedDateRef: any = useRef();
  const editPrivateInfo = async (e: any, query: any) => {
    e.preventDefault();
    setLoading(true);
    await mutatePrivateInfo({ customerId: customerId, ...query })
      .then(() => {
        fetchHandler();
        editPrivateInfoRef.current?.modalHandler(false);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };

  const editDeceasedDate = async (e: any, query: any) => {
    e.preventDefault();
    setLoading(true);
    await mutateDeseasedDate({ customerId: customerId, ...query })
      .then(() => {
        throwToast({
          type: "success",
          value: "اطلاعات با موفقیت ویرایش شد",
        });
        fetchHandler();
        editDeseacedDateRef.current?.modalHandler(false);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };

  const modalHandler = (target: any) => {
    if ((info && !isMainPage) || (isMainPage && info)) {
      target.current?.modalHandler(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  return (
    <div
      className={
        isMainPage
          ? "toolbar p-2 border-x border-border"
          : "flex space-x-2 space-x-reverse z-10 mb-4"
      }
    >
      {isMainPage ? null : <AddPrivateInfo />}
      <CRUDWrapper
        ref={editPrivateInfoRef}
        title={`ویرایش اطلاعات  هویتی`}
        confirmHandler={editPrivateInfo}
        loading={loading}
        mode="edit"
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customer}
        selectedItem={info}
        subModule="add-private-person"
      >
        <Button
          label={"ویرایش"}
          className="bg-secondary"
          onClick={() => modalHandler(editPrivateInfoRef)}
          disabled={!info && !isMainPage}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={editDeseacedDateRef}
        title={"ویرایش تاریخ وفات"}
        confirmHandler={editDeceasedDate}
        loading={loading}
        mode="edit"
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customer}
        selectedItem={info}
        subModule="edit-deceased-date"
      >
        <Button
          label={"ویرایش تاریخ وفات"}
          className="bg-secondary"
          onClick={() => modalHandler(editDeseacedDateRef)}
          disabled={(!info?.isDeceased && !isMainPage) || !isMainPage}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
    </div>
  );
};
