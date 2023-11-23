import React, { useEffect } from "react";
import Image from "next/image";
import { findBank } from "../../../../utils/common-funcions";
import LabelValue from "../../../common/components/label-value";
import { accountTypeEnums } from "../enums";
import DaisyAccordionComponent from "../../../common/components/daisy-accordion";
import { useRouter } from "next/router";
import useQuery from "../../../../hooks/useQuery";
import { ADMIN_GATEWAY } from "../../../../api/constants";
import { useSelector } from "react-redux";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import { isAllowed } from "../../../../utils/permission-utils";

export default function BankComponent() {
  const { user_permissions: userPermissions } = useSelector(
    (state: any) => state.appConfig
  );
  const { service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.ONLINE_REGISTRATION,
    "edit"
  );
  const { data, fetchData }: any = useQuery({
    url: `${ADMIN_GATEWAY}/api/request/GetUserBankAccounts`,
  });
  const router = useRouter();
  let dep = router.query?.detail?.[0];

  useEffect(() => {
    if (
      dep &&
      (restriction
        ? isAllowed({
            userPermissions,
            whoIsAllowed: [[service?.[0], modules?.[0]?.[0], "Read"].join(".")],
          })
        : true)
    ) {
      const queryData = dep.split("&");
      let _query: any = {};

      _query["userId"] = queryData[0].split("=")[1];
      fetchData(_query);
    }
  }, [dep, userPermissions]);

  return (
    <>
      {data?.result?.bankAccounts.length ? (
        <DaisyAccordionComponent title={"اطلاعات بانکی"}>
          {data?.result?.bankAccounts?.map((item: any) => {
            return (
              <div
                className="grid md:grid-cols-4 grid-cols-2 gap-3 border border-dashed border-gray-200 p-5 mb-3"
                key={item?.accountNumber}
              >
                <div>
                  <Image
                    src={`/bankIcons/${findBank(item?.bank?.name)?.logo}.svg`}
                    height={24}
                    width={24}
                    alt={item?.branchName}
                  />
                </div>
                <LabelValue
                  title={"شماره حساب"}
                  value={item?.accountNumber || "ثبت نشده"}
                />
                <LabelValue
                  title={"نام بانک"}
                  value={item?.bank?.name || "ثبت نشده"}
                />
                <LabelValue
                  title={"نام شعبه"}
                  value={item?.branchName || "ثبت نشده"}
                />
                <LabelValue
                  title={"شهر شعبه"}
                  value={item?.branchCity?.name || "ثبت نشده"}
                />
                <LabelValue
                  title={"شماره شعبه"}
                  value={item?.sheba || "ثبت نشده"}
                />
                <LabelValue
                  title={"نوع حساب"}
                  value={
                    accountTypeEnums.find((i: any) => i.enTitle === item?.Type)
                      ?.faTitle
                  }
                />
              </div>
            );
          })}
        </DaisyAccordionComponent>
      ) : null}
    </>
  );
}
