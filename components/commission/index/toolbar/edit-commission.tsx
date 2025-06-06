import { useSearchFilters } from "../../../../hooks/useSearchFilters";
import { ModuleIdentifier } from "../../../../utils/Module-Identifier";
import { useContext, useEffect, useState } from "react";
import { CommissionContext } from "../../../../pages/commission-management/commission";
import { ADMIN_GATEWAY } from "../../../../api/constants";
import useMutation from "../../../../hooks/useMutation";
import { throwToast } from "../../../../utils/notification";
import Modal from "../../../common/layout/modal";
import InputComponent from "../../../common/components/input-generator";
import { jalali } from "../../../../utils/common-funcions";
import { Button } from "../../../common/components/button/button";

export default function EditCommission() {
  const { toolbar, restriction, service, modules } = useSearchFilters(
    ModuleIdentifier.COMMISSION_MANAGEMENT_detail,
    "edit"
  );
  const {
    fetchData,
    query: searchQuery,
    selectedRows,
  } = useContext<any>(CommissionContext);
  const { mutate } = useMutation({
    url: `${ADMIN_GATEWAY}/api/request/CommissionDetail/Update`,
    method: "PUT",
  });
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const addNewHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await mutate({ id: selectedRows[0].id, ...query })
      .then(() => {
        throwToast({ type: "success", value: "با موفقیت انجام شد" });
        setModal(false);
        setQuery(null);
        fetchData(searchQuery);
      })
      .catch((err) => throwToast({ type: "error", value: err }))
      .finally(() => setLoading(false));
  };

  const onChange = (key: string, value: any) => {
    let _query: any = { ...query };
    _query[key] = value;
    setQuery(_query);
  };

  const convertDate = (date: string) => {
    let _date = jalali(date).date.split("/");
    return {
      year: Number(_date[0]),
      month: Number(_date[1]),
      day: Number(_date[2]),
    };
  };

  useEffect(() => {
    if (modal && selectedRows.length) {
      let _query: any = {};
      toolbar.map((item: any) => {
        if (item?.children) {
          item?.children.map((child: any) => {
            _query[`${child.title}`] = selectedRows[0][`${child.title}`];
          });
        } else {
          if (item.title !== "date") {
            _query[`${item.title}`] = selectedRows[0][`${item.title}`];
          }
        }
      });
      setQuery(_query);
    }
  }, [modal]);

  const openHandler = () => {
    if (selectedRows.length) {
      setModal(true);
    } else {
      throwToast({
        type: "warning",
        value: "لطفا برای ویرایش کردن، ردیف مورد نظرتان را انتخاب کنید",
      });
    }
  };
  return (
    <>
      <Button
        label="ویرایش کارمزد"
        onClick={openHandler}
        className="bg-secondary"
        allowed={
          restriction
            ? [[service?.[0], modules?.[0]?.[0], "Edit"].join(".")]
            : []
        }
      />
      <Modal
        title={"ویرایش کارمزد"}
        ModalWidth={"max-w-7xl"}
        setOpen={setModal}
        open={modal}
      >
        <div className="field mt-4">
          <form className={"grid lg:grid-cols-4 grid-cols-2 gap-4"}>
            {toolbar.map((item: any) => {
              if (item?.children) {
                return (
                  <div className={"w-full"} key={item.title}>
                    <label className={"mb-1 font-bold"}>{item.name}</label>
                    <div className={"flex"}>
                      {item?.children.map((child: any) => {
                        return (
                          <InputComponent
                            key={child.title}
                            query={query}
                            setQuery={setQuery}
                            item={child}
                            onChange={onChange}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className={"mt-auto"} key={item.title}>
                    <InputComponent
                      query={query}
                      setQuery={setQuery}
                      item={item}
                      onChange={onChange}
                    />
                  </div>
                );
              }
            })}
          </form>
          <div className={"flex justify-end space-x-reverse space-x-2 mt-10"}>
            <Button
              label="لغو"
              onClick={(e) => {
                e.preventDefault();
                setModal(false);
              }}
              className="bg-error"
            />
            <Button
              label="تایید"
              onClick={addNewHandler}
              loading={loading}
              type={"submit"}
              className="bg-primary"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
