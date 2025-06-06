import React, { useContext, useState } from "react";
import { CommissionContext } from "../../../../pages/commission-management/commission";
import { ADMIN_GATEWAY } from "../../../../api/constants";
import useMutation from "../../../../hooks/useMutation";
import { throwToast } from "../../../../utils/notification";
import InputComponent from "../../../common/components/input-generator";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import Modal from "../../../common/layout/modal";
import { Button } from "../../../common/components/button/button";

export default function InActive() {
  const { toolbar, restriction, service, modules } = useSearchFilters(
    ModuleIdentifier.COMMISSION_MANAGEMENT_detail,
    "delete"
  );
  const { selectedRows } = useContext<any>(CommissionContext);
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/CommissionDetail/InActive`,
    method: "PUT",
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const editHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await mutate({ id: selectedRows[0].id, ...query })
      .then(() => {
        throwToast({ type: "success", value: "با موفقیت انجام شد" });
        setModal(false);
        setQuery({});
      })
      .catch((err) => throwToast({ type: "error", value: err }))
      .finally(() => setLoading(false));
  };

  const openHandler = () => {
    if (selectedRows.length) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای غیر فعال کردن انتخاب کنید",
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
        label="غیرفعال کردن جزئیات ضرایب کارمزد"
        onClick={openHandler}
        className="bg-error"
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
            : []
        }
      />
      <Modal
        title={"غیرفعال کردن جزئیات ضرایب کارمزد"}
        ModalWidth={"max-w-3xl"}
        setOpen={setModal}
        open={modal}
      >
        <div className="field mt-4">
          <form className={"grid grid-cols-2 gap-4"}>
            {toolbar.map((item: any) => {
              return (
                <InputComponent
                  key={item.title}
                  query={query}
                  setQuery={setQuery}
                  item={item}
                  onChange={onChange}
                />
              );
            })}
          </form>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              label="لغو"
              onClick={(e) => {
                e.preventDefault();
                setModal(false);
              }}
              className="bg-error"
            />
            <Button
              label="تایید"
              type={"submit"}
              onClick={editHandler}
              loading={loading}
              className="bg-primary"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
