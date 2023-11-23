import React, { useContext } from "react";
import { throwToast } from "../../../../utils/notification";
import { ReciteContext } from "../../../../pages/marketer-app/recite";
import { Button } from "components/common/components/button/button";
import Link from "next/link";

export default function EditAccounting() {
  const { selectedRows } = useContext<any>(ReciteContext);

  const openHandler = () => {
    if (selectedRows?.length === 1) {
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  return (
    <Button className={"bg-secondary"} onClick={openHandler}>
      <Link
        href={
          selectedRows[0]?.FactorID
            ? `/marketer-app/recite/${selectedRows[0]?.FactorID}`
            : ""
        }
        target={selectedRows[0]?.FactorID ? "_blank" : "_self"}
      >
        اصلاح کردن مالی صورت حساب
      </Link>
    </Button>
  );
}
