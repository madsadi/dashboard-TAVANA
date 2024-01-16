import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerManagementBusinessUnit } from "pages/customer-management/business-unit";

export const BusinessUnitToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: edit } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/businessUnit/Edit`,
    method: "PUT",
    onSuccess: () => {
      fetchData();
      editRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: remove } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/businessUnit/Delete`,
    method: "DELETE",
    onSuccess: () => {
      fetchData();
      deleteRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/businessUnit/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { fetchData, selected } = useContext<any>(
    CustomerManagementBusinessUnit
  );

  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit
  );
  const editRef: any = useRef();
  const deleteRef: any = useRef();
  const addRef: any = useRef();

  const modalHandler = (target: any) => {
    if (selected[0]) {
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
        title={`واحد کاری جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          add(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit}
        subModule="modal"
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
        title={`ویرایش واحد کاری`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          edit({
            id: selected[0]?.id,
            ...query,
          });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit}
        selectedItem={selected[0]}
        subModule="modal"
      >
        <Button
          label={"ویرایش "}
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
        title={`حذف واحد کاری`}
        mode="delete"
        confirmHandler={(e, query) => {
          e.preventDefault();
          remove({}, { id: selected[0].id, ...query });
        }}
        modalMessage=" حذف واحد کاری "
        entity="title"
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit}
        selectedItem={selected[0]}
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
