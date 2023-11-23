import React from "react";
import useMutation from "../../../hooks/useMutation";
import { NETFLOW } from "../../../api/constants";
import { throwToast } from "../../../utils/notification";
import { Button } from "components/common/components/button/button";

export default function NoDateBox({
  api,
  title,
}: {
  api: string;
  title: string;
}) {
  const { mutate } = useMutation({ url: `${NETFLOW}${api}` });

  const submitHandler = async () => {
    await mutate()
      .then(() => {
        throwToast({ type: "success", value: "با موفقیت انجام شد" });
      })
      .catch((err) => throwToast({ type: "error", value: err }));
  };

  return (
    <div
      className={"bg-white p-2 rounded shadow-sm border border-border h-full"}
    >
      <label htmlFor="username1" className="block mb-3">
        {title}
      </label>
      <Button
        onClick={submitHandler}
        className="bg-primary mt-10 mx-auto"
        label="بروزرسانی"
      />
    </div>
  );
}
