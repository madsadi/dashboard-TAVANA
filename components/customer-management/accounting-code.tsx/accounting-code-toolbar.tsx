import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerManagementAccountingCodeContext } from "pages/customer-management/accounting-code";

export const AccountingCodeToolbar = ({ isMainPage = false }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: edit } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customerAccountingCode/Edit`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customerAccountingCode/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { fetchData, selected, customer } = useContext<any>(
    CustomerManagementAccountingCodeContext
  );
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_accounting_code
  );
  const editRef: any = useRef();
  const addRef: any = useRef();

  const modalHandler = (target: any) => {
    if (selected) {
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
      <CRUDWrapper
        ref={addRef}
        title={`افزودن کدحساب`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          add(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_accounting_code}
        subModule="add"
        mode="edit"
        selectedItem={customer}
      >
        <Button
          label={"جدید"}
          className="bg-primary"
          onClick={() => addRef.current?.modalHandler(true)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={editRef}
        title={`ویرایش کدحساب`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          edit({ id: selected.id, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_accounting_code}
        selectedItem={selected}
        subModule="add"
      >
        <Button
          label={"ویرایش کدحساب"}
          className="bg-secondary"
          onClick={() => modalHandler(editRef)}
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
