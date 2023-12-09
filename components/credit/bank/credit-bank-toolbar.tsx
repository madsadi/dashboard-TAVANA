import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { CREDIT_MANAGEMENT } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CreditBankContext } from "pages/credit/bank";

export const CreditBankToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: editCreditBank } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Credit/Bank/Edit`,
    method: "PUT",
    onSuccess: () => {
      fetchData();
      editCreditBankRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: addCreditBank } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Credit/Bank/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addCreditBankRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { fetchData, selected } = useContext<any>(CreditBankContext);
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CREDIT_bank
  );
  const editCreditBankRef: any = useRef();
  const addCreditBankRef: any = useRef();

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
        ref={addCreditBankRef}
        title={`اعتبار جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          addCreditBank(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CREDIT_bank}
        subModule="modal"
      >
        <Button
          label={"جدید"}
          className="bg-primary"
          onClick={() => addCreditBankRef.current?.modalHandler(true)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={editCreditBankRef}
        title={`ویرایش اعتبار`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          editCreditBank({ creditId: selected.creditID, ...query });
        }}
        loading={loading}
        module={ModuleIdentifier.CREDIT_bank}
        selectedItem={selected}
        subModule="modal"
      >
        <Button
          label={"ویرایش"}
          className="bg-secondary"
          onClick={() => modalHandler(editCreditBankRef)}
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
