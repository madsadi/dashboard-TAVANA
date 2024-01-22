import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useContext, useRef, useState } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerManagementMarketer } from "pages/holding-management/marketer";
import { TBSMarketer } from "../tbs-marketer";
import { CreateRefCode } from "../create-ref-code";
import { TBSReagents } from "../tbs-reagents";

export const MarketerToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: edit } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/marketer/Edit`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: editBranch } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/marketer/EditBranch`,
    method: "PATCH",
    onSuccess: () => {
      fetchData();
      editBranchRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: remove } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/marketer/Delete`,
    method: "DELETE",
    onSuccess: () => {
      fetchData();
      deleteRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { mutate: add } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/marketer/Add`,
    method: "POST",
    onSuccess: () => {
      fetchData();
      addRef.current?.modalHandler(false);
    },
    setLoading: setLoading,
  });
  const { fetchData, selected } = useContext<any>(CustomerManagementMarketer);

  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer
  );
  const editRef: any = useRef();
  const editBranchRef: any = useRef();
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
        title={`مارکتر جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          add(query);
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer}
        subModule="add"
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
        title={`ویرایش مارکتر`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          edit({
            id: selected[0]?.id,
            ...query,
          });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer}
        selectedItem={selected[0]}
        subModule="edit"
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
        ref={editBranchRef}
        title={`ویرایش شعبه مارکتر`}
        mode="edit"
        confirmHandler={(e, query) => {
          e.preventDefault();
          editBranch({
            id: selected[0]?.id,
            ...query,
          });
        }}
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer}
        selectedItem={selected[0]}
        subModule="edit-branch"
      >
        <Button
          label={"ویرایش شعبه"}
          className="bg-secondary"
          onClick={() => modalHandler(editBranchRef)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={deleteRef}
        title={`حذف مارکتر`}
        mode="delete"
        confirmHandler={(e, query) => {
          e.preventDefault();
          remove({}, { id: selected[0].id, ...query });
        }}
        modalMessage=" حذف مارکتر "
        entity="title"
        loading={loading}
        module={ModuleIdentifier.CUSTOMER_MANAGEMENT_marketer}
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
      <TBSMarketer />
      <TBSReagents />
      <CreateRefCode />
    </div>
  );
};
