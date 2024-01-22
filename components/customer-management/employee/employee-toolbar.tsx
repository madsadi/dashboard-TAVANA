import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerManagementEmployeeContext } from "pages/holding-management/employee";

const EmployeeToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: edit } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/employee/Edit`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: deleteHandler } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/employee/Delete`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      deleteRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/employee/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { fetchData, selected } = useContext<any>(
    CustomerManagementEmployeeContext
  );
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_employee
  );
  const editRef: any = useRef();
  const deleteRef: any = useRef();
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
        title={`افزودن کارمند`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          add(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_employee}
        subModule="add"
        mode="edit"
        selectedItem={selected[0]}
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
        title={`ویرایش کارمند`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          edit({ id: selected[0].id, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_employee}
        selectedItem={selected}
        subModule="add"
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
        ref={deleteRef}
        title={`حذف کارمند`}
        mode="delete"
        confirmHandler={(e) => {
          e.preventDefault();
          deleteHandler({ id: selected[0].id });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_employee}
        selectedItem={selected[0]}
        modalMessage="حذف کارمند"
        entity="title"
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

export default EmployeeToolbar;
