import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useEffect, useState } from "react";
import { throwToast } from "../../../../utils/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import { ReciteContext } from "../../../../pages/marketer-app/recite";
import { Button } from "components/common/components/button/button";

export default function EditMarketerRecite() {
  const { selectedRows, fetchData, searchQuery } =
    useContext<any>(ReciteContext);
  const { toolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_recite,
    "edit-base"
  );
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/factor/base`,
    method: "PUT",
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});

  useEffect(() => {
    if (modal && selectedRows?.length) {
      let _initialValue: any = {};
      _initialValue["FactorID"] = selectedRows[0][`FactorID`];
      _initialValue["TotalTurnOver"] = selectedRows[0][`TotalTurnOver`];
      _initialValue["TotalBrokerCommission"] =
        selectedRows[0][`TotalBrokerCommission`];
      _initialValue["TotalCMD"] = selectedRows[0][`TotalCMD`];
      _initialValue["TotalNetBrokerCommission"] =
        selectedRows[0][`TotalNetBrokerCommission`];
      _initialValue["MarketerCommissionIncome"] =
        selectedRows[0][`MarketerCommissionIncome`];
      _initialValue["TotalFeeOfFollowers"] =
        selectedRows[0][`TotalFeeOfFollowers`];
      _initialValue["IsCmdConcluded"] = selectedRows[0][`IsCmdConcluded`];
      _initialValue["MaketerCMDIncome"] = selectedRows[0][`MaketerCMDIncome`];
      _initialValue["Status"] = selectedRows[0][`Status`];

      setQuery(_initialValue);
    }
  }, [modal]);

  const openHandler = () => {
    if (selectedRows?.length === 1) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    await mutate(query)
      .then((res) => {
        throwToast({ type: "success", value: `با موفقیت انجام شد` });
        setModal(false);
        setQuery(null);
        fetchData(searchQuery);
      })
      .catch((err) => throwToast({ type: "error", value: err }));
  };
  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };
  return (
    <>
      <Button
        label="اصلاح کردن پایه صورت حساب"
        className={"bg-secondary"}
        onClick={openHandler}
      />
      <Modal
        title={"اصلاح کردن پایه صورت حساب"}
        setOpen={setModal}
        open={modal}
      >
        <div className="field mt-4">
          <form onSubmit={submitHandler}>
            <div className={"grid grid-cols-2 gap-4"}>
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
            <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
              <Button
                className="bg-error"
                label="لغو"
                onClick={(e) => {
                  e.preventDefault();
                  setModal(false);
                }}
              />
              <Button type={"submit"} className="bg-primary" label="تایید" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
