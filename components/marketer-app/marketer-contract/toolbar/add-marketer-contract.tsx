import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useState } from "react";
import { throwToast } from "../../../../utils/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import { MarketerContractContext } from "pages/marketer-app/marketer-contract";
import { Button } from "components/common/components/button/button";

export default function AddMarketerContract() {
  const { fetchData, searchQuery } = useContext<any>(MarketerContractContext);
  const { toolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_marketerContract,
    "add"
  );
  const { toolbar: deductionToolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_marketerContract_detail,
    "deduction"
  );
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/marketer-contract/add`,
  });
  const { mutate: mutateDeduction } = useMutation({
    url: `${MARKETER_ADMIN}/marketer-contract-deduction/add`,
  });
  const [modal, setModal] = useState(false);
  const [modalDeduction, setModalDeduction] = useState(false);
  const [query, setQuery] = useState<any>({});
  const [queryDeduction, setQueryDeduction] = useState<any>({});
  const [contractId, setContractId] = useState<string>("");

  const openHandler = () => {
    setQuery({});
    setModal(true);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await mutate(query)
      .then((res: any) => {
        throwToast({ type: "success", value: `با موفقیت انجام شد` });
        setModal(false);
        setContractId(res.data.result?.ContractId);
        setModalDeduction(true);
        setQuery(null);
        fetchData(searchQuery);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      });
  };
  const submitDeductionHandler = async (e: any) => {
    e.preventDefault();
    await mutateDeduction({ ...queryDeduction, contractId: contractId })
      .then(() => {
        throwToast({ type: "success", value: `با موفقیت انجام شد` });
        setModalDeduction(false);
        setQueryDeduction(null);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      });
  };
  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  const onChangeDeduction = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQueryDeduction(_query);
  };

  return (
    <>
      <Button
        className={"bg-primary"}
        label="ایجاد قرارداد جدید بازاریاب"
        onClick={openHandler}
      />
      <Modal
        title={"ایجاد قرارداد جدید بازاریاب"}
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
                    setQuery={setQuery}
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
      <Modal
        title={"ایجاد کسورات جدید قرارداد بازاریاب"}
        setOpen={setModalDeduction}
        open={modalDeduction}
      >
        <div className="field mt-4">
          <form onSubmit={submitDeductionHandler}>
            <div className={"grid grid-cols-2 gap-4"}>
              {deductionToolbar.map((item: any) => {
                return (
                  <InputComponent
                    key={item.title}
                    query={queryDeduction}
                    setQuery={setQueryDeduction}
                    item={item}
                    onChange={onChangeDeduction}
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
                  setModalDeduction(false);
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
