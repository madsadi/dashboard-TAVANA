import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerManagementBourseCodeContext } from "pages/customer-management/bourse-code";

export const BourseCodeToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: editBourseCode } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customerBourseCode/EditBourseCode`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editBourseCodeRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: editTradingCode } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customerBourseCode/EditTradingCode`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editTradingCodeRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customerBourseCode/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { fetchData, selected } = useContext<any>(
    CustomerManagementBourseCodeContext
  );
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code
  );
  const editTradingCodeRef: any = useRef();
  const editBourseCodeRef: any = useRef();
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
    <div className={"toolbar p-2 border-x border-border"}>
      <CRUDWrapper
        ref={addRef}
        title={`کد بورسی جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          add(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code}
        subModule="add"
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
        ref={editBourseCodeRef}
        title={`ویرایش کدبورسی`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          editBourseCode({ id: selected.id, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code}
        selectedItem={selected}
        subModule="edit-bourse-code"
      >
        <Button
          label={"ویرایش کدبورسی"}
          className="bg-secondary"
          onClick={() => modalHandler(editBourseCodeRef)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={editTradingCodeRef}
        title={`ویرایش کدمعاملاتی`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          editTradingCode({ id: selected.id, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code}
        selectedItem={selected}
        subModule="edit-trading-code"
      >
        <Button
          label={"ویرایش کدمعاملاتی"}
          className="bg-secondary"
          onClick={() => modalHandler(editTradingCodeRef)}
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
