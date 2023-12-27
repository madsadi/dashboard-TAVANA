import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerAgreementContext } from "pages/customer-management/customer-agreement";

export const CustomerAgreementToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData, selected, query } = useContext<any>(
    CustomerAgreementContext
  );
  const { mutate: deleteItem } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customerAgreement/Delete`,
    method: "DELETE",
    onSuccess: () => {
      fetchData(query);
      deleteRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: editBourseCode } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customerBourseCode/EditBourseCode`,
    method: "PATCH",
    onSuccess: () => {
      fetchData(query);
      editStateRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customerAgreement/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customerAgreement
  );
  const editStateRef: any = useRef();
  const addRef: any = useRef();
  const deleteRef: any = useRef();

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
        title={`توافقنامه جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          add(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customerAgreement}
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
        ref={editStateRef}
        title={`ویرایش وضعیت توافقنامه`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          editBourseCode({ id: selected.id, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customerAgreement}
        selectedItem={selected}
        subModule="edit-state"
      >
        <Button
          label={"ویرایش وضعیت"}
          className="bg-secondary"
          onClick={() => modalHandler(editStateRef)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={deleteRef}
        title={`حذف توافقنامه`}
        mode="delete"
        confirmHandler={(e) => {
          e.preventDefault();
          deleteItem({}, { id: selected.id });
        }}
        modalMessage=" حذف توافقنامه"
        entity="agreementName"
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_customerAgreement}
        selectedItem={selected}
      >
        <Button
          label={"حذف"}
          className="bg-red-500"
          onClick={() => modalHandler(deleteRef)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Delete"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
    </div>
  );
};
