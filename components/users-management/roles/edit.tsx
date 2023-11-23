import Modal from "../../common/layout/modal";
import InputComponent from "../../common/components/input-generator";
import React, { useContext, useEffect, useState } from "react";
import { RolesContext } from "../../../pages/users-management/roles";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../../utils/notification";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { Button } from "../../common/components/button/button";

export default function Edit() {
  const { toolbar, service, modules, restriction } = useSearchFilters(
    ModuleIdentifier.USER_MANAGEMENT_roles,
    "edit"
  );
  const {
    fetchData,
    query: searchQuery,
    selectedRows,
    setSelectedRows,
  } = useContext<any>(RolesContext);
  const { mutate } = useMutation({ url: `${IDP}/api/roles/update` });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const editHandler = async (e: any) => {
    e.preventDefault();
    setLoading(false);
    await mutate({ id: selectedRows[0].id, ...query })
      .then(() => {
        throwToast({ type: "success", value: "با موفقیت انجام شد" });
        setModal(false);
        setSelectedRows([]);
        setQuery({});
        fetchData(searchQuery);
      })
      .catch((err) => throwToast({ type: "error", value: err }))
      .finally(() => setLoading(false));
  };

  const openHandler = () => {
    if (selectedRows.length) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا یک گزینه برای تغییر انتخاب کنید",
      });
    }
  };

  useEffect(() => {
    if (modal && selectedRows.length) {
      let _initialValue: any = {};
      _initialValue.name = selectedRows[0].name;
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
        label={"ویرایش نقش"}
        className="bg-secondary"
        onClick={openHandler}
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
            : []
        }
      />
      <Modal title={"ویرایش نقش"} setOpen={setModal} open={modal}>
        <div className="field mt-4">
          <form className={"grid grid-cols-2 gap-4"} onSubmit={editHandler}>
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
          </form>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              label={"لغو"}
              className="bg-error"
              onClick={(e) => {
                e.preventDefault();
                setModal(false);
              }}
            />
            <Button
              label={"تایید"}
              loading={loading}
              type={"submit"}
              className="bg-primary"
              onClick={editHandler}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
