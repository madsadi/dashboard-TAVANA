import React, { useEffect } from "react";
import { MARKETER_ADMIN } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "../../../components/common/layout/with-permission";
import { useRouter } from "next/router";
import useQuery from "../../../hooks/useQuery";
import { formatNumber } from "../../../utils/common-funcions";

const DisplayValue = ({ item }: any) => {
  return (
    <div className="flex items-center justify-between">
      <label>{item.key}</label>
      <div>
        {item.isBoolean ? (item.value ? "بله" : "خیر") : formatNumber(item, 0)}
      </div>
    </div>
  );
};

function FactorIdDetail() {
  const { data, fetchData }: any = useQuery({
    url: `${MARKETER_ADMIN}/factor/get-all`,
  });

  const router = useRouter();
  let params = router.query?.FactorID;

  useEffect(() => {
    if (params) fetchData({ FactorID: params });
  }, [params]);

  const items = [
    {
      field: "TotalTurnOver",
      headerName: "مجموع گردش",
    },
    {
      field: "TotalBrokerCommission",
      headerName: "مجموع کارمزد کارگزاری",
    },
    {
      field: "TotalNetBrokerCommission",
      headerName: "مجموع خالص کارمزد کارگزار",
    },
    {
      field: "MarketerCommissionIncome",
      headerName: "حق بازاریابی از خالص کارمزد در دوره",
    },
    {
      field: "TotalCMD",
      headerName: "مجموع سهم صندوق توسعه",
    },
    {
      field: "Tax",
      headerName: "مالیات",
    },
    {
      field: "CollateralOfThisMonth",
      headerName: "کسورات حسن انجام کار این ماه",
    },
    {
      field: "TotalFeeOfFollowers",
      headerName: "گردش خالض زیر مجموعه ها",
    },
    {
      field: "SumOfAdditions",
      headerName: "سایر پرداختی",
    },
    {
      field: "SumOfDeductions",
      headerName: "سایر کسورات",
    },
    {
      field: "Payment",
      headerName: "پرداختی",
    },
    {
      field: "IsCmdConcluded",
      headerName: "سهم صندوق توسعه اضافه میشود؟",
      isBoolean: true,
    },
    {
      field: "MaketerCMDIncome",
      headerName: "حق بازاریابی از سهم صندوق توسعه",
    },
    {
      field: "TaxDeduction",
      headerName: "مالیات",
    },
    {
      field: "TaxCoefficient",
      headerName: "ضریب مالیات",
    },
    {
      field: "CollateralDeduction",
      headerName: "کسورات حسن انجام کار",
    },
    {
      field: "CollateralCoefficient",
      headerName: "ضریب کسورات حسن انجام کار",
    },
    {
      field: "InsuranceDeduction",
      headerName: "کسورات بیمه",
    },
    {
      field: "InsuranceCoefficient",
      headerName: "ضریب کسورات بیمه",
    },
    {
      field: "MarketerTotalIncome",
      headerName: "مجموع حق بازاریابی",
    },
    {
      field: "CalculationCoefficient",
      headerName: "ضریب محاسبه حق بازاریابی",
    },
    {
      field: "ReturnDuration",
      headerName: "دوره برگشت سپرده ها",
    },
    {
      field: "InterimAmountDeduction",
      headerName: "کسورات علی الحساب",
    },
    {
      field: "EmployeeSalaryDeduction",
      headerName: "کسورات حقوق پرسنل",
    },
    {
      field: "EmployerInsuranceDeduction",
      headerName: "کسورات بیمه سهم کارفرما",
    },
    {
      field: "RedemptionDeduction",
      headerName: "کسورات بازخرید",
    },
    {
      field: "OtherDeduction",
      headerName: "سایر کسورات",
    },
    {
      field: "OtherDeductionDescription",
      headerName: "توضیحات (سایر کسورات)",
    },
    {
      field: "CmdPayment",
      headerName: "پرداختی سهم صندوق توسعه",
    },
    {
      field: "CollateralReturnPayment",
      headerName: "پرداختی برگشت حسن انجام کار",
    },
    {
      field: "InsuranceReturnPayment",
      headerName: "پرداختی برگشت بیمه",
    },
    {
      field: "OtherPayment",
      headerName: "سایر پرداختی ها",
    },
  ];

  return (
    <div className={"flex flex-col h-full grow"}>
      <div className="StyledReceipt shadow mx-auto">
        {items.map((i: any) => {
          return (
            <DisplayValue
              key={i.field}
              item={{
                ...i,
                key: i?.headerName,
                value: data?.result?.pagedData?.[0][`${i.field}`],
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default withPermission(
  FactorIdDetail,
  ModuleIdentifier.MARKETER_APP_recite
);
