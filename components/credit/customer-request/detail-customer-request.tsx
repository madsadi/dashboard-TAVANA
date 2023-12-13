import React from "react";
import useQuery from "../../../hooks/useQuery";
import { CREDIT_MANAGEMENT } from "../../../api/constants";
import { formatNumberSecond } from "utils/common-funcions";

export default function DetailCustomerRequest({ data }: { data: any }) {
  const { data: result } = useQuery({
    url: `${CREDIT_MANAGEMENT}/Customer/Credit/Assignable/value`,
    revalidateOnMount: true,
    params: {
      tradeCode: data?.tradeCode,
    },
  });

  return (
    <div className={"m-5 flex flex-col h-full pb-16"}>
      <p>
        مقدار قابل تخصیص:
        <span className="font-bold mx-2">
          {formatNumberSecond(result?.result?.availabelCreditAmount)}
        </span>
      </p>
    </div>
  );
}
