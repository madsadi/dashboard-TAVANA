import React, { useContext, useState } from "react";
import Modal from "../../common/layout/modal";
import { throwToast } from "../../../utils/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { Button } from "../../common/components/button/button";
import { InstrumentTypeContext } from "pages/commission-management/instrument-type";

export default function Remove() {
  const { restriction, service, modules } = useSearchFilters(
    ModuleIdentifier.COMMISSION_MANAGEMENT_instrument
  );
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    onSubmit,
    query: insQuery,
    selectedRows,
  } = useContext<any>(InstrumentTypeContext);
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/CommissionInstrumentType/Delete`,
    method: "PUT",
  });
  const confirmDeleteSelected = () => {
    if (selectedRows.length === 1) {
      setModal(true);
    } else {
      throwToast({ type: "warning", value: "لطفا یک گزینه را انتخاب کنید" });
    }
  };
  const deleteHandler = async () => {
    setLoading(true);
    await mutate({ id: selectedRows?.[0]?.id })
      .then(() => {
        throwToast({ type: "success", value: "با موفقیت انجام شد" });
        setModal(false);
        onSubmit(insQuery);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Button
        label="حذف"
        onClick={confirmDeleteSelected}
        className="bg-error"
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Delete"].join(".")]
            : []
        }
      />
      <Modal title={"تایید حذف"} open={modal} setOpen={setModal}>
        <div className="flex flex-col">
          <div className={"mx-auto"}>
            آیا از حذف ردیف مورد نظر اطمینان دارید؟
          </div>
          <div className={"mr-auto space-x-reverse space-x-2 mt-3"}>
            <Button
              label="خیر"
              onClick={() => setModal(false)}
              className="bg-error"
            />
            <Button
              label="بله"
              onClick={deleteHandler}
              loading={loading}
              className="bg-primary"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
