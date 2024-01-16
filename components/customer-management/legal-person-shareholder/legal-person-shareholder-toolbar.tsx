import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerManagementLegalPersonShareholderContext } from "pages/customer-management/legal-person-shareholder";

export const LegalPersonShareholderToolbar = ({ isMainPage = false }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: edit } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/legalPersonShareholder/Edit`,
    method: "PUT",
    onSuccess: () => {
      fetchData();
      editRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: deleteHandler } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/legalPersonShareholder/Delete`,
    method: "DELETE",
    onSuccess: () => {
      fetchData();
      deleteRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/legalPersonShareholder/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { fetchData, selected, customer } = useContext<any>(
    CustomerManagementLegalPersonShareholderContext
  );
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_bourse_code
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
    <div
      className={
        isMainPage
          ? "toolbar p-2 border-x border-border"
          : "flex space-x-2 space-x-reverse z-10 mb-4"
      }
    >
      <CRUDWrapper
        ref={addRef}
        title={`سهامدار مشتری حقوقی`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          add({ customerId: customer.customerId, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person_shareholders}
        subModule="modal"
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
        title={`ویرایش سهامدار مشتری حقوقی`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          edit({ id: selected.id, customerId: selected.customerId, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person_shareholders}
        selectedItem={selected}
        subModule="modal"
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
        title={`حذف سهامدار مشتری حقوقی`}
        mode="delete"
        confirmHandler={(e) => {
          e.preventDefault();
          deleteHandler({}, { id: selected.id });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_legal_person_shareholders}
        selectedItem={selected}
        modalMessage="حذف سهامدار مشتری حقوقی"
        entity="customerTitle"
        subModule="edit-trading-code"
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
