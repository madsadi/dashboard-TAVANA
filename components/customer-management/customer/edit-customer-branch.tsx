import React, { useContext, useEffect, useState } from "react";
import Modal from "../../common/layout/modal";
import InputComponent from "../../common/components/input-generator";
import { throwToast } from "../../../utils/notification";
import useMutation from "../../../hooks/useMutation";
import { ADMIN_GATEWAY } from "../../../api/constants";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { Button } from "../../common/components/button/button";
import { CustomerContext } from "pages/customer-management/customer";
import { CustomerDetailContext } from "pages/customer-management/customer/detail";

export default function EditCustomerBranch() {
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/customer/EditBranch`,
    method: "PATCH",
  });
  const { toolbar, restriction, service, modules } = useSearchFilters(
    ModuleIdentifier.CUSTOMER_MANAGEMENT_customer,
    "edit-customer-branch"
  );

  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    fetchData,
    selectedRows,
    query: searchQuery,
  } = useContext<any>(CustomerContext);
  const { data, fetchDetailData } = useContext<any>(CustomerDetailContext);

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

  const editHandler = async (e: any) => {
    setLoading(true);
    await mutate({
      ...query,
      id: selectedRows[0]?.id,
    })
      .then(() => {
        if (data) {
          fetchDetailData({ userId: data.id });
        } else {
          fetchData(searchQuery);
        }
        setModal(false);
        setQuery(null);
      })
      .catch((err: any) => throwToast({ type: "error", value: err }))
      .finally(() => setLoading(false));
  };

  const openModalHandler = () => {
    if (selectedRows?.length === 1 || data) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
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
        label={"ویرایش شعبه "}
        className="bg-secondary"
        onClick={openModalHandler}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
            : []
        }
      />
      <Modal title={` ویرایش شعبه مشتری `} setOpen={setModal} open={modal}>
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
              className="bg-primary"
              loading={loading}
              onClick={editHandler}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
