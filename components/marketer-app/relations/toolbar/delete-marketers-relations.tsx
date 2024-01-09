import React, { useContext, useState } from "react";
import Modal from "../../../common/layout/modal";
import { throwToast } from "../../../../utils/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { RelationsContext } from "../../../../pages/marketer-app/relations";
import { Button } from "components/common/components/button/button";

export default function DeleteMarketersRelations() {
  const { selectedRows, setSelectedRows, fetchData, searchQuery } =
    useContext<any>(RelationsContext);
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/marketer-relation/delete`,
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
    await mutate(
      {},
      {
        LeaderMarketerId: selectedRows[0].LeaderMarketerId,
        FollowerMarketerId: selectedRows[0].FollowerMarketerId,
      }
    )
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
        label="حذف رابطه بین دو بازاریاب"
        className={"bg-error"}
        onClick={openHandler}
      />
      <Modal
        title={"حذف رابطه بین دو بازاریاب"}
        setOpen={setModal}
        open={modal}
      >
        <div className="field mt-4">
          <p className={"text-center"}>
            آیا از حذف کردن این ارتباط اطمینان دارید؟
          </p>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              className="bg-error"
              label="لغو"
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
