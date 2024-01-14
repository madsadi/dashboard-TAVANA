import React, { createContext, useEffect, useState } from "react";
import { MARKETER_ADMIN } from "../../../api/constants";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { withPermission } from "components/common/layout/with-permission";
import InputComponent from "components/common/components/input-generator";
import { useSearchFilters } from "hooks/useSearchFilters";
import useMutation from "hooks/useMutation";
import { useRouter } from "next/router";
import useQuery from "hooks/useQuery";
import { Button } from "components/common/components/button/button";
import { throwToast } from "utils/notification";

export const ReciteContext = createContext({});
function FactorIdEdit() {
  const { data, fetchData }: any = useQuery({
    url: `${MARKETER_ADMIN}/factor/get-all`,
  });
  const { toolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_recite,
    "edit-accounting"
  );
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/factor/accounting`,
    method: "PUT",
  });
  const [query, setQuery] = useState<any>({});

  const router = useRouter();
  let params = router.query?.factorId?.[0];
  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  useEffect(() => {
    if (params) fetchData({ factorId: router.query?.factorId?.[0] });
  }, [params]);

  useEffect(() => {
    if (data?.result.pagedData?.length) {
      let _initialValue: any = {};
      {
        toolbar.map(
          (item: any) =>
            (_initialValue[item.title] = data.result.pagedData[0][item.title])
        );
      }
      setQuery(_initialValue);
    }
  }, [data]);

  const openHandler = () => {
    mutate({ factorId: params, ...query })
      .then(() => throwToast({ type: "success", value: "با موفقیت ویرایش شد" }))
      .catch(() => throwToast({ type: "error", value: "ناموفق" }));
  };

  return (
    <div className={"flex flex-col h-full flex-1"}>
      <div className={"grid grid-cols-4 gap-4"}>
        {toolbar.map((item: any) => {
          return (
            <InputComponent
              key={item.title}
              query={query}
              item={item}
              onChange={onChange}
            />
          );
        })}
      </div>
      <Button
        label="ثبت ویرایش"
        className={"w-fit mr-auto bg-secondary"}
        onClick={openHandler}
      />
    </div>
  );
}

export default withPermission(
  FactorIdEdit,
  ModuleIdentifier.MARKETER_APP_recite
);
