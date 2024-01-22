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
    url: `${MARKETER_ADMIN}/factor/search`,
  });

  const router = useRouter();
  let params = router.query?.FactorID;

  useEffect(() => {
    if (params) fetchData({ FactorId: params });
  }, [params]);

  const items = [
    {
      field: "Period",
      headerName: "دوره",
    },
    {
      field: "TotalTurnOver",
      headerName: "مبلغ  گردش  ساخته شده طی دوره ",
    },
    {
      field: "TotalBrokerCommission",
      headerName: "مبلغ کارمزد  ساخته شده",
    },
    {
      field: "COEFFICIENT",
      headerName: "سهم نقد",
    },
    {
      field: "TotalNetBrokerCommission",
      headerName: "کار مزد  مبلغ  مبنای محاسبات",
    },
    {
      field: "Plan",
      headerName: "رتبه در گروه پلکان",
    },
    {
      field: "StepNumber",
      headerName: "درصد کارمزد  سهم بازار یاب",
    },
    {
      field: "MarketerCommissionIncome",
      headerName: "مبلغ کارمزد سهم بازار یاب بر اساس نظام پلکان",
    },
    // {
    //   field: "TotalCMD",
    //   headerName: "مجموع سهم صندوق توسعه",
    // },
    {
      field: "TaxCoefficient",
      headerName: "ضریب مالیات",
    },
    {
      field: "Tax",
      headerName: "مالیات",
    },
    {
      field: "CollateralCoefficient",
      headerName: "ضریب حسن انجام کار",
    },
    {
      field: "CollateralOfThisMonth",
      headerName: "کسورات حسن انجام کار این ماه",
    },
    {
      field: "Guarantee",
      headerName: "سپرده  تضمین",
    },
    {
      field: "GuaranteeCoefficient",
      headerName: "ضریب سپرده تضمین",
    },
    {
      field: "SumOfOtherDeductions",
      headerName: "سایر کسورات",
    },
    {
      field: "TotalFeeOfFollowers",
      headerName: "گردش خالص زیر مجموعه ها",
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
      field: "SumOfAdditions",
      headerName: "مجموع پرداختی",
    },
    {
      field: "SumOfOtherAdditions",
      headerName: "سایر پرداختی",
    },

    {
      field: "SumOfLegalDeductions",
      headerName: "کسورات قانونی",
    },
    {
      field: "TotalFeeOfFollowers",
      headerName: "مجموع حق بازاریابی",
    },
    {
      field: "OtherDeduction",
      headerName: "سایر کسورات",
    },
    {
      field: "Payment",
      headerName: "پرداختی",
    },
  ];

  const links = [
    {
      field: "Title",
      headerName: "عنوان",
    },
    {
      field: "TotalFee",
      headerName: "سود کل",
    },
    {
      field: "Coefficient",
      headerName: "ضریب حق معرف",
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
        <div>
          <label>زیر مجموعه ها</label>
          {data?.result?.pagedData?.[0].Links?.map((item: any) => {
            return (
              <div
                className="border border-border rounded-lg p-2"
                key={item.title}
              >
                {links.map((i: any) => {
                  return (
                    <div
                      className="flex items-center justify-between mr-5"
                      key={item.title}
                    >
                      <label>{item[i.headerName]}</label>
                      <div>{item[i.field]}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default withPermission(
  FactorIdDetail,
  ModuleIdentifier.MARKETER_APP_recite
);
