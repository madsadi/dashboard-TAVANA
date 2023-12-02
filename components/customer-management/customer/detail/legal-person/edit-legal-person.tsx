import { ADMIN_GATEWAY } from "api/constants";
import { Button } from "components/common/components/button/button";
import InputComponent from "components/common/components/input-generator";
import Modal from "components/common/layout/modal";
import useMutation from "hooks/useMutation";
import { useSearchFilters } from "hooks/useSearchFilters";
import React, { useContext, useEffect, useState } from "react";
import { ModuleIdentifier } from "utils/Module-Identifier";
import { throwToast } from "utils/notification";
import { CustomerLegalPersonInfoContext } from "./customer-legal-person";

export default function EditLegalPerson({
  isMainPage,
}: {
  isMainPage: boolean;
}) {
  const { fetchHandler, customerId, info } = useContext<any>(
    CustomerLegalPersonInfoContext
  );
  const [modal, setModal] = useState(false);
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/legalPerson/edit`,
  });
  const { toolbar, restriction, modules, service } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer,
    "add-legal-person"
  );
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modal && toolbar) {
      let ToEdit = info;
      let initialValue: any = {};
      toolbar?.map((item: any) => {
        initialValue[item.title] = ToEdit?.[item.title];
      });
      setQuery(initialValue);
    }
  }, [toolbar, modal]);

  const addNewHandler = async (e: any, query: any) => {
    e.preventDefault();
    setLoading(true);
    await mutate({ customerId: customerId, ...query })
      .then(() => {
        throwToast({
          type: "success",
          value: "اطلاعات با موفقیت ویرایش شد",
        });
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

  const modalHandler = () => {
    if ((info && !isMainPage) || (isMainPage && info)) {
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
        label={"ویرایش"}
        className="bg-secondary"
        onClick={modalHandler}
        disabled={!info && !isMainPage}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
            : []
        }
      />
      <Modal
        title={`ویرایش اطلاعات هویتی`}
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
                  dataHelper={info}
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
