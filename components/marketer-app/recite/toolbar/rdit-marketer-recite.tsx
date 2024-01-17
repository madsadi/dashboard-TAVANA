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
import { FilterItemType } from "types/constant-filters.types";
import useQuery from "hooks/useQuery";
import { upperFirstLetter } from "utils/common-funcions";

export default function EditMarketerRecite() {
  const { selectedRows, fetchData, searchQuery } =
    useContext<any>(ReciteContext);
  const { toolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_recite,
    "calculate"
  );
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/factor/edit`,
    method: "PUT",
  });
  const { fetchData: sync, loading } = useQuery({
    url: `${MARKETER_ADMIN}/grpc/subordinate-sync`,
  });

  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});
  const [filters, setFilters] = useState<any>(toolbar);

  console.log(query, selectedRows);

  const openHandler = () => {
    if (selectedRows?.length === 1) {
      sync({}, () => {
        let _query: any = {};
        filters.map((item: any) => {
          if (item?.isMultiple) {
            _query[item.title] =
              selectedRows[0]?.[upperFirstLetter(item.title)] || [];
          } else {
            if (item.title === "month" || item.title === "year") {
              _query["year"] = +selectedRows[0]?.Period.substring(0, 4);
              _query["month"] = selectedRows[0]?.Period.substring(4, 6);
            } else {
              _query[item.title] =
                selectedRows[0]?.[upperFirstLetter(item.title)];
            }
          }
        });
        setFilters(toolbar);
        setQuery(_query);
        setModal(true);
      });
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const { year, month, ...rest } = query;
    await mutate({ ...rest, period: year + month })
      .then(() => {
        throwToast({ type: "success", value: `با موفقیت انجام شد` });
        setModal(false);
        setQuery(null);
        fetchData(searchQuery);
      })
      .catch((err) => throwToast({ type: "error", value: err }));
  };
  const onChange = (key: string, value: any, item?: FilterItemType) => {
    if (item?.dependancy && item.onChange) {
      const _filters = filters;
      const newDependantInput = item.onChange(value);
      const oldDependantInput = _filters.findIndex(
        (f: any) => f.title === item?.dependancy
      );

      _filters.splice(oldDependantInput, 1, newDependantInput);
      setFilters(_filters);
    }
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
        loading={loading}
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
