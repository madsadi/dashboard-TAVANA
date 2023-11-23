import React, { useContext, useState } from "react";
import Modal from "../../common/layout/modal";
import InputComponent from "../../common/components/input-generator";
import { UsersContext } from "../../../pages/users-management/users";
import useMutation from "../../../hooks/useMutation";
import { IDP } from "../../../api/constants";
import { throwToast } from "../../../utils/notification";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../utils/Module-Identifier";
import { Button } from "../../common/components/button/button";

export default function Password() {
  const { toolbar, modules, service, restriction } = useSearchFilters(
    ModuleIdentifier.USER_MANAGEMENT_users,
    "password"
  );
  const { selectedRows } = useContext<any>(UsersContext);
  const { mutate } = useMutation({
    url: `${IDP}/api/users/change-user-password`,
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const changePassHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await mutate({ userId: selectedRows[0].id, ...query })
      .then(() => {
        throwToast({ type: "success", value: "با موفقیت انجام شد" });
        setModal(false);
        setQuery(null);
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
  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  return (
    <>
      <Button
        label={"رمز عبور جدید"}
        onClick={openHandler}
        allowed={
          restriction
            ? [
                [service?.[0], modules?.[0]?.[0], "ChangeUserPassword"].join(
                  "."
                ),
              ]
            : []
        }
      />
      <Modal title={"رمز عبور جدید"} setOpen={setModal} open={modal}>
        <div className="field mt-4">
          <form className={"grid grid-cols-2 gap-4"}>
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
              className="bg-primary"
              onClick={changePassHandler}
              type={"submit"}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
