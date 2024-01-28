import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useState } from "react";
import { throwToast } from "../../../../utils/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import { ReciteContext } from "../../../../pages/marketer-app/recite";
import { Button } from "components/common/components/button/button";

export default function EditFactorStatus() {
  const { selectedRows, fetchData, searchQuery, setSelectedRows } =
    useContext<any>(ReciteContext);
  const { toolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_recite,
    "edit-status"
  );
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/factor/edit/status`,
    method: "PUT",
  });

  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});

  const openHandler = () => {
    if (selectedRows?.length === 1) {
      let initialValue: any = {};
      toolbar.map((item: any) => {
        initialValue[item.title] = selectedRows[0]?.[item.title];
      });
      setQuery(initialValue);
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
    await mutate({ factorId: selectedRows[0]?.FactorId, ...query })
      .then(() => {
        throwToast({ type: "success", value: `با موفقیت انجام شد` });
        setModal(false);
        setQuery(null);
        setSelectedRows([]);
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
        label="تغییر وضعیت"
        className={"bg-secondary"}
        onClick={openHandler}
      />
      <Modal title={"تغییر وضعیت"} setOpen={setModal} open={modal}>
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
