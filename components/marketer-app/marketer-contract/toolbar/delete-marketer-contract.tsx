import React, { useContext, useState } from "react";
import Modal from "../../../common/layout/modal";
import { throwToast } from "../../../../utils/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { MarketerContractContext } from "pages/marketer-app/marketer-contract";
import { Button } from "components/common/components/button/button";

export default function DeleteMarketerContract() {
  const { selectedRows, setSelectedRows, fetchData, searchQuery } =
    useContext<any>(MarketerContractContext);
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/marketer-contract/delete`,
    method: "DELETE",
  });
  const [modal, setModal] = useState(false);

  const openHandler = () => {
    if (selectedRows?.length === 1) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای حذف انتخاب کنید",
      });
    }
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    await mutate({ contractId: selectedRows[0].ContractId })
      .then(() => {
        throwToast({ type: "success", value: `با موفقیت انجام شد` });
        setModal(false);
        setSelectedRows([]);
        fetchData(searchQuery);
      })
      .catch((err) => throwToast({ type: "error", value: err }));
  };

  return (
    <>
      <Button
        className={"bg-error"}
        label="حذف قرارداد بازاریاب"
        onClick={openHandler}
      />
      <Modal title={"حذف قرارداد بازاریاب"} setOpen={setModal} open={modal}>
        <div className="field mt-4">
          <p className={"text-center"}>
            آیا از حذف کردن این قرارداد اطمینان دارید؟
          </p>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              label="لغو"
              className="bg-error"
              onClick={(e) => {
                e.preventDefault();
                setModal(false);
              }}
            />
            <Button
              type={"submit"}
              onClick={submitHandler}
              className="bg-primary"
              label="تایید"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
