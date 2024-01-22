import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { RelatedPartyAdd } from "./relatedparty-add";
import { RelatedPartyEdit } from "./relatedparty-edit";
import { CustomerManagementBusinessUnitDetailContext } from "pages/holding-management/business-unit-detail";

export const BusinessUnitDetailRelatedToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: remove } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/businessUnitRelatedParty/Delete`,
    method: "DELETE",
    onSuccess: () => {
      fetchData();
      deleteRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });

  const { fetchData, selected } = useContext<any>(
    CustomerManagementBusinessUnitDetailContext
  );

  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_related_detail
  );
  const deleteRef: any = useRef();

  const modalHandler = (target: any) => {
    if (selected[0].type === "دسترسی") {
      target.current?.modalHandler(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه دسترسی  برای حذف انتخاب کنید",
      });
    }
  };

  return (
    <div className={"toolbar items-center p-2 border-x border-border"}>
      <p className="mr-auto font-bold">دسترسی واحد کاری</p>
      <RelatedPartyAdd />
      <RelatedPartyEdit />
      <CRUDWrapper
        ref={deleteRef}
        title={`حذف دسترسی واحد کاری`}
        mode="delete"
        confirmHandler={(e, query) => {
          e.preventDefault();
          remove({}, { id: selected[0].id, ...query });
        }}
        modalMessage=" حذف دسترسی واحد کاری "
        entity="partyTitle"
        loading={loading}
        module={
          ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_related_detail
        }
        selectedItem={selected?.[0]}
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
