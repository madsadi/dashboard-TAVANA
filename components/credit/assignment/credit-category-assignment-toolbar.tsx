import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { CREDIT_MANAGEMENT } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CreditAssignmentContext } from "pages/credit/category-assignment";

export const CreditCategoryAssignmentToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData, selected } = useContext<any>(CreditAssignmentContext);
  const { mutate: editCreditBank } = useMutation({
    url: `${CREDIT_MANAGEMENT}/category-credit-assignment/Edit`,
    method: "PUT",
    onSuccess: () => {
      fetchData();
      editCreditAssignmentRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: addCreditBank } = useMutation({
    url: `${CREDIT_MANAGEMENT}/category-credit-assignment/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addCreditAssignmentRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CREDIT_bank
  );
  const editCreditAssignmentRef: any = useRef();
  const addCreditAssignmentRef: any = useRef();

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
        ref={addCreditAssignmentRef}
        title={` اعتبار جدید گروه`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          addCreditBank(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CREDIT_category_assignment}
        subModule="modal"
      >
        <Button
          label={"جدید"}
          className="bg-primary"
          onClick={() => addCreditAssignmentRef.current?.modalHandler(true)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={editCreditAssignmentRef}
        title={`ویرایش اعتبار گروه`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          editCreditBank({ id: selected.id, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CREDIT_category_assignment}
        selectedItem={selected}
        subModule="modal"
      >
        <Button
          label={"ویرایش"}
          className="bg-secondary"
          onClick={() => modalHandler(editCreditAssignmentRef)}
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
