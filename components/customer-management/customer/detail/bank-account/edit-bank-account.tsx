import { ADMIN_GATEWAY } from "api/constants";
import { Button } from "components/common/components/button/button";
import InputComponent from "components/common/components/input-generator";
import Modal from "components/common/layout/modal";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import React, { useEffect, useState } from "react";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";

export default function EditBankAccount(props: any) {
  const { refetch, privateInfo, selectedItem } = props;
  const [modal, setModal] = useState(false);
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/bankAccount/Edit`,
  });
  const { toolbar, restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer,
    "add-bank-account"
  );
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modal && toolbar) {
      let ToEdit = selectedItem;
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
    await mutate({
      customerId: privateInfo.customerId,
      id: selectedItem.id,
      ...query,
    })
      .then(() => {
        refetch();
        setModal(false);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };

  const openModalHandler = () => {
    if (selectedItem) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  return (
    <>
      <Button
        label={"ویرایش حساب بانکی"}
        className="bg-secondary"
        onClick={openModalHandler}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Create"].join(".")]
            : []
        }
      />
      <Modal
        title={`ویرایش حساب بانکی`}
        ModalWidth={"max-w-3xl"}
        setOpen={setModal}
        open={modal}
      >
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
                  dataHelper={selectedItem}
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
