import InputComponent from "../../../../common/components/input-generator";
import Modal from "../../../../common/layout/modal";
import React, { useContext, useState, useEffect } from "react";
import { throwToast } from "../../../../../utils/notification";
import useMutation from "../../../../../hooks/useMutation";
import { MARKETER_ADMIN } from "../../../../../api/constants";
import { useSearchFilters } from "../../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../../utils/Module-Identifier";
import { MarketerContractDetailContext } from "pages/marketer-app/marketer-contract/[...contractId]";
import { Button } from "components/common/components/button/button";

export default function EditMarketerContractDetail(props: any) {
  const { selected } = props;
  const { deductionFetch, deductionSearchQuery, contractId } = useContext<any>(
    MarketerContractDetailContext
  );
  const { toolbar } = useSearchFilters(
    ModuleIdentifier.MARKETER_APP_marketerContract_detail,
    "deduction"
  );
  const { mutate } = useMutation({
    url: `${MARKETER_ADMIN}/marketer-contract-deduction/modify`,
    method: "PUT",
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});

  const openHandler = () => {
    setQuery({});
    setModal(true);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await mutate({
      contractId: contractId,
      deductionId: selected.DeductionId,
      ...query,
    })
      .then(() => {
        throwToast({ type: "success", value: `با موفقیت انجام شد` });
        setModal(false);
        setQuery(null);
        deductionFetch(deductionSearchQuery);
      })
      .catch((err) => {
        throwToast({ type: "error", value: err });
      });
  };

  useEffect(() => {
    if (modal && selected) {
      let _initialValue: any = {};
      toolbar.map((item: any) => {
        _initialValue[`${item.title}`] = selected[`${item.title}`];
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
        label="ویرایش کسورات قرارداد بازاریاب"
        className={"bg-secondary"}
        onClick={openHandler}
      />
      <Modal
        title={"ویرایش کسورات قرارداد بازاریاب"}
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
    </>
  );
}
