import React, { useContext, useEffect, useState } from "react";
import Modal from "../../common/layout/modal";
import { throwToast } from "../../../utils/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { Button } from "../../common/components/button/button";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { CustomerContext } from "pages/customer-management/customer";
import InputComponent from "components/common/components/input-generator";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";

export default function Remove() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<any>(null);

  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customer/Delete`,
    method: "PATCH",
  });
  const {
    fetchData,
    query: searchQuery,
    selectedRows,
    setSelectedRows,
  } = useContext<any>(CustomerContext);
  const { data, fetchDetailData } = useContext<any>(CustomerDetailContext);

  const { restriction, modules, service, toolbar } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer,
    "remove"
  );

  useEffect(() => {
    if (toolbar && (selectedRows?.[0] || data)) {
      let ToEdit = selectedRows?.[0] || data;
      let initialValue: any = {};
      toolbar?.map((item: any) => {
        initialValue[item.title] = ToEdit[item.title];
      });
      setQuery(initialValue);
    }
  }, [toolbar, selectedRows?.[0], data]);

  const removeHandler = async () => {
    setLoading(true);
    await mutate({ id: selectedRows?.[0]?.id || data?.id, ...query })
      .then(() => {
        if (data) {
          // fetchDetailData({ userId: data?.id });
          window.close();
        } else {
          fetchData(searchQuery);
        }
        setModal(false);
        setSelectedRows([]);
      })
      .catch(() => {
        setModal(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openModalHandler = () => {
    if (selectedRows?.length === 1 || data) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای حذف انتخاب کنید",
      });
    }
  };
  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };
  return (
    <>
      <Button
        label={"حذف"}
        className="bg-error"
        disabled={data?.isDeleted}
        onClick={openModalHandler}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Delete"].join(".")]
            : []
        }
      />
      <Modal title={` حذف `} setOpen={setModal} open={modal}>
        <div className="field mt-4">
          <form className={"grid grid-cols-2 gap-4"}>
            {toolbar?.map((item: any) => {
              return (
                <InputComponent
                  key={item.title}
                  query={query}
                  item={item}
                  onChange={onChange}
                  setQuery={setQuery}
                  dataHelper={selectedRows?.[0] || data}
                />
              );
            })}
          </form>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              label={"لغو"}
              className="bg-error"
              onClick={() => setModal(false)}
            />
            <Button
              label={"تایید"}
              className="bg-primary "
              loading={loading}
              onClick={removeHandler}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
