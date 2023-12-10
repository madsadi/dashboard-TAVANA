import { useContext } from "react";
import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useRef, useState } from "react";
import { CREDIT_MANAGEMENT } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { CreditContractContext } from "pages/credit/contract";
import { throwToast } from "utils/notification";

export const CreditContractToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData, selected } = useContext<any>(CreditContractContext);

  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CREDIT_category
  );
  const { mutate: addCreditContract } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Contract/Add`,
    method: "POST",
    onSuccess: () => {
      addCreditContractRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: editCreditContract } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Contract/Edit`,
    method: "PUT",
    onSuccess: () => {
      editCreditContractRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });

  const addCreditContractRef: any = useRef();
  const editCreditContractRef: any = useRef();

  const modalHandler = (target: any) => {
    if (selected) {
      target.current?.modalHandler(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه انتخاب کنید",
      });
    }
  };

  return (
    <div className={"toolbar p-2 border-x border-border"}>
      <CRUDWrapper
        ref={addCreditContractRef}
        title={`قرارداد جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          addCreditContract({
            customerId: selected?.customerId,
            tradeCode: selected?.tradeCode,
            ...query,
          });
        }}
        loading={loading}
        module={ModuleIdentifier.CREDIT_contract}
        subModule="modal"
      >
        <Button
          label={"جدید"}
          className="bg-primary"
          onClick={() => modalHandler(addCreditContractRef)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={editCreditContractRef}
        title={` ویرایش قرارداد `}
        confirmHandler={(e, query) => {
          e.preventDefault();
          editCreditContract({
            customerId: selected?.customerId,
            tradeCode: selected?.tradeCode,
            ...query,
          });
        }}
        mode="edit"
        loading={loading}
        module={ModuleIdentifier.CREDIT_contract}
        subModule="modal"
        selectedItem={selected}
      >
        <Button
          label={"ویرایش"}
          className="bg-secondary"
          onClick={() => modalHandler(editCreditContractRef)}
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
