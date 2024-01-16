import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { OwnerPartyAdd } from "./ownerparty-add";
import { OwnerPartyEdit } from "./ownerparty-edit";
import { CustomerManagementBusinessUnitDetailContext } from "pages/customer-management/business-unit-detail";

export const BusinessUnitDetailOwnerToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: remove } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/businessUnitOwnerParty/Delete`,
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
    ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_owner_detail
  );
  const deleteRef: any = useRef();

  const modalHandler = (target: any) => {
    if (selected[0].type === "مالک") {
      target.current?.modalHandler(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه مالک برای حذف انتخاب کنید",
      });
    }
  };

  return (
    <div className={"toolbar items-center p-2 border-x border-border"}>
      <p className="mr-auto font-bold">مالک واحد کاری</p>
      <OwnerPartyAdd />
      <OwnerPartyEdit />
      <CRUDWrapper
        ref={deleteRef}
        title={`حذف مالک واحد کاری`}
        mode="delete"
        confirmHandler={(e, query) => {
          e.preventDefault();
          remove({}, { id: selected[0].id, ...query });
        }}
        modalMessage="حذف مالک واحد کاری"
        entity="partyTitle"
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_businessUnit_owner_detail}
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
