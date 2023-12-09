import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useRef, useState } from "react";
import { CREDIT_MANAGEMENT } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";

export const CreditCategoryToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CREDIT_category
  );
  const { mutate: addCreditBank } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Category/Add`,
    method: "POST",
    onSuccess: () => {
      addCreditCategoryRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });

  const addCreditCategoryRef: any = useRef();

  return (
    <div className={"toolbar p-2 border-x border-border"}>
      <CRUDWrapper
        ref={addCreditCategoryRef}
        title={`گروه جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          addCreditBank(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CREDIT_category}
        subModule="add"
      >
        <Button
          label={"جدید"}
          className="bg-primary"
          onClick={() => addCreditCategoryRef.current?.modalHandler(true)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
    </div>
  );
};
