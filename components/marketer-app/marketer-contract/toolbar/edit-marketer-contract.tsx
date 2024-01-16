import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useState, useEffect } from "react";
import { throwToast } from "../../../../utils/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import { MarketerContractContext } from "pages/marketer-app/marketer-contract";
import { FindEnum } from "utils/common-funcions";
import { Button } from "components/common/components/button/button";

export default function EditMarketerContract() {
  const { fetchData, searchQuery, selectedRows } = useContext<any>(
    MarketerContractContext
  );
  const { toolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_marketerContract,
    "edit"
  );
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/marketer-contract/modify`,
    method: "PUT",
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});

  const openHandler = () => {
    if (selectedRows.length) {
      setQuery({});
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا برای ویرایش یک گزینه را انتخاب کنید",
      });
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await mutate({ contractId: selectedRows[0].ContractId, ...query })
      .then(() => {
        throwToast({ type: "success", value: `با موفقیت انجام شد` });
        setModal(false);
        setQuery(null);
        fetchData(searchQuery);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      });
  };

  useEffect(() => {
    if (modal && selectedRows?.length) {
      let _initialValue: any = {};
      toolbar.map((item: any) => {
        if (item.type === "selectInput") {
          _initialValue[`${item.title}`] = FindEnum(
            item.title,
            [],
            item.label
          ).find((e: any) => e.title === selectedRows[0][`${item.title}`]).id;
        } else if (item.title === "date") {
          _initialValue["StartDate"] = selectedRows[0]?.StartDate;
          _initialValue["EndDate"] = selectedRows[0]?.EndDate;
        } else {
          _initialValue[`${item.title}`] = selectedRows[0][`${item.title}`];
        }
      });
      setQuery(_initialValue);
    }
  }, [modal]);

  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  return (
    <>
      <Button
        className={"bg-secondary"}
        label="ویرایش قرارداد بازاریاب"
        onClick={openHandler}
      />
      <Modal title={"ویرایش قرارداد بازاریاب"} setOpen={setModal} open={modal}>
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
                    dataHelper={selectedRows[0]}
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
