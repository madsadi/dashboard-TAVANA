import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerManagementAgreementsManagementContext } from "pages/holding-management/agreements-management";

export const AgreementsManagementToolbar = ({ isMainPage = false }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: editCreditBank } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/agreement/Update`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: remove } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/agreement/Delete`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      deleteRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/agreement/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: editBourseCode } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/agreement/EditBourseCodeRequirationStatus`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editBourseCodeRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });

  const { fetchData, selected } = useContext<any>(
    CustomerManagementAgreementsManagementContext
  );
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management
  );
  const editRef: any = useRef();
  const addRef: any = useRef();
  const editBourseCodeRef: any = useRef();
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
    <div
      className={
        isMainPage
          ? "toolbar p-2 border-x border-border"
          : "flex space-x-2 space-x-reverse z-10 mb-4"
      }
    >
      <CRUDWrapper
        ref={addRef}
        title={`توافقنامه جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          add(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management}
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
        ref={editRef}
        title={`ویرایش توافقنامه`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          editCreditBank({ id: selected.id, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management}
        selectedItem={selected}
        subModule="edit"
      >
        <Button
          label={"ویرایش"}
          className="bg-secondary"
          onClick={() => modalHandler(editRef)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
              : []
          }
        />
      </CRUDWrapper>

      <CRUDWrapper
        ref={editBourseCodeRef}
        title={`اجباری بودن کدبورسی`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          editBourseCode({ id: selected.id, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management}
        selectedItem={selected}
      >
        <Button
          label={"اجباری بودن کدبورسی"}
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
        ref={deleteRef}
        title={`حذف قرارداد`}
        mode="delete"
        confirmHandler={(e, query) => {
          e.preventDefault();
          remove({ id: selected.id, ...query });
        }}
        modalMessage=" حذف قرارداد "
        entity="title"
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_agreements_management}
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
