import { useContext } from "react";
import { ADMIN_GATEWAY } from "api/constants";
import { Button } from "components/common/components/button/button";
import InputComponent from "components/common/components/input-generator";
import Modal from "components/common/layout/modal";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import React, { useEffect, useState } from "react";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerBankAccountContext } from "./customer-bank-account-info";

export default function ConfirmBankAccount() {
  const { fetchHandler, selected } = useContext<any>(
    CustomerBankAccountContext
  );
  const [modal, setModal] = useState(false);
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/bankAccount/EditConfirmationStatus`,
    method: "PATCH",
  });
  const { toolbar, restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer,
    "confirm-bank-account"
  );
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modal && toolbar) {
      let ToEdit = selected;
      let initialValue: any = {};
      toolbar?.map((item: any) => {
        initialValue[item.title] = ToEdit?.[item.title];
      });
      setQuery(initialValue);
    }
  }, [modal, toolbar]);

  const addNewHandler = async (e: any, query: any) => {
    e.preventDefault();
    setLoading(true);
    await mutate({ id: selected.id, ...query })
      .then(() => {
        throwToast({ type: "success", value: "حساب بانکی با موفقیت تایید شد" });
        fetchHandler();
        setModal(false);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };

  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  const openModalHandler = () => {
    if (selected) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  return (
    <>
      <Button
        label={"تائید "}
        className="bg-secondary"
        onClick={openModalHandler}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
            : []
        }
      />
      <Modal title={`تائید حساب بانکی`} setOpen={setModal} open={modal}>
        <div className="field mt-4">
          <form className={"grid grid-cols-2 gap-4"}>
            {toolbar?.map((item: any) => {
              return (
                <InputComponent
                  key={item.title}
                  query={query}
                  item={item}
                  setQuery={setQuery}
                  onChange={onChange}
                />
              );
            })}
          </form>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              label={"لغو"}
              className="bg-error"
              onClick={() => setModal(false)}
            />
            <Button
              label={"تایید"}
              className="bg-primary"
              type={"submit"}
              loading={loading}
              onClick={(e) => addNewHandler(e, query)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
