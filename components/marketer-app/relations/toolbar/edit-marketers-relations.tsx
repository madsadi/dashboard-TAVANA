import InputComponent from "../../../common/components/input-generator";
import Modal from "../../../common/layout/modal";
import React, { useContext, useEffect, useState } from "react";
import { throwToast } from "../../../../utils/notification";
import useMutation from "../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../api/constants";
import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import { RelationsContext } from "../../../../pages/marketer-app/relations";
import { Button } from "components/common/components/button/button";

export default function EditMarketersRelations() {
  const { selectedRows, fetchData, searchQuery, setSelectedRows } =
    useContext<any>(RelationsContext);
  const { toolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_relations,
    "edit"
  );
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/marketer-relation/modify`,
    method: "PUT",
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});

  useEffect(() => {
    if (modal && selectedRows?.length) {
      let _initialValue: any = {};
      _initialValue["LeaderMarketerId"] = selectedRows[0][`LeaderMarketerId`];
      _initialValue["FollowerMarketerId"] =
        selectedRows[0][`FollowerMarketerId`];
      _initialValue["CommissionCoefficient"] =
        selectedRows[0][`CommissionCoefficient`];
      _initialValue["StartDate"] = selectedRows[0]?.StartDate;
      _initialValue["EndDate"] = selectedRows[0]?.EndDate;
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
        label="ویرایش رابطه بین دو بازاریاب"
        className={"bg-secondary"}
        onClick={openHandler}
      />
      <Modal
        title={"ویرایش رابطه بین دو بازاریاب"}
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
                    dataHelper={selectedRows[0]}
                  />
                );
              })}
            </div>
            <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
              <Button
                className=" bg-error"
                label="لغو"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRows([]);
                  setModal(false);
                }}
              />
              <Button type={"submit"} className=" bg-primary" label="تایید" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
