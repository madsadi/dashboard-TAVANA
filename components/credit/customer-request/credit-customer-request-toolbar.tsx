import { useContext } from "react";
import { CRUDWrapper } from "components/common/context/CRUD-wrapper";
import { Button } from "components/common/components/button/button";
import { useRef, useState } from "react";
import { CREDIT_MANAGEMENT } from "api/constants";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CreditCustomerRequestContext } from "pages/credit/customer-request";

export const CreditCustomerRequestToolbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchData, selected } = useContext<any>(CreditCustomerRequestContext);

  const { restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CREDIT_customer_request
  );
  const { mutate: addCustomerReq } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Customer/Credit/Request/Post`,
    method: "POST",
    onSuccess: () => {
      addRef.current?.modalHandler(false);
      fetchData();
    },
    setLoading: setLoading,
  });

  const { mutate: editCustomerReq } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Customer/Credit/Request/Edit`,
    method: "PUT",
    onSuccess: () => {
      editRef.current?.modalHandler(false);
      fetchData();
    },
    setLoading: setLoading,
  });

  const { mutate: editCustomerReqState } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Customer/Credit/Request/State/Edit`,
    method: "PUT",
    onSuccess: () => {
      editStateRef.current?.modalHandler(false);
      fetchData();
    },
    setLoading: setLoading,
  });

  const { mutate: deleteCustomerReq } = useMutation({
    url: `${CREDIT_MANAGEMENT}/Customer/Credit/Request/Delete`,
    method: "DELETE",
    onSuccess: () => {
      deleterRef.current?.modalHandler(false);
      fetchData();
    },
    setLoading: setLoading,
  });

  const addRef: any = useRef();
  const editRef: any = useRef();
  const editStateRef: any = useRef();
  const deleterRef: any = useRef();

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
        ref={addRef}
        title={`درخواست جدید`}
        confirmHandler={(e, query) => {
          e.preventDefault();
          addCustomerReq({
            customerId: selected?.customerId,
            tradeCode: selected?.tradeCode,
            ...query,
          });
        }}
        loading={loading}
        module={ModuleIdentifier.CREDIT_customer_request}
        subModule="add"
      >
        <Button
          label={"جدید"}
          className="bg-primary"
          onClick={() => modalHandler(addRef)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={editRef}
        title={` ویرایش درخواست `}
        confirmHandler={(e, query) => {
          e.preventDefault();
          editCustomerReq({
            requestId: selected?.requestId,
            customerId: selected?.customerId,
            tradeCode: selected?.tradeCode,
            ...query,
          });
        }}
        mode="edit"
        loading={loading}
        module={ModuleIdentifier.CREDIT_customer_request}
        subModule="add"
        selectedItem={selected}
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
        ref={editStateRef}
        title={` ویرایش وضعیت درخواست `}
        confirmHandler={(e, query) => {
          e.preventDefault();
          editCustomerReqState({
            requestId: selected?.requestId,
            ...query,
          });
        }}
        mode="edit"
        loading={loading}
        module={ModuleIdentifier.CREDIT_customer_request}
        subModule="edit-state"
        selectedItem={selected}
      >
        <Button
          label={"ویرایش وضعیت"}
          className="bg-secondary"
          onClick={() => modalHandler(editStateRef)}
          allowed={
            restriction
              ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
              : []
          }
        />
      </CRUDWrapper>
      <CRUDWrapper
        ref={deleterRef}
        title={` حذف درخواست `}
        modalMessage="حذف درخواست مشتری با کد معاملاتی "
        confirmHandler={() => {
          deleteCustomerReq({
            requestId: selected?.requestId,
          });
        }}
        mode="delete"
        entity="tradeCode"
        loading={loading}
        module={ModuleIdentifier.CREDIT_customer_request}
        selectedItem={selected}
      >
        <Button
          label={"ویرایش وضعیت"}
          className="bg-error"
          onClick={() => modalHandler(deleterRef)}
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
